import React from "react"
import {useState, useRef, useEffect} from "react"
import { projectFirestore } from "../../firebase/config"
import { useHistory } from "react-router-dom"


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
  const history = useHistory()

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    //The data what we want to store
   const doc = { title, ingredients, method ,  cookingTime: cookingTime + "minutes"}

   //if theres an error it fires the catch block
   try{
    //recipe táblába beszurjuk a változót
    await projectFirestore.collection("recipes").add(doc)
    //after finished the post to firebase, push back
    history.push("/")
    }
    // if there is an error
    catch(err){
      console.log(err);
    }
   
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
