import React, { useEffect, useState, useContext } from 'react'
import { PropTypes } from 'prop-types'
import { Container, Grid, Typography, Button, Breadcrumbs } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { C } from '../context/CartContext'

function CardInfo(props) {
  const { productId } = useParams()
  const [productInfo, setProductInfo] = useState(['Database Loading'])
  const { cart, setCart } = useContext(C)

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8080/product/${productId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setProductInfo([response.data])
      document.title = response.data.name + ' | Shadowvale Crafts'
      console.log(productId)
    }
    getProducts()
  }, [productId])

  function addToCart() {
    setCart([...cart, props])
  }

  function removeFromCart() {
    setCart(cart.filter((c) => c.id !== props.id))
  }

  return (
    <Container className="content">
      {productInfo.map((product) => {
        return (
          <Grid container key={product} className="productInfo">
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">
                  {product.category} /{' '}
                  {product.parent != null ? product.parent : null}{' '}
                  {product.name}{' '}
                </Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={10}>
              <Typography variant="h3">{product.name}</Typography>
            </Grid>
            <Grid item xs={2} className="cardInfoPrice">
              <Typography variant="h4">
                {product.sale_price == null ? (
                  <div>${product.price}</div>
                ) : (
                  <div className="salePrice">
                    ${product.sale_price}&#160;
                    <span>${product.price}</span>
                  </div>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} className="cardInfoPrice">
              <Typography variant="h5">
                {product.parent == null ? (
                  <div>{product.category}</div>
                ) : (
                  <div>
                    {product.parent}&#160;&#8226;&#160;
                    {product.category}
                  </div>
                )}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {product.image == null || product.image == 'null' ? (
                <img src="https://via.placeholder.com/1000x600?text=1000x600+No+Image" />
              ) : (
                <img src={product.image} />
              )}
            </Grid>
            <Grid item xs={6} className="cardDesc">
              <Typography variant="h6">Description:</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="body2">Tags: {product.tags}</Typography>
              <div className="buttons">
                <Button
                  size="small"
                  endIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={removeFromCart}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
          </Grid>
        )
      })}
    </Container>
  )
}

CardInfo.propTypes = {
  id: PropTypes.integer,
}

export default CardInfo
