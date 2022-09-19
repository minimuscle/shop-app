import {
  Box,
  Container,
  IconButton,
  useColorModeValue,
  useDisclosure,
  dark,
  useColorMode,
} from '@chakra-ui/react'
import React from 'react'

export default function Header() {
  const { isDark, onToggle } = useDisclosure()

  return (
    <Box
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Container maxW={'6xl'}>Header</Container>
    </Box>
  )
}
