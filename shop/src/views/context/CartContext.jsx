/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [localCart, setLocalCart] = useLocalStorage('cart', cart)

  useEffect(() => {
    if (localCart) setCart(localCart)
  }, [])

  const addItem = (product) => {
    setCart((prevState) => [...prevState, product])
    setLocalCart((prevState) => [...prevState, product])
  }

  const removeItem = (product) => {
    console.log(`Removing 1x product with id: ${product.product_id}`)
    //setCart((prevState) => [...prevState, product])
    //setLocalCart((prevState) => [...prevState, product])
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
