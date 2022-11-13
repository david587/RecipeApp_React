import { useFetch } from "../../hooks/useFetch"

//styles
import "./home.css"

//components
import RecipeList from "../../components/RecipeList"

export default function Home() {
  const { data,isPending, error} = useFetch(" http://localhost:3000/recipes")

  return (
    <div className="home">
        {error && <p>{error}</p> }
        {isPending && <p className="loading">Loading...</p> }
        {/* if theres data map throught, give the json with prop */}
        {data && <RecipeList recipes={data} />}
    </div>
  )
}
