import { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const { recipes, searchRecipes } = useContext(RecipeContext);

  useEffect(() => {
    searchRecipes();
  }, []);
  return (
    <main>
      <h1>Recetas Zero Waste</h1>
      {/* Aquí insertaremos la Barra de Búsqueda en el siguiente paso */}
      <section className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
          ></RecipeCard>
        ))}
      </section>
    </main>
  );
}
