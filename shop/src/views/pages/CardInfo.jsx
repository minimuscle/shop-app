import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <Container className='content'>
      {productInfo.map((product) => {
        return (
          <Grid container key={product} className='productInfo'>
            <Grid item xs={10}>
              <Typography variant='h3'>{product.name}</Typography>
            </Grid>
            <Grid item xs={2} className='cardInfoPrice'>
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
            <Grid item xs={12} className='cardInfoPrice'>
              <Typography variant='h5'>
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
                <img src='https://via.placeholder.com/1000x600?text=1000x600+No+Image' />
              ) : (
                <img src='https://via.placeholder.com/400x300?text=Loading+Image' />
              )}
            </Grid>
            <Grid>
              <Typography variant='body2'>{product.description}</Typography>
            </Grid>
            <Grid>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
}

export default CardInfo;
