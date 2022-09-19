import React from 'react'
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function NoMatch() {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      marginTop={'10%'}
      marginBottom={'-10%'}
      className="container"
    >
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-b, purple.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Whoops! Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist, try again!
      </Text>

      <Link to="/">
        <Button
          colorScheme="purple"
          bgGradient="linear(to-b, purple.400, purple.500, purple.600)"
          color="white"
          variant="solid"
        >
          Go back to the shop
        </Button>
      </Link>
    </Box>
  )
}
