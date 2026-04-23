import { useContext, useState, useMemo } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { recipes, loading, searchRecipes } = useContext(RecipeContext);
  const [searchInput, setSearchInput] = useState("");

  const sortedRecipes = useMemo(() => {
    return [...recipes].sort((a, b) => {
      // 1ª Prioridad: Mayor cantidad de ingredientes que YA TENEMOS (Descendente)
      if (b.usedIngredientCount !== a.usedIngredientCount) {
        return b.usedIngredientCount - a.usedIngredientCount;
      }
      // 2ª Prioridad (Desempate): Menor cantidad de ingredientes FALTANTES (Ascendente)
      return a.missedIngredientCount - b.missedIngredientCount;
    });
  }, [recipes]);

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
          placeholder="E.g: tomato, cheese, onion..."
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          Buscar Recetas
        </button>
      </form>
      {/* NUEVO: Aviso de idioma para el usuario */}
      <p
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginTop: "-2rem",
        }}
      >
        * Por favor, introduce los ingredientes en <strong>inglés</strong>{" "}
        separados por comas.
      </p>
      {loading ? (
        <Loader message="Buscando recetas Zero Waste..." />
      ) : sortedRecipes.length > 0 ? (
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
      ) : (
        <div className={styles.emptyState}>
          <p>
            🥗 Introduce los ingredientes que tienes en tu nevera para descubrir
            recetas increíbles.
          </p>
        </div>
      )}
    </main>
  );
}
