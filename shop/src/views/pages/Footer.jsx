import React from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <Container>
        <h1>Shadowvale Crafts Footer</h1>
        <ul>
          <li>
            <Link to="/shop">My Cart</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </Container>
    </div>
  )
}

export default Footer
