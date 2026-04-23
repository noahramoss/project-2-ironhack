import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  // Extraemos el array de favoritos del contexto
  const { favorites } = useContext(RecipeContext);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Mis Recetas Favoritas ❤️</h1>

      {favorites.length > 0 ? (
        <section className={styles.recipesGrid}>
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              missedIngredientCount={recipe.missedIngredientCount}
            />
          ))}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <p>
            Aún no tienes recetas favoritas guardadas. ¡Ve al buscador y dale al
            corazón a las que más te gusten! 🍽️
          </p>
        </div>
      )}
    </main>
  );
}
