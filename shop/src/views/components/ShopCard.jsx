import React, { useEffect, useState, useContext } from 'react'
import { PropTypes } from 'prop-types'
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
import SendIcon from '@mui/icons-material/Send'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import axios from 'axios'
import '../../App.css'
import CartContext from '../context/CartContext'

function ShopCard(props) {
  const [products, setProducts] = useState(['Database Loading'])
  const [title, setTitle] = useState('h5')
  const [price, setPrice] = useState('h4')
  // TODO: This will eventually be set by the user
  const cardNum = 3
  const { cart, addItem } = useContext(CartContext)

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8080/products',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setProducts(response.data)
    }
    document.title = 'Shop | Shadowvale Crafts'
    async function getCardNum() {
      //This sets the size of the images and the text based on the number of cards, this will have a max size and min size.
      switch (cardNum) {
        case 3:
          setTitle('h5')
          setPrice('h4')
          break

        case 4:
          setTitle('h5')
          setPrice('h5')
          break

        case 5:
          setTitle('h6')
          setPrice('h6')
          break

        default:
          setTitle('h5')
          setPrice('h4')
      }
    }

    getProducts()
    getCardNum()
  }, [])

  function removeFromCart() {}

  return (
    <div>
      {products.map((product, key) => {
        // TODO: Move all of this from CARD to ShopCard Component
        return (
          <Card
            sx={{ maxWidth: 1090 / cardNum - 10, height: 1650 / cardNum }}
            key={key}
            className="card"
          >
            <Link to={`/shop/product/${product.product_id}`}>
              <CardHeader
                sx={{
                  display: 'flex',
                  overflow: 'hidden',
                  height: '75px',
                }}
                title={<Typography variant={title}>{product.name}</Typography>}
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
                  <Typography variant={price}>
                    {product.sale_price == null ? (
                      <div>${product.price}</div>
                    ) : (
                      <div className="salePrice">
                        ${product.sale_price}&#160;
                        <span>${product.price}</span>
                      </div>
                    )}
                  </Typography>
                }
              />

              <CardMedia
                component="img"
                sx={{ maxWidth: 400, maxHeight: 300 }}
                image={
                  product.image == null || product.image == 'null'
                    ? 'https://via.placeholder.com/400x300?text=400x300+No+Image'
                    : product.image
                }
                alt="Placeholder"
              />
            </Link>
            <CardContent>
              <Typography variant="body2" className="desc">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions className="buttons">
              <Button
                size="small"
                endIcon={<ShoppingCartIcon />}
                onClick={() => addItem(product)}
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
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

ShopCard.propTypes = {
  id: PropTypes.number,
}

export default ShopCard
