import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RecipeContext } from "../../context/RecipeContext";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({
  title,
  image,
  id,
  missedIngredientCount = 0,
}) {
  // 1. Extraemos los favoritos y la función del contexto
  const { favorites, toggleFavorite } = useContext(RecipeContext);

  // 2. Comprobamos si esta tarjeta es favorita
  const isFavorite = favorites.some((fav) => fav.id === id);

  const location = useLocation();

  // 3. Manejador del corazón (preventDefault para no viajar a la receta)
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite({ id, title, image, missedIngredientCount });
  };

  // 4. Tu lógica intacta del semáforo
  const getBadgeInfo = (count) => {
    if (count === 0) return { color: "#66bb6a", text: "¡Tienes todo!" };
    if (count <= 2) return { color: "#ffa726", text: `Faltan ${count} ingr.` };
    return { color: "#ef5350", text: `Faltan ${count} ingr.` };
  };

  const badgeInfo = getBadgeInfo(missedIngredientCount);

  return (
    <Link
      to={`/recipe/${id}`}
      state={{ from: location.pathname }}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={`Plato: ${title}`} className={styles.image} />

        {/* El semáforo de ingredientes (Abajo a la izquierda habitualmente) */}
        <span
          className={styles.badge}
          style={{ backgroundColor: badgeInfo.color }}
        >
          {badgeInfo.text}
        </span>

        {/* Botón de favoritos (Arriba a la derecha) */}
        <button
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}
