import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { projectFirestore } from "../../firebase/config" 
import { useTheme } from "../../hooks/useTheme"

//styles
import "./Recipe.css"

import React from "react"

export default function Recipe() {
  const {id} = useParams()
  const { mode } =useTheme()

  const [data, setData] = useState(null)
  const [isPending, SetIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    SetIsPending(true)
    //szürünk az id.ra csak azokat jeleniti meg amikra igaz az id
    const unsub = projectFirestore.collection("recipes").doc(id).onSnapshot((doc)=>{
      if(doc.exists){
        SetIsPending(false)
        setData(doc.data())
      }
      else{
        SetIsPending(false)
        setError("Couldnt find the data")
      }
    })

    return ()=> unsub()
  },[id])

  const handleClick =()=>{
    //we want to update thta one document
    projectFirestore.collection("recipes").doc(id).update({
      //pass what we want to update
      title: "Someting completely different"
    })
  }

  return (
    <div className={`recipe ${mode}`}>
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
          <button onClick={handleClick}>updateMe</button>
         </>
        )}
    </div>
  )
}
