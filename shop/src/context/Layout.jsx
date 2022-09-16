import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Container maxW="container.xl">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  )
}
