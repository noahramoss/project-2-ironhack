import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useContext } from "react";
// Asegúrate de que la ruta a tu contexto sea correcta
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";
import { expect, test, vi } from "vitest";

// 1. Creamos un componente "tonto" solo para interactuar con el contexto
const DummyComponent = () => {
  const { favorites, toggleFavorite } = useContext(RecipeContext);

  // Inventamos una receta falsa para la prueba
  const testRecipe = { id: 101, title: "Tacos Al Pastor" };

  return (
    <div>
      {/* data-testid es una marca invisible para que Vitest encuentre rápido este elemento */}
      <span data-testid="fav-count">{favorites.length}</span>
      <button onClick={() => toggleFavorite(testRecipe)}>Boton Favorito</button>
    </div>
  );
};

test("toggleFavorite añade y quita recetas correctamente", () => {
  // 1. Arrange: Montamos nuestro componente envuelto en TU Provider real
  render(
    <RecipeProvider>
      <DummyComponent />
    </RecipeProvider>,
  );

  // Buscamos los elementos en la pantalla virtual
  const contador = screen.getByTestId("fav-count");
  const boton = screen.getByText("Boton Favorito");

  // Comprobamos que empezamos con 0 favoritos
  expect(contador).toHaveTextContent("0");

  // 2. Act: Simulamos un clic del usuario
  fireEvent.click(boton);

  // 3. Assert: Comprobamos que se ha añadido al array (la longitud es 1)
  expect(contador).toHaveTextContent("1");

  // 4. Act Extra: Si volvemos a hacer clic, debería quitarla (porque es un "toggle")
  fireEvent.click(boton);

  // 5. Assert Extra: Comprobamos que vuelve a 0
  expect(contador).toHaveTextContent("0");
});

// --- TEST 2: LA JOYA DE LA CORONA (API MOCKING) ---
const DummySearchComponent = () => {
  const { recipes, searchRecipes } = useContext(RecipeContext);

  return (
    <div>
      <span data-testid="recipe-results">{recipes.length}</span>
      <button onClick={() => searchRecipes("chicken")}>Search chicken</button>
    </div>
  );
};

test("searchRecipes llama a la API y actualiza las recetas sin gastar puntos", async () => {
  // 1. Arrange: Secuestramos la función fetch global de JavaScript
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          // Este es el JSON falso que le devolvemos a tu Contexto
          results: [
            { id: 1, title: "Fake chicken curry" },
            { id: 2, title: "Fake chicken soup" },
          ],
        }),
    }),
  );

  render(
    <RecipeProvider>
      <DummySearchComponent />
    </RecipeProvider>,
  );

  const contadorResultados = screen.getByTestId("recipe-results");
  const botonBuscar = screen.getByText("Search chicken");

  // Comprobamos que empezamos con 0 recetas en la búsqueda
  expect(contadorResultados).toHaveTextContent("0");

  // 2. Act: Simulamos el clic. Como es una función asíncrona, disparamos el evento.
  fireEvent.click(botonBuscar);

  // 3. Assert: waitFor le dice a React que espere hasta que el componente se actualice
  await waitFor(() => {
    // Como nuestro JSON falso tiene 2 recetas, esperamos que el contador suba a 2
    expect(contadorResultados).toHaveTextContent("2");
  });

  // ¡La prueba de fuego! Verificamos que Vitest interceptó la llamada y que incluía "pollo"
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("chicken"));

  // Limpiamos el mock para que no interfiera con otros tests futuros
  global.fetch.mockRestore();
});
