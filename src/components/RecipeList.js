import "./RecipeList.css"
import {Link} from "react-router-dom"

export default function RecipeList({recipes}) {
  return (
    <div className="recipe-list">
        {recipes.map(recipe => (
            <div key={recipe.id} className="card">
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to nake</p>
                {/* we want to output a small snippet of the text,graps the caracter from 0 to 100 */}
                <div>{recipe.method.substring(0,100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
            </div>
        ))}
    </div>
  )
}
