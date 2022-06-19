import React from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'

function CardInfo() {
  const { productId } = useParams()

  return (
    <Container>
      <h1>Shadowvale Shop With ID!!!</h1>
      <p>ID: {productId}</p>
      {console.log(productId)}
    </Container>
  )
}

export default CardInfo
