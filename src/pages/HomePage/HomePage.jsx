import { useContext, useEffect, useState, useMemo } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function HomePage() {
  const { recipes, searchRecipes } = useContext(RecipeContext);
  const [searchInput, setSearchInput] = useState("");

  const sortedRecipes = useMemo(() => {
    // Aquí copiaremos el array original y lo ordenaremos
    // de menor a mayor cantidad de ingredientes faltantes.
    return [...recipes].sort(
      (a, b) => a.missedIngredientCount - b.missedIngredientCount,
    );
  }, [recipes]); // El array de dependencias: solo vuelve a calcular si 'recipes' cambia

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes(searchInput);
    setSearchInput("");
  };

  return (
    <main>
      <h1>Recetas Zero Waste</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ej: tomate, queso, cebolla..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Buscar Recetas</button>
      </form>
      <section className="recipes-grid">
        {sortedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
          ></RecipeCard>
        ))}
      </section>
    </main>
  );
}
