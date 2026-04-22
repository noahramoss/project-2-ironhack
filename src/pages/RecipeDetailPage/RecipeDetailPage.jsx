import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import styles from "./RecipeDetailPage.module.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  // Buscamos la receta en el contexto usando el ID de la URL
  // Ojo: useParams devuelve un string, por eso convertimos a Number
  const recipe = recipes.find((r) => r.id === Number(id));

  // Manejo de estado: Si no se encuentra la receta
  if (!recipe) {
    return (
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Receta no encontrada</h2>
        <Link to="/" className={styles.backButton}>
          &larr; Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Link to="/" className={styles.backButton}>
        &larr; Volver a resultados
      </Link>

      <img src={recipe.image} alt={recipe.title} className={styles.heroImage} />

      <h1 className={styles.title}>{recipe.title}</h1>

      <div className={styles.metaInfo}>
        <span>
          ⏱️{" "}
          {recipe.readyInMinutes ? `${recipe.readyInMinutes} mins` : "30 mins"}
        </span>
        <span>
          👥 {recipe.servings ? `${recipe.servings} raciones` : "2 raciones"}
        </span>
      </div>

      <h2 className={styles.sectionTitle}>Ingredientes</h2>
      <ul className={styles.ingredientsList}>
        {/* 1. Pintamos primero los que TENEMOS (Verde) */}
        {recipe.usedIngredients &&
          recipe.usedIngredients.map((ing) => (
            <li key={`used-${ing.id}`} className={styles.haveIngredient}>
              {ing.original || ing.name}
            </li>
          ))}

        {/* 2. Pintamos después los que NOS FALTAN (Rojo) */}
        {recipe.missedIngredients &&
          recipe.missedIngredients.map((ing) => (
            <li key={`missed-${ing.id}`} className={styles.missingIngredient}>
              {ing.original || ing.name}
            </li>
          ))}

        {/* Mensaje por defecto si no hay ingredientes (Safety check) */}
        {!recipe.usedIngredients?.length &&
          !recipe.missedIngredients?.length && (
            <li>No hay información de ingredientes.</li>
          )}
      </ul>

      <h2 className={styles.sectionTitle}>Instrucciones</h2>
      <div className={styles.instructions}>
        <p>
          Las instrucciones detalladas paso a paso aparecerán aquí cuando
          conectemos el endpoint completo de la API de Spoonacular en la Fase de
          Conexión.
        </p>
      </div>
    </div>
  );
}
