export default function Footer() {
  // Calculamos el año dinámicamente. ¡Mejor práctica para no tener que cambiarlo a mano cada enero!
  const currentYear = new Date().getFullYear();

  return (
    // <footer> define el pie de página semántico del documento
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Zero Waste Recipes. Desarrollado con React.</p>

        {/* Requisito de la API: Backlink obligatorio a Spoonacular */}
        <p className="api-attribution">
          Powered by{" "}
          <a
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spoonacular API
          </a>
        </p>
      </div>
    </footer>
  );
}
