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
    //Check if product exists first
    let exists = false
    cart.map((i) => {
      if (i.product_id == product.product_id) {
        console.log(
          `found i: ${i.product_id}, and product: ${product.product_id}`
        )
        exists = true
        return i
      }
    })

    console.log(`Exists: ${exists}`)

    if (exists) {
      console.log('doing this one')
      product.qty = product.qty + 1
    } else {
      console.log('nope, this one now')
      product.qty = 1
    }

    setCart((prevState) => [...prevState, product])
    setLocalCart((prevState) => [...prevState, product])

    console.log(product)
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
