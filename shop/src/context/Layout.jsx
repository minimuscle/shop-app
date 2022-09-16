import React from 'react'
import { Box } from '@chakra-ui/react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router-dom'
import '../App.css'

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
