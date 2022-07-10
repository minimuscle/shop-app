import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../context/CartContext'
import { Container, Card } from '@mui/material'

function Cart() {
  const { cart, removeItem } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)

  function addingPrice() {
    setTotalPrice(
      //TODO: Caluculate sale price as well
      cart.reduce((prev, element) => prev + Number(element.price), 0)
    )
  }

  useEffect(() => {
    addingPrice()
  }, [totalPrice])

  return (
    <Container className="content">
      <h2>All Shops</h2>
      <span>Total Product Added - {cart.length}</span>
      <br />
      <span>Total - $ {totalPrice}</span>
      <div className="productContainer">
        {cart.map((product, key) => {
          console.log(product.name)
          return (
            <Card
              key={key}
              className="card"
              onClick={() => removeItem(product)}
            >
              {product.name}
            </Card>
          )
        })}
      </div>
    </Container>
  )
}

export default Cart
