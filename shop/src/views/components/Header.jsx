/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { C } from '../context/CartContext'

function Header() {
  const { cart } = useContext(C)

  return (
    <div className="header">
      <Container>
        <Link to="/shop">
          <h1>Shadowvale Crafts</h1>
        </Link>
        <ul>
          <li>
            <Link to="/cart">Cart ({cart.length})</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </Container>
    </div>
  )
}

export default Header
