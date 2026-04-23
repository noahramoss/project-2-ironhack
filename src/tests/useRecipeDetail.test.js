import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import React from "react"; // Necesitamos importar React para usar createElement
import { useRecipeDetail } from "../hooks/useRecipeDetail";
import { RecipeContext } from "../context/RecipeContext";

// 1. Preparamos el contexto falso
const mockContextValue = {
  recipeCache: {},
  setRecipeCache: vi.fn(),
};

// 2. MAGIA PURA DE REACT: Creamos el wrapper con JS puro, sin usar JSX
const ContextWrapper = ({ children }) => {
  return React.createElement(
    RecipeContext.Provider,
    { value: mockContextValue },
    children,
  );
};

test("useRecipeDetail obtiene los detalles de la receta correctamente", async () => {
  // Preparamos los datos falsos
  const mockRecipeData = {
    id: 999,
    title: "Vegan English Breakfast",
  };

  // Secuestramos la API
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRecipeData),
    }),
  );

  // 3. Act: Usamos nuestro Wrapper de JS puro
  const { result } = renderHook(() => useRecipeDetail(999), {
    wrapper: ContextWrapper,
  });

  // Comprobamos el estado INICIAL
  expect(result.current.loadingDetail).toBe(true);
  expect(result.current.error).toBe(null);

  // Esperamos a que la promesa se resuelva
  await waitFor(() => {
    expect(result.current.loadingDetail).toBe(false);
  });

  // Comprobamos el estado FINAL
  expect(result.current.recipeExtraInfo).toEqual(mockRecipeData);
  expect(result.current.error).toBe(null);

  // Limpieza
  global.fetch.mockRestore();
});

test("useRecipeDetail maneja los errores correctamente", async () => {
  // Simulamos que la API falla
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
    }),
  );

  const { result } = renderHook(() => useRecipeDetail(999), {
    wrapper: ContextWrapper,
  });

  await waitFor(() => {
    expect(result.current.loadingDetail).toBe(false);
  });

  // Verificamos que capturó el error EXACTO
  expect(result.current.error).toBe("Error al cargar los detalles");
  expect(result.current.recipeExtraInfo).toBe(null);

  global.fetch.mockRestore();
});
