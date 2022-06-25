import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='header'>
      <Container>
        <h1>Shadowvale Crafts</h1>
        <ul>
          <li>
            <Link to='/shop'>My Cart</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Header;
