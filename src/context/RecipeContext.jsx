import { useState, createContext } from "react";

//import mockRecipes from "../mocks/recipes.json";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  //Creamos el caché para los detalles de las recetas
  const [recipeCache, setRecipeCache] = useState({});

  const searchRecipes = async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    setLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
      // Esto elimina los espacios alrededor de las comas para que la API no falle
      const cleanSearchTerm = searchTerm.replace(/\s*,\s*/g, ",");
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${cleanSearchTerm}&fillIngredients=true&ranking=1&ignorePantry=true&number=20&apiKey=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("Error al conectar con la API de Spoonacular");
      }
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (error) {
      console.error("Error en la búsqueda: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, loading, searchRecipes, recipeCache, setRecipeCache }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
