import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import axios from 'axios'

function Shop() {
  const [products, setProducts] = useState()

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/products',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setProducts(res.data)
    })
  })

  //Map the array of products to cards
  async function productCard() {
    await console.log(products)
  }

  return (
    <Container>
      <h1>Shadowvale Shop</h1>

      {
        /** // TODO: This code here should be iterated over */
        productCard()
      }

      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Lizard
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default Shop
