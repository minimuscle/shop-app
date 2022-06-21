import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";

function CardInfo() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState(["Database Loading"]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8080/product/${productId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProductInfo([response.data]);
    }
    getProducts();
  }, [productId]);

  return (
    <Container>
      {productInfo.map((product) => {
        return (
          <Grid container key={product} className='productInfo'>
            <Grid item xs={4}>
              <Typography variant='h3'>{product.name}</Typography>
            </Grid>
            <Grid item xs={8} className='cardInfoPrice'>
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
            </Grid>
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
              sx={{ maxWidth: 1000, maxHeight: 600 }}
              image={
                product.image == null
                  ? "https://via.placeholder.com/1000x600?text=1000x600+No+Image"
                  : "https://via.placeholder.com/400x300?text=Loading+Image"
              }
              alt='Placeholder'
            />
            <CardContent>
              <Typography variant='body2'>{product.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Grid>
        );
      })}
    </Container>
  );
}

export default CardInfo;
