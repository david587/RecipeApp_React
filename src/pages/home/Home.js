import React from "react"
import { projectFirestore } from "../../firebase/config"
import { useEffect, useState } from "react"

//styles
import "./home.css"

//components
import RecipeList from "../../components/RecipeList"


export default function Home() {
  //what we get back from firebase store
  const [data, setData] = useState(null)
  //depend on a state on a fetch
  const [isPending, SetIsPending] = useState(false)
  const [error, setError] = useState(false)
  
  useEffect(()=>{
    SetIsPending(true)
    //react firestore and grap data, pass the name of the collection

    //instead of get we have to use a real time listener 
    const unsub = projectFirestore.collection("recipes").onSnapshot((snapshot)=>{
      if(snapshot.empty){
        setError("No recipes to load")
        SetIsPending(false)
      }
      //if we have some kind of data
      else{
        let results = []
        snapshot.docs.forEach(doc => {
          //contains the object and the id propety
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        SetIsPending(false)
      } 
    }, (err)=>{
      setError(err.message)
      SetIsPending(false)
    })
    //if we on different page dont try to refetch
    return () => unsub()

  },[])

  return (
    <div className="home">
        {error && <p>{error}</p> }
        {isPending && <p className="loading">Loading...</p> }
        {/* if theres data map throught, give the json with prop */}
        {data && <RecipeList recipes={data} />}
    </div>
  )
}
