import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";

// 1. Añadimos missedIngredientCount a las props (con un valor por defecto de 0)
export default function RecipeCard({
  title,
  image,
  id,
  missedIngredientCount = 0,
}) {
  // 2. Lógica para determinar el color y texto según los ingredientes faltantes
  const getBadgeInfo = (count) => {
    if (count === 0) {
      return { color: "#66bb6a", text: "¡Tienes todo!" }; // Verde (Nuestro primary-color)
    }
    if (count <= 2) {
      return { color: "#ffa726", text: `Faltan ${count} ingr.` }; // Naranja
    }
    return { color: "#ef5350", text: `Faltan ${count} ingr.` }; // Rojo
  };

  const badgeInfo = getBadgeInfo(missedIngredientCount);

  return (
    <Link to={`/recipe/${id}`} className={styles.card}>
      {/* Envolvemos la imagen en un contenedor para poder posicionar la etiqueta encima */}
      <div className={styles.imageContainer}>
        <img src={image} alt={`Plato: ${title}`} className={styles.image} />

        {/* 3. REQUISITO CUMPLIDO: CSS en línea dinámico */}
        <span
          className={styles.badge}
          style={{ backgroundColor: badgeInfo.color }}
        >
          {badgeInfo.text}
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}
