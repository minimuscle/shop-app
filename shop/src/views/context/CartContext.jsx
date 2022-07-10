/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (product) => {
    setCart((prevState) => [...prevState, product])
  }

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
