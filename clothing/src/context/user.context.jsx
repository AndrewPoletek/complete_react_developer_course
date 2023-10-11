import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () =>null,
})


export const USER_ACTION_TYPES ={
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action)=>{
    const {type, payload} = action
    console.log('dispatched')
    console.log(action)

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in the userReducer`)

    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) =>{
    const [{currentUser}, dispatch] = useReducer(userReducer,INITIAL_STATE )
    console.log(currentUser)
    
    
    const setCurrentUser = (user) =>{
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload:user})
    }
    
    const value = {currentUser, setCurrentUser}
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
            console.log(user)
        })
    return unsubscribe
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}