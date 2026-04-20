export default function RecipeCard({ title, image }) {
  return (
    <div className="recipe-card">
      <img src={image} alt={`Plato: ${title}`} />
      <h3>{title}</h3>
    </div>
  );
}
