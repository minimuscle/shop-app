import React, { useState, useEffect, useContext } from 'react'
import { C } from '../context/CartContext'
import { Container, Card, CardContent } from '@mui/material'

const Cart = () => {
  const { cart } = useContext(C)

  const [totalPrice, setTotalPrice] = useState(0)

  console.log(cart)

  function addingPrice() {
    setTotalPrice(cart.reduce((acc, ele) => acc + Number(ele.price), 0))
  }

  useEffect(() => {
    addingPrice()
  }, [cart])

  return (
    <Container className="content">
      <h2>All Shops</h2>
      <span>Total Product Added - {cart.length}</span>
      <br />
      <span>Total - $ {totalPrice} </span>
      <div className="productContainer">
        {cart.map((prod) => (
          <Card key={prod.id} className="card">
            <CardContent>Hi</CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default Cart
