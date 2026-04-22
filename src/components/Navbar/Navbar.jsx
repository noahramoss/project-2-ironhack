import { Link } from "react-router-dom";
import logoApp from "../../assets/zero-waste-recipes-logo.svg";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    // <header> indica que es el encabezado principal del sitio o sección.
    <header className={styles.mainHeader}>
      {/* <nav> engloba los enlaces de navegación principales */}
      <nav className={styles.navbar}>
        {/* Usamos Link en lugar de <a> para evitar que React recargue toda la página (comportamiento SPA) */}
        <Link to="/" aria-label="Ir a la página de inicio">
          <img src={logoApp} alt="Logo Zero Waste" className={styles.logoImg} />
        </Link>

        {/* Es una buena práctica envolver los enlaces en una lista desordenada <ul> */}
        <ul className={styles.navbarLinks}>
          <li>
            <Link to="/" className={styles.navItem}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navItem}>
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navItem}>
              Explorar
            </Link>
          </li>
          {/* Aquí puedes añadir más <li> en el futuro (ej. Favoritos, Acerca de...) */}
        </ul>
      </nav>
    </header>
  );
}
