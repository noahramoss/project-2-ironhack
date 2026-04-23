import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { expect, test } from "vitest";

// 1. Arrange: Preparamos un Contexto falso para que el componente no explote al buscar 'favorites'
const mockContext = {
  favorites: [],
  toggleFavorite: () => {},
};

test("RecipeCard muestra el badge verde cuando no faltan ingredientes", () => {
  // 1. Arrange: Renderizamos el componente dentro de su Router y su Contexto
  render(
    <RecipeContext.Provider value={mockContext}>
      <BrowserRouter>
        <RecipeCard
          id={1}
          title="Pollo al Curry"
          image="pollo.jpg"
          missedIngredientCount={0}
        />
      </BrowserRouter>
    </RecipeContext.Provider>,
  );

  // 2. Act: Buscamos el elemento visual en la pantalla virtual
  const badge = screen.getByText("¡Tienes todo!");

  // 3. Assert: Comprobamos que el texto existe y tiene el color verde correcto
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle("background-color: #66bb6a");
});

test("RecipeCard muestra el badge rojo cuando faltan ingredientes", () => {
  // 1. Arrange
  render(
    <RecipeContext.Provider value={mockContext}>
      <BrowserRouter>
        <RecipeCard
          id={2}
          title="Pizza Margarita"
          image="pizza.jpg"
          missedIngredientCount={5}
        />
      </BrowserRouter>
    </RecipeContext.Provider>,
  );

  // 2. Act
  const badge = screen.getByText("Faltan 5 ingr.");

  // 3. Assert
  expect(badge).toBeInTheDocument();
  expect(badge).toHaveStyle("background-color: #ef5350");
});
