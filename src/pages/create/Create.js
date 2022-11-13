import {useState, useRef} from "react"

//styles
import "./Create.css"


export default function Create() {
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [newIngredient, setNewIngredient] = useState("")
  const [ingredients, setIngredients] = useState([])
  // create a ref to focuse this form
  const ingredientInput = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title,method,cookingTime, ingredients);
  }

  const handleAdd = (e) =>{
    e.preventDefault()
    //without , and unique
    const ing = newIngredient.trim()
    // takes the array and doesent include 2 same ing
    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients,ing])
    }
    setNewIngredient("")
    //set focus
    ingredientInput.current.focus()

  }
  return (
    <div className="create">
       <h2 className="page-title">Add a new Recipe</h2>

       <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input
           type="text"
          //  runs whenever the input value changes
           onChange={(e)=> setTitle(e.target.value)} 
           value={title}
           required
          />
        </label>

        <label>
          <span>Recipe ingrediens:</span>
          <div className="ingredients">
            {/* //add the ingrediens to array */}
            <input 
              type="text"
              onChange={(e)=> setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
              />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        {/* //now we can see the added ingredients */}
        <p>Current ingredients: {ingredients.map(i=> <em key={i}>{i},</em>)}</p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e)=> setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        
        <label>
          <span>Cooking time (minutes):</span>
          <input type="number"
          onChange={(e)=> setCookingTime(e.target.value)}
          value={cookingTime}
          />
        </label>
        
        <button className="btn">submit</button>

       </form>
    </div>
  )
}
