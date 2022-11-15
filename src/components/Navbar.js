import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

//styles
import "./Navbar.css"

//Comp
import Searchbar from "./Searchbar"

export default function Navbar() {
  //add the changecolor funct
  const { color, changeColor } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
        <nav onClick={()=>{changeColor("pink")}}>
            <Link to="/" className="brand">
                <h1>Cooking</h1>
            </Link>
            <Searchbar/>
            <Link to="/create">
                Create Recipe
            </Link>
        </nav>  
    </div>
   
  )
}
