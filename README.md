# 🌍🍽️ Zero Waste Recipes

**[🔗 Visita el proyecto en vivo aquí](https://zero-waste-recipes-noah-ramos.netlify.app/)**

## 📖 Sobre el proyecto

**Zero Waste Recipes** es una aplicación web (SPA) diseñada para combatir el desperdicio de alimentos. El problema actual es que a menudo nos encontramos con ingredientes sueltos en la nevera y no sabemos qué cocinar con ellos, lo que lleva a pedir comida a domicilio o tirar esos alimentos.

Esta aplicación resuelve ese problema permitiendo a los usuarios introducir los ingredientes que tienen a mano para generar, mediante la API de Spoonacular, recetas deliciosas y fáciles de preparar. Fomenta la cocina sostenible, el ahorro económico y la creatividad culinaria.

---

## 🛠️ Tecnologías Usadas

El proyecto ha sido desarrollado utilizando las siguientes tecnologías y herramientas:

- **Frontend:** React 18, React Router v6, CSS Modules (para un encapsulamiento seguro de estilos).
- **Build Tool:** Vite (para una compilación ultrarrápida).
- **Testing:** Vitest, React Testing Library (con cobertura de Componentes, Contexto y Hooks asíncronos).
- **Consumo de Datos:** API REST de Spoonacular (`fetch`, promesas).
- **Control de Versiones & Deploy:** Git, GitHub, Netlify.
- **Herramientas de Desarrollo:** Visual Studio Code.
- **Inteligencia Artificial:** Gemini (asistente de desarrollo).

---

## 🤖 Uso de Inteligencia Artificial (Gemini)

Durante el ciclo de vida del proyecto, se utilizó IA (Gemini) actuando como un _Pair-Programmer_ y mentor técnico. Sus principales casos de uso fueron:

1. **Resolución de bloqueos técnicos:** Identificación de errores complejos en el entorno ESM al testear Custom Hooks.
2. **Refactorización y Buenas Prácticas:** Orientación en la separación de responsabilidades (creación de Custom Hooks para lógica asíncrona y uso de `useMemo` para optimización de rendimiento).
3. **Casos de UX (Edge Cases):** Diseño de soluciones arquitectónicas para la navegación (ej. uso de `useLocation` state para blindar el historial de navegación al compartir enlaces directos).

---

## ⏱️ Tiempos de Desarrollo (Estimado vs Real)

La planificación del proyecto se dividió en tareas atómicas para mantener un flujo de trabajo ágil. A continuación se refleja la comparativa de tiempos:

| Tarea / Componente                                          | Tiempo Estimado | Tiempo Real | Observaciones                                                     |
| :---------------------------------------------------------- | :-------------: | :---------: | :---------------------------------------------------------------- |
| **Setup inicial (Vite, Router, CSS, Env)**                  |       2h        |    1.5h     | Configuración fluida.                                             |
| **Context API (RecipeContext & Estado global)**             |       3h        |     4h      | Se requirió más tiempo para la lógica del historial y caché.      |
| **Desarrollo UI: Header, Loader, y Layouts**                |       4h        |     3h      | CSS Modules agilizó mucho la maquetación.                         |
| **Componente Core: `RecipeCard`**                           |       3h        |    3.5h     | Ajustes en el renderizado condicional (semáforo de ingredientes). |
| **Vistas: Home, Favorites, History, Daily Recipe**          |       6h        |     6h      | Integración de las tarjetas con el contexto global.               |
| **Hook Custom: `useRecipeDetail` (Fetch & Error handling)** |       4h        |    3.5h     | Manejo eficiente de asincronía y variables de entorno.            |
| **Testing (Vitest & Testing Library)**                      |       5h        |     7h      | Retos técnicos al _mockear_ la API y el contexto en módulos ESM.  |
| **Deploy & Refactorización UX (Route State)**               |       2h        |     2h      | Configuración de secretos en Netlify y mejoras de navegación.     |
| **TOTAL**                                                   |     **29h**     |  **30.5h**  | Proyecto entregado en tiempo con funcionalidades extra de UX.     |

---

## 🎯 Resultado Final

Se ha logrado desarrollar una Single Page Application robusta, completamente funcional y responsive. Destacan las siguientes características:

- **Búsqueda inteligente:** Identificación visual de ingredientes "que tienes" (verde) y "que faltan" (rojo).
- **Rendimiento:** Implementación de caché en el estado global para evitar llamadas redundantes a la API al volver a visitar detalles de una receta.
- **Persistencia:** Uso de `localStorage` para la receta diaria, ahorrando cuota de la API.
- **Calidad de Código:** Entorno de pruebas integrado cubriendo los flujos críticos de la aplicación (Happy paths y Error paths).

---

## 🚧 Principales Puntos de Conflicto y Soluciones

1. **Testear Contexto y Hooks en ESM con Vite:**
   - _Conflicto:_ Al intentar testear `useRecipeDetail`, Vitest lanzaba errores de sintaxis (JSX dentro de archivos `.js`) y restricciones de ESM (no poder reasignar `useContext`).
   - _Solución:_ Se implementó un Wrapper utilizando `React.createElement` en JavaScript puro para inyectar el contexto de prueba sin violar las reglas de módulos de ESM ni requerir conversión a `.jsx`.

2. **UX en el botón de retroceso (Back Button):**
   - _Conflicto:_ Un botón simple de retroceso por historial (`history.back()`) fallaría o expulsaría al usuario si accedía a una receta a través de un enlace directo (ej. WhatsApp).
   - _Solución:_ Se aprovechó el estado de React Router (`useLocation` y `state`). Al navegar desde la app, se envía una "mochila" con la ruta de origen. El botón de retroceso evalúa: si existe la ruta, vuelve a ella; si no, redirige de forma segura a la página de inicio (`/`).

3. **Protección de API Keys en Producción:**
   - _Conflicto:_ Las llamadas a la API fallaban tras el despliegue porque el archivo `.env` no se sube a GitHub por seguridad.
   - _Solución:_ Inyección de las variables de entorno directamente en el panel de configuración del servidor (Netlify) para mantener la clave de Spoonacular segura y funcional en producción.

---

## 🚀 Backlog (Próximos pasos)

Para seguir escalando la aplicación en el futuro, se contemplan las siguientes mejoras:

- **Backend Propio:** Migración de la lógica de negocio a un servidor propio usando **Node.js y Express**.
- **Autenticación (Login/Registro):** Implementar sistema de usuarios (con Firebase o JWT) para que los favoritos y el historial se guarden en la nube y no se pierdan al cambiar de dispositivo.
- **Base de Datos:** Integración con MongoDB o PostgreSQL para almacenar perfiles de usuario y recetas guardadas.
- **Filtros Avanzados:** Añadir soporte para restricciones dietéticas (ej. solo mostrar resultados Veganos, Sin Gluten, o Keto).
- **Internacionalización (i18n):** Traducción de los ingredientes consultados y los resultados de la API para soportar consultas y lecturas en español nativo.
