import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"

//styles
import "./Recipe.css"


export default function Recipe() {
  const {id} = useParams()
  const url = "http://localhost:3000/recipes/"+id
  const {data, isPending, error} = useFetch(url)
  return (
    <div className="recipe">
        {isPending && <p className="loading">Loading..</p> }
        {error && <p className="error">{error}</p> }
        {data && (
         <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          {/* ingrediens are in a array of strings, we have to use loop */}
          <ul>
            {data.ingredients.map(ing=> <li key={ing}>{ing}</li> )}
          </ul>
          <p className="method">{data.method}</p>
         </>
        )}
    </div>
  )
}
