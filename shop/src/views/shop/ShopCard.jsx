import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
  CardMedia,
} from '@mui/material'
import axios from 'axios'
import '../../App.css'

function ShopCard() {
  const [products, setProducts] = useState(['Database Loading'])

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8080/products',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setProducts([response.data])
    }
    getProducts()
  }, [])

  return (
    <div>
      {products.map((product) => {
        return (
          <Card sx={{ maxWidth: 400 }} key={product} className='card'>
            <Link to={`/shop/product/${product.product_id}`}>
              <CardHeader
                title={product.name}
                subheader={
                  product.parent == null ? (
                    <div>{product.category}</div>
                  ) : (
                    <div>
                      {product.parent}&#160;&#8226;&#160;
                      {product.category}
                    </div>
                  )
                }
                action={
                  <Typography variant='h4'>
                    {product.sale_price == null ? (
                      <div>${product.price}</div>
                    ) : (
                      <div className='salePrice'>
                        ${product.sale_price}&#160;
                        <span>${product.price}</span>
                      </div>
                    )}
                  </Typography>
                }
              />

              <CardMedia
                component='img'
                sx={{ maxWidth: 400, maxHeight: 300 }}
                image={
                  product.image == null
                    ? 'https://via.placeholder.com/400x300?text=400x300+No+Image'
                    : 'https://via.placeholder.com/400x300?text=Loading+Image'
                }
                alt='Placeholder'
              />
            </Link>
            <CardContent>
              <Typography variant='body2'>{product.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

export default ShopCard
