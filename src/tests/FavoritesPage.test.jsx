import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import FavoritesPage from "../pages/FavoritesPage/FavoritePage";

test("FavoritesPage muestra el mensaje de vacío cuando no hay recetas guardadas", () => {
  // 1. Arrange: Preparamos un contexto donde NO hay favoritos
  const mockContext = {
    favorites: [],
    toggleFavorite: () => {},
  };

  render(
    <RecipeContext.Provider value={mockContext}>
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    </RecipeContext.Provider>,
  );

  // 2. Act: Buscamos un texto que sabemos que debería salir.
  // Nota: Usamos una expresión regular /texto/i para que no sea sensible a mayúsculas o texto exacto
  const mensajeVacio = screen.getByText(/no tienes recetas favoritas/i);

  // 3. Assert: Comprobamos que el mensaje está en el documento
  expect(mensajeVacio).toBeInTheDocument();
});
