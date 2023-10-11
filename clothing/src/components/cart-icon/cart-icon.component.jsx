import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cart.context'

const CartIcon = () =>{

    const {setIsCartOpen, isCartOpen, cartItems, cartCount} = useContext(CartContext)

    // My own code created by challenge to make counter for products inside cart
    const calcCartQuantity = () =>{
        let quantity = 0;
        if(cartItems.length){
            cartItems.map((item)=>{
                quantity+=item.quantity
            })
        }
        return quantity
    }
    const cartQuantity = calcCartQuantity()



    return(
        <CartIconContainer onClick={()=>{setIsCartOpen(!isCartOpen)}}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>

        </CartIconContainer>
    )
}

export default CartIcon