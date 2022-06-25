import React from 'react'
import Header from '../pages/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer'
import { Container } from '@mui/material'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
