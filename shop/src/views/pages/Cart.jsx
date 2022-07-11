import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../context/CartContext'
import { Container, Card } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function Cart() {
  const { cart, removeItem } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartList, setCartList] = useState(cart)

  function addingPrice() {
    setTotalPrice(
      //TODO: Caluculate sale price as well
      cart.reduce((prev, element) => prev + Number(element.price), 0)
    )
  }

  useEffect(() => {
    let uniqueObjArray = [
      ...new Map(cart.map((item) => [item['product_id'], item])).values(),
    ]
    setCartList(uniqueObjArray)

    console.log('uniqueObjArray', uniqueObjArray)
  }, [cart])

  useEffect(() => {
    addingPrice()
  }, [totalPrice])

  return (
    <Container className="content">
      <h2>All Shops</h2>
      <span>Total Product Added - {cart.length}</span>
      <br />
      <span>Total - $ {totalPrice}</span>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartList.map((product, key) => (
              <TableRow key={key}>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">{product.qty}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">
                  ${product.price * product.qty}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">Subtotal Text</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">
                {/*`${(TAX_RATE * 100).toFixed(
                0
              )} %`*/}
              </TableCell>
              <TableCell align="right">Invoice Taxes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">Invvoice Total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Cart
