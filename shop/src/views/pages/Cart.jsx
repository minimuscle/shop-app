import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../context/CartContext'
import { Container, Card } from '@mui/material'

function Cart() {
  const { cart } = useContext(CartContext)

  return (
    <Container className="content">
      <h2>All Shops</h2>
      <span>Total Product Added - {cart.length}</span>
      <br />
      <span>Total - $ </span>
      <div className="productContainer">
        {cart.map((product, key) => {
          console.log(product.name)
          return (
            <Card key={key} className="card">
              {product.name}
            </Card>
          )
        })}
      </div>
    </Container>
  )
}

export default Cart
