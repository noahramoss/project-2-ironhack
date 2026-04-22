import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>
        ¡Ups! Parece que esta receta se ha esfumado de nuestra despensa.
      </p>
      <Link to="/" className={styles.homeButton}>
        Volver al Inicio
      </Link>
    </main>
  );
}
