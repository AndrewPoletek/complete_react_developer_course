import { createContext, useReducer } from "react";

import {createAction} from "../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) =>{    
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id===productToAdd.id
    );

    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeAllCartItems = (cartItems, productToRemove) =>{
    const existingCartItemIndex = cartItems.findIndex(
        (cartItem)=> cartItem.id===productToRemove.id
    );
    const tmp_cartItems = [...cartItems]
    tmp_cartItems.splice(existingCartItemIndex, 1)
    return tmp_cartItems
}

const removeCartItem = (cartItems, productToRemove)=>{
    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id===productToRemove.id
    );

    if(existingCartItem.quantity==1){
        return removeAllCartItems(cartItems, productToRemove)
    }

    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity-1}
            : cartItem
        );
    }
}

export const CartContext = createContext({
    isCartOpen: true,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) =>{
    const {type, payload} = action

    
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`ungandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) =>{

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)


    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce(
            (total, cartItem)=>total+cartItem.quantity,0)

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,0
        )

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))
    }

    const setIsCartOpen = (bool) =>{
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_IS_CART_OPEN,
                bool
            )
        )
    }

    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeAllItemsFromCart = (productToRemove) =>{
        const newCartItems = removeAllCartItems(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (productToRemove)=>{
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeAllItemsFromCart,removeItemFromCart, cartTotal}

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}