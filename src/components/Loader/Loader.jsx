// src/components/Loader/Loader.jsx
import styles from "./Loader.module.css";

export default function Loader({ message = "Cargando..." }) {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{message}</p>
    </div>
  );
}
