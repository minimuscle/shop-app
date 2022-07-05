/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import {
  Container,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { C } from '../context/CartContext'

function Header() {
  const { cart } = useContext(C)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <ul>
      <li>
        <Link to="/cart">Cart ({cart.length})</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/new">Add Product</Link>
      </li>
    </ul>
  )

  return (
    <div className="header">
      <Container>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Link to="/shop">
              <h1>Shadowvale Crafts</h1>
            </Link>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'inline-block' },
              float: 'right',
            }}
            open
          >
            {drawer}
          </Grid>
        </Toolbar>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '200px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Container>
    </div>
  )
}

export default Header
