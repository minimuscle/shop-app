import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

export default function Items() {
  return (
    <Container className="container">
      <h1>Items</h1>
      <Outlet />
    </Container>
  )
}
