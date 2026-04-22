import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { recipes, loading } = useContext(RecipeContext);
  const recipe = recipes.find((item) => item.id === parseInt(id));
  if (loading) {
    return <h2>Cargando receta...</h2>;
  }
  if (!recipe) {
    return (
      <div>
        <h2>Receta no encontrada</h2>
        <Link to="/" className="btn-primary">
          &larr; Vuelve a la página de inicio
        </Link>
      </div>
    );
  }
  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={`Receta: ${recipe.title}`} />
    </div>
  );
}
