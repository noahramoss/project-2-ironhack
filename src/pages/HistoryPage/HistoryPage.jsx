import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./HistoryPage.module.css";

export default function HistoryPage() {
  // Extraemos el array del historial del contexto
  const { history } = useContext(RecipeContext);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Vistas Recientemente 🕒</h1>

      {history.length > 0 ? (
        <section className={styles.recipesGrid}>
          {history.map((recipe) => (
            <RecipeCard
              key={`history-${recipe.id}`} // Un key único por si acaso
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
            Aún no has visto ninguna receta. ¡Vuelve al buscador y descubre
            platos nuevos! 🍲
          </p>
        </div>
      )}
    </main>
  );
}
