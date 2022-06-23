import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import "../../App.css";

function ShopCard() {
  const [products, setProducts] = useState(["Database Loading"]);
  // TODO: This will eventually be set by the user
  const cardNum = 3;

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/products",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    }
    getProducts();

    //This sets the side of the images and the text based on the number of cards, this will have a max side and min size.
  }, []);

  return (
    <div>
      {products.map((product, key) => {
        return (
          <Card
            sx={{ maxWidth: 1090 / cardNum, height: 550 }}
            key={key}
            className='card'
          >
            <Link to={`/shop/product/${product.product_id}`}>
              <CardHeader
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  lineClamp: "3",
                  "& .MuiCardHeader-content": {
                    overflow: "hidden",
                  },
                  height: "75px",
                  verticalAlign: "text-top",
                }}
                title={<Typography variant='h5'>{product.name}</Typography>}
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
                    ? "https://via.placeholder.com/400x300?text=400x300+No+Image"
                    : "https://via.placeholder.com/400x300?text=Loading+Image"
                }
                alt='Placeholder'
              />
            </Link>
            <CardContent>
              <Typography variant='body2' className='desc'>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions className='buttons'>
              <Button size='small' endIcon={<ShoppingCartIcon />}>
                Add to Cart
              </Button>
              <Button variant='contained' endIcon={<SendIcon />}>
                Buy Now
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default ShopCard;
