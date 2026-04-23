import { useState } from "react";
import { Link } from "react-router-dom";
import logoApp from "../../assets/zero-waste-recipes-logo.svg";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // Estado para controlar si el menú hamburguesa está abierto
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.mainHeader}>
      <nav className={styles.navbar}>
        <Link to="/" aria-label="Ir a la página de inicio" onClick={closeMenu}>
          <img src={logoApp} alt="Logo Zero Waste" className={styles.logoImg} />
        </Link>

        {/* Botón Hamburguesa: Usamos un símbolo simple por ahora */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Menú de navegación: Añadimos la clase 'open' dinámicamente */}
        <ul className={`${styles.navbarLinks} ${isOpen ? styles.open : ""}`}>
          <li>
            <Link to="/" className={styles.navItem} onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/daily" className={styles.navItem} onClick={closeMenu}>
              Receta del Día
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={styles.navItem}
              onClick={closeMenu}
            >
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/history" className={styles.navItem} onClick={closeMenu}>
              Historial
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
