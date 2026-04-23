import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useRecipeDetail } from "../../hooks/useRecipeDetail";
import Loader from "../../components/Loader/Loader";
import styles from "./RecipeDetailPage.module.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  // Buscamos la receta en el contexto usando el ID de la URL
  // Ojo: useParams devuelve un string, por eso convertimos a Number
  const recipe = recipes.find((r) => r.id === Number(id));

  // Datos extra del Hook (para instrucciones y tiempos)
  const { recipeExtraInfo, loadingDetail } = useRecipeDetail(id);

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

      {/* 3. Tiempos y raciones reales desde el Hook (o spinner si está cargando) */}
      {loadingDetail ? (
        <Loader message="Cargando detalles..." />
      ) : (
        <>
          <div className={styles.metaInfo}>
            <span>⏱️ {recipeExtraInfo?.readyInMinutes} mins</span>
            <span>👥 {recipeExtraInfo?.servings} raciones</span>
          </div>

          <h2 className={styles.sectionTitle}>Ingredientes</h2>
          <ul className={styles.ingredientsList}>
            {recipe.usedIngredients &&
              recipe.usedIngredients.map((ing) => (
                <li key={`used-${ing.id}`} className={styles.haveIngredient}>
                  {ing.original || ing.name}
                </li>
              ))}
            {recipe.missedIngredients &&
              recipe.missedIngredients.map((ing) => (
                <li
                  key={`missed-${ing.id}`}
                  className={styles.missingIngredient}
                >
                  {ing.original || ing.name}
                </li>
              ))}
            {!recipe.usedIngredients?.length &&
              !recipe.missedIngredients?.length && (
                <li>No hay información de ingredientes.</li>
              )}
          </ul>

          <h2 className={styles.sectionTitle}>Instrucciones</h2>
          <div className={styles.instructions}>
            {recipeExtraInfo?.instructions ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeExtraInfo.instructions,
                }}
              />
            ) : (
              <p>Esta receta no tiene instrucciones detalladas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
