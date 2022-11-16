import { createContext, useReducer } from "react";

export const ThemeContext = createContext()

//3, it tkaes the current state->blue, and action->dispatch
//
const themeReducer =(state, action)=>{
    switch(action.type){
        case "CHANGE_COLOR":
            //we override the color property with payload->passed color
            return {...state, color: action.payload}
        case "CHANGE_MODE":
            return {...state, mode: action.payload}
        default:
            return state
    }
}

export function ThemeProvider({ children }){
    //1,
    //This function runs first because the click envoke that first
    //color=passed value
    //we dispatch a new Action
    const changeColor = (color)=>{
        dispatch({type: "CHANGE_COLOR" , payload: color})
    }

    const changeMode=(mode) => {
        dispatch({type: "CHANGE_MODE", payload: mode})
    }

    //2,when we pssed the color react look the reducerfunction associated
    //with that dispatch, and fires the themereducer function
    //4, now the state is updated->passed color
    const [state, dispatch] = useReducer(themeReducer, {
        color: "#58249c",
        mode: "dark"
    })


    return (
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {/* //all the cildren components get access to the theme context */}
            {children}
        </ThemeContext.Provider>
    )
}