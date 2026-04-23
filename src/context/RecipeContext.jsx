import { useState, createContext, useEffect } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeCache, setRecipeCache] = useState({});

  // --- NUEVO: ESTADOS PARA FAVORITOS E HISTORIAL ---
  // Inicializamos leyendo de localStorage por si el usuario ya tenía cosas guardadas
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("zeroWaste_favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("zeroWaste_history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // --- EFECTOS PARA GUARDAR EN LOCALSTORAGE ---
  // Cada vez que cambien los favoritos o el historial, los guardamos en el navegador
  useEffect(() => {
    localStorage.setItem("zeroWaste_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("zeroWaste_history", JSON.stringify(history));
  }, [history]);

  // --- FUNCIONES DE MANEJO ---
  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFav = prev.some((r) => r.id === recipe.id);
      if (isFav) {
        // Si ya es favorito, lo quitamos
        return prev.filter((r) => r.id !== recipe.id);
      } else {
        // Si no es favorito, lo añadimos
        return [...prev, recipe];
      }
    });
  };

  const addToHistory = (recipe) => {
    setHistory((prev) => {
      // Si la receta ya es la primera del historial,
      // devolvemos el mismo estado (prev).
      if (prev.length > 0 && prev[0].id === recipe.id) {
        return prev;
      }

      // Si no era la primera, hacemos la lógica normal
      const filteredHistory = prev.filter((r) => r.id !== recipe.id);
      return [recipe, ...filteredHistory].slice(0, 5);
    });
  };

  // --- BÚSQUEDA ORIGINAL ---
  const searchRecipes = async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    setLoading(true);

    try {
      const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
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
    // Pasamos todos los nuevos estados y funciones al Provider
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        searchRecipes,
        recipeCache,
        setRecipeCache,
        favorites,
        toggleFavorite,
        history,
        addToHistory,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
