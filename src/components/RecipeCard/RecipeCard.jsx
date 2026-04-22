import { Link } from "react-router-dom";
export default function RecipeCard({ title, image, id }) {
  return (
    <Link to={`/recipe/${id}`}>
      <div className="recipe-card">
        <img src={image} alt={`Plato: ${title}`} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
}
