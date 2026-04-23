import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./DailyRecipePage.module.css";

export default function DailyRecipePage() {
  const [dailyRecipe, setDailyRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyRecipe = async () => {
      // 1. Obtenemos la fecha de hoy en formato "YYYY-MM-DD"
      const today = new Date().toISOString().split("T")[0];

      // 2. Miramos si ya hay una receta guardada para HOY
      const savedData = JSON.parse(localStorage.getItem("zeroWaste_daily"));

      if (savedData && savedData.date === today) {
        setDailyRecipe(savedData.recipe);
        setLoading(false);
        return; // Cortamos aquí para no gastar llamadas a la API
      }

      // 3. Si no hay receta o es de un día anterior, buscamos una nueva
      try {
        const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
        // El endpoint /random devuelve recetas completamente aleatorias
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`,
        );

        if (!response.ok) throw new Error("Error obteniendo receta aleatoria");

        const data = await response.json();
        const recipe = data.recipes[0];

        // 4. La guardamos en localStorage con la fecha de hoy
        localStorage.setItem(
          "zeroWaste_daily",
          JSON.stringify({
            date: today,
            recipe: recipe,
          }),
        );

        setDailyRecipe(recipe);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyRecipe();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader message="Seleccionando la mejor receta para hoy..." />
      </div>
    );
  }

  if (!dailyRecipe) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>
          Vaya, no pudimos cargar la receta de hoy.
        </h2>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Receta del Día 🌟</h1>
      <p className={styles.subtitle}>
        Nuestra recomendación sorpresa para que te inspires hoy. ¡Mañana habrá
        otra!
      </p>

      <div className={styles.cardWrapper}>
        <RecipeCard
          id={dailyRecipe.id}
          title={dailyRecipe.title}
          image={dailyRecipe.image}
          missedIngredientCount={0} // Al ser sorpresa, asumimos que no es por sobras
        />
      </div>
    </main>
  );
}
