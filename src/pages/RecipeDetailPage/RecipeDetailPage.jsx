import { useParams, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useMemo } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useRecipeDetail } from "../../hooks/useRecipeDetail";
import Loader from "../../components/Loader/Loader";
import styles from "./RecipeDetailPage.module.css";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes, history, favorites, addToHistory } =
    useContext(RecipeContext);

  const location = useLocation();
  const goBackUrl = location.state?.from || "/";

  // useMemo memoriza el objeto y evita que cambie en cada renderizado
  const savedDailyData = useMemo(() => {
    const data = localStorage.getItem("zeroWaste_daily");
    return data ? JSON.parse(data) : null;
  }, []);

  const dailyRecipe = savedDailyData?.recipe;

  // Buscamos la receta en el contexto usando el ID de la URL
  // Ojo: useParams devuelve un string, por eso convertimos a Number
  const recipe =
    recipes.find((r) => r.id === Number(id)) ||
    favorites.find((r) => r.id === Number(id)) ||
    history.find((r) => r.id === Number(id)) ||
    (dailyRecipe && dailyRecipe.id === Number(id) ? dailyRecipe : null);

  // NUEVO: Guardar en el historial al cargar la página
  useEffect(() => {
    if (recipe) {
      // Guardamos un objeto simplificado para el historial/favoritos para que ocupe menos memoria
      addToHistory({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        missedIngredientCount: recipe.missedIngredientCount,
      });
    }
  }, [recipe, id]); // Se ejecuta si cambia la receta o el ID

  // Datos extra del Hook (para instrucciones y tiempos)
  const { recipeExtraInfo, loadingDetail } = useRecipeDetail(id);

  // Manejo de estado: Si no se encuentra la receta
  if (!recipe) {
    return (
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Receta no encontrada</h2>
        <Link to={goBackUrl} className={styles.backButton}>
          &larr; Volver atrás
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Link to={goBackUrl} className={styles.backButton}>
        &larr; Volver atrás
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
            {/* Si venimos de una búsqueda, pintamos los verdes y rojos */}
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

            {/* Si es la receta del día (no hay verdes ni rojos), usamos los del hook */}
            {!recipe.usedIngredients?.length &&
              !recipe.missedIngredients?.length &&
              recipeExtraInfo?.extendedIngredients &&
              recipeExtraInfo.extendedIngredients.map((ing) => (
                <li key={`ext-${ing.id}`} className={styles.haveIngredient}>
                  {ing.original}
                </li>
              ))}
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
