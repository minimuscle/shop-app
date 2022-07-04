/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const C = createContext()

const Context = ({ children }) => {
  const [cart, setCart] = useState([])
  return <C.Provider value={{ cart, setCart }}>{children}</C.Provider>
}

export default Context
