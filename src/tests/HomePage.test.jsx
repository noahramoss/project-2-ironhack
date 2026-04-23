import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import HomePage from "../pages/HomePage/HomePage";

test("El usuario puede escribir en el buscador y enviar el formulario", () => {
  // 1. Arrange: Preparamos un contexto falso con una función espía (vi.fn)
  const mockSearchRecipes = vi.fn();

  const mockContext = {
    recipes: [],
    history: [], // Lo ponemos vacío para el test
    loading: false,
    searchRecipes: mockSearchRecipes, // Inyectamos nuestra función espía
    toggleFavorite: () => {},
  };

  render(
    <RecipeContext.Provider value={mockContext}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </RecipeContext.Provider>,
  );

  // Buscamos los elementos visuales por su placeholder o su rol
  const inputBuscador = screen.getByPlaceholderText(
    /E.g: tomato, cheese, onion.../i,
  );
  const botonBuscar = screen.getByRole("button", { name: /buscar/i });

  // 2. Act: Simulamos que el usuario escribe en el input
  fireEvent.change(inputBuscador, { target: { value: "pasta, cheese" } });

  // Comprobamos que el input de React se ha actualizado correctamente
  expect(inputBuscador.value).toBe("pasta, cheese");

  // 3. Act: Simulamos el click en el botón "Buscar Recetas"
  fireEvent.click(botonBuscar);

  // 4. Assert: Verificamos que al hacer click, se llamó a la función con el texto correcto
  expect(mockSearchRecipes).toHaveBeenCalledTimes(1);
  expect(mockSearchRecipes).toHaveBeenCalledWith("pasta, cheese");
});
