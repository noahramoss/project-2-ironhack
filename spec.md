> ⚠️ **NO MODIFICAR ESTE ARCHIVO** > Este documento contiene las especificaciones técnicas inmutables del proyecto Zero Waste Recipes. Cualquier desviación de esta arquitectura debe ser aprobada y documentada en una nueva versión.

# Especificaciones Técnicas (Tech Specs) - Zero Waste Recipes

## 1. Resumen del Proyecto

**Zero Waste Recipes** es una Single Page Application (SPA) desarrollada en React que permite a los usuarios buscar recetas de cocina basadas en los ingredientes que ya tienen disponibles. La aplicación se comunica con una API externa para recuperar datos, filtrar resultados e identificar qué ingredientes faltan por comprar, ofreciendo una experiencia interactiva y dinámica.

## 2. Finalidad del Proyecto

El proyecto nace con el objetivo de resolver el problema del desperdicio de alimentos en el ámbito doméstico.

- **Ecológico/Económico:** Fomenta el aprovechamiento de sobras (zero waste) para evitar tirar comida y ahorrar en compras innecesarias.
- **Práctico:** Ofrece una solución rápida a la pregunta _"¿Qué hago hoy de comer con lo que tengo?"_.
- **Educativo:** Acostumbra a los usuarios a ser creativos en la cocina con recursos limitados.

## 3. Requisitos Técnicos

La aplicación está construida bajo un stack moderno de JavaScript, respetando el estándar ESM (ECMAScript Modules):

- **Core:** React 18 (Funcional, con Hooks).
- **Build Tool:** Vite (Optimizado para HMR rápido y empaquetado eficiente).
- **Enrutamiento:** React Router DOM v6 (Gestión de navegación sin recarga de página).
- **Estilizado:** CSS Modules (Garantiza el encapsulamiento de estilos y evita colisiones de clases).
- **Testing:** Vitest y React Testing Library (Pruebas unitarias y de integración).
- **Consumo de API:** `fetch` nativo sobre la API de Spoonacular REST.
- **Despliegue:** Netlify (con inyección segura de variables de entorno).

## 4. Arquitectura y Jerarquía de Carpetas

El proyecto sigue una arquitectura modular basada en la separación de responsabilidades (Separation of Concerns).

📦 src
┣ 📂 assets # Recursos estáticos
┃ ┣ 🖼️ zero-waste-recipes-logo.png
┃ ┗ 🖼️ zero-waste-recipes-logo.svg
┣ 📂 components # Componentes visuales reutilizables (UI aislada)
┃ ┣ 📂 Footer # Pie de página
┃ ┣ 📂 Loader # Componente de estado de carga
┃ ┣ 📂 Navbar # Barra de navegación principal
┃ ┗ 📂 RecipeCard # Tarjeta principal de receta con lógica de "semáforo"
┣ 📂 context # Gestión del Estado Global
┃ ┗ 📜 RecipeContext.jsx
┣ 📂 hooks # Custom Hooks (Lógica de negocio separada de la UI)
┃ ┗ 📜 useRecipeDetail.js
┣ 📂 pages # Vistas enrutables (Páginas completas modulares)
┃ ┣ 📂 DailyRecipePage
┃ ┣ 📂 FavoritesPage
┃ ┣ 📂 HistoryPage
┃ ┣ 📂 HomePage
┃ ┣ 📂 NotFoundPage # Vista de error 404 (Rutas no encontradas)
┃ ┗ 📂 RecipeDetailPage
┣ 📂 tests # Suite de pruebas (QA)
┃ ┣ 📜 FavoritesPage.test.jsx
┃ ┣ 📜 HomePage.test.jsx
┃ ┣ 📜 RecipeCard.test.jsx
┃ ┣ 📜 RecipeContext.test.jsx
┃ ┗ 📜 useRecipeDetail.test.js
┣ 📜 App.jsx # Configuración del Router y Providers
┣ 📜 index.css # Estilos globales y variables CSS
┗ 📜 main.jsx # Punto de entrada de React (Renderizado en el DOM)

_Nota: Todas las carpetas dentro de `components` y `pages` incluyen su respectivo archivo `.jsx` y su hoja de estilos encapsulada `.module.css`._

## 5. UI/UX Planteados

La interfaz está diseñada priorizando la claridad y la retención del usuario:

- **Semáforo de Ingredientes:** Feedback visual inmediato en las `RecipeCard` (Verde: Tienes todo / Naranja-Rojo: Faltan ingredientes).
- **Navegación Segura (Route State):** Implementación de una "mochila" en React Router (`useLocation`) para el botón de retroceso. Permite volver a la vista anterior preservando la UX, e incluye un _fallback_ a la Home `/` si el usuario accede mediante un enlace directo.
- **Estados de Carga:** Componente `Loader` generalizado para evitar saltos bruscos en la UI (Layout Shift) durante la resolución de promesas.
- **Estados Vacíos (Empty States):** Feedback amigable en páginas como Favoritos e Historial cuando los arrays correspondientes están vacíos.
- **Manejo de Errores (404):** Integración de un `NotFoundPage` para capturar rutas inexistentes y redirigir al usuario al flujo seguro.

## 6. Gestión del Estado (State Management)

No se utilizan librerías externas como Redux. Todo el estado global se maneja mediante la Context API de React (`RecipeContext`). El contexto es responsable de:

1.  Almacenar y persistir la sesión actual (Favoritos y Vistas Recientemente).
2.  Mantener la caché de recetas (`recipeCache`) para evitar solicitudes HTTP redundantes a la API al navegar adelante y atrás.
3.  Proveer las funciones mutadoras (`toggleFavorite`, `searchRecipes`).

## 7. Optimización y Rendimiento

- **Caché en LocalStorage:** La funcionalidad "Receta del Día" almacena la petición diaria en el navegador. Se intercepta la renderización comprobando la fecha actual (`YYYY-MM-DD`) para servir el dato en milisegundos y ahorrar cuota de la API.
- **useMemo:** Utilizado para evaluar variables derivadas complejas o lecturas del `localStorage` sin penalizar los re-renderizados de los componentes funcionales.

## 8. Calidad (QA) y Testing

La suite de pruebas cubre un "Pentágono de Testing" integral, logrando una cobertura robusta:

1.  **Renderizado UI:** Pruebas de renderizado condicional basado en props en `RecipeCard`.
2.  **Eventos (FireEvent):** Simulación de interacciones del usuario en formularios (`HomePage`).
3.  **Estado Global:** Comprobación de las funciones mutadoras del Contexto (`RecipeContext`).
4.  **Custom Hooks:** Uso de `renderHook` para probar ciclos de vida asíncronos en JS puro (`useRecipeDetail`).
5.  **Mocking de API:** Secuestro seguro de la función global `fetch` mediante `vi.spyOn` y simulación de respuestas (resolución de Promesas) y manejo de errores (Status 400/500).

## 9. Seguridad

- La API Key de Spoonacular se inyecta estrictamente mediante variables de entorno (`import.meta.env`).
- El archivo `.env` está en el `.gitignore` y los secretos de producción están configurados exclusivamente en el panel del servidor de despliegue (Netlify).

## 10. Consideraciones Futuras (Backlog)

- **Migración Backend:** Extraer el consumo directo de la API desde el cliente a un BFF (Backend For Frontend) propio construido en Node.js.
- **Autenticación:** Sistema JWT para persistir el historial en una base de datos real (MongoDB/PostgreSQL).
- **Localización (i18n):** Implementación de traducción para consultas bi-direccionales Español/Inglés y soporte multi-idioma de la UI.
