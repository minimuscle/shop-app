import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button, Breadcrumbs } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function CardInfo() {
  const { productId } = useParams()
  const [productInfo, setProductInfo] = useState(['Database Loading'])

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
    }
    getProducts()
  }, [productId])

  return (
    <Container className="content">
      {productInfo.map((product) => {
        return (
          <Grid container key={product} className="productInfo">
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Breadcrumbs</Typography>
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
              {product.image == null ? (
                <img src="https://via.placeholder.com/1000x600?text=1000x600+No+Image" />
              ) : (
                <img src="https://via.placeholder.com/400x300?text=Loading+Image" />
              )}
            </Grid>
            <Grid item xs={6} className="cardDesc">
              <Typography variant="h6">Description:</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <div className="buttons">
                <Button variant="contained" endIcon={<ShoppingCartIcon />}>
                  Add to Cart
                </Button>
                <Button variant="contained" endIcon={<SendIcon />}>
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

export default CardInfo
