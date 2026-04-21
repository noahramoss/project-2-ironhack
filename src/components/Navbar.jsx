import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // <header> indica que es el encabezado principal del sitio o sección.
    <header className="main-header">
      {/* <nav> engloba los enlaces de navegación principales */}
      <nav className="navbar">
        {/* Usamos Link en lugar de <a> para evitar que React recargue toda la página (comportamiento SPA) */}
        <Link
          to="/"
          className="navbar-logo"
          aria-label="Ir a la página de inicio"
        >
          {/* Un emoji como logo simple, pero efectivo para el proyecto */}
          <span className="logo-icon">🌱</span>
          <span className="logo-text">Zero Waste Recipes</span>
        </Link>

        {/* Es una buena práctica envolver los enlaces en una lista desordenada <ul> */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-item">
              Inicio
            </Link>
          </li>
          {/* Aquí puedes añadir más <li> en el futuro (ej. Favoritos, Acerca de...) */}
        </ul>
      </nav>
    </header>
  );
}
