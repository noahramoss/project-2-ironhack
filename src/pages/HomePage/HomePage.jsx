import { useContext, useEffect, useState, useMemo } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { recipes, loading, searchRecipes } = useContext(RecipeContext);
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
      <h1 className={styles.title}>Recetas Zero Waste</h1>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ej: tomate, queso, cebolla..."
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          Buscar Recetas
        </button>
      </form>
      {loading ? (
        <Loader message="Buscando recetas Zero Waste..." />
      ) : (
        <section className={styles.recipesGrid}>
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              missedIngredientCount={recipe.missedIngredientCount}
            ></RecipeCard>
          ))}
        </section>
      )}
    </main>
  );
}
