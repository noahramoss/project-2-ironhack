import { useState, createContext } from "react";

import mockRecipes from "../mocks/recipes.json";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = (searchTerm) => {
    setLoading(true);
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 2000);
  };

  return (
    <RecipeContext.Provider value={{ recipes, loading, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}
