import React from "react"
import {BrowserRouter,Switch,Route} from "react-router-dom"

//page components
import Create from "./pages/create/Create"
import Home from "./pages/home/Home"
import  Search from  "./pages/search/Search"
import Recipe from "./pages/recipe/Recipe"
import Navbar from "./components/Navbar"
import ThemeSelector from "./components/ThemeSelector"
import { useTheme } from "./hooks/useTheme"

//styles
import './App.css'


function App() {
  const { mode } = useTheme()
  console.log(mode);
  //we pass here dark or light
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
      <Navbar/>
      <ThemeSelector/>
        <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/search">
              <Search/>
            </Route>
            <Route path="/recipes/:id">
              <Recipe/>
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
