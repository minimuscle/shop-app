import React from "react";
import { Container } from "@mui/material";
import ShopCard from "./ShopCard";

function Shop() {
  return (
    <Container className='content'>
      <h2>All Shops</h2>
      <ShopCard />
    </Container>
  );
}

export default Shop;
