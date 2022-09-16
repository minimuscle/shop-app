import { Box, Container, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      className={
        colorMode === 'light'
          ? 'background container'
          : 'background-dark container'
      }
    >
      <Container maxW={'6xl'}>Home</Container>
    </Box>
  )
}
