import { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

export function useRecipeDetail(id) {
  const { recipeCache, setRecipeCache } = useContext(RecipeContext);
  const [recipeExtraInfo, setRecipeExtraInfo] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    if (recipeCache[id]) {
      setRecipeExtraInfo(recipeCache[id]);
      setLoadingDetail(false);
      return;
    }

    const fetchDetail = async () => {
      setLoadingDetail(true);
      try {
        const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
        );

        if (!response.ok) throw new Error("Error al cargar los detalles");

        const data = await response.json();
        setRecipeExtraInfo(data);

        setRecipeCache((prevCache) => ({
          ...prevCache,
          [id]: data,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { recipeExtraInfo, loadingDetail, error };
}
