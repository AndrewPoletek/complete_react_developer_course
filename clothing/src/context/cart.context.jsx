import { createContext, useState, useEffect } from "react";

const calculateCartTotal = (cartItems) =>{
    let tmp_total = 0
    cartItems.map((item)=>{
        tmp_total+=item.price*item.quantity
    })
    return tmp_total
}

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
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0,
    cartTotal: 0
})


export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total, cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        setCartTotal(calculateCartTotal(cartItems))
    }, [cartItems])



    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeAllItemsFromCart = (productToRemove) =>{
        setCartItems(removeAllCartItems(cartItems, productToRemove))
    }

    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeAllItemsFromCart,removeItemFromCart, cartTotal}

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}