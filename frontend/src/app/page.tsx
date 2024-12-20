'use client'

import { Box, Container, Heading, Text, VStack, Button, Stack, Icon } from '@chakra-ui/react'
import * as FaIcons from 'react-icons/fa'
import Link from 'next/link'

export default function Home() {
  return (
    <Box 
      bg="blue.50" 
      h="calc(100vh - 64px - 10px)" 
      p={0}
      overflow="hidden"
    >
      <Container 
        maxW="container.xl" 
        h="full" 
        display="flex" 
        alignItems="flex-start"
        justifyContent="center"
        pt="15vh"
        overflow="hidden"
      >
        <VStack spacing={1} align="center" w="full">
          {/* ヒーローセクション */}
          <Box 
            textAlign="center" 
            py={0}
            bg="blue.50"
            px={4}
            border="none"
            shadow="none"
          >
            <Heading 
              as="h1" 
              size="2xl" 
              mb={1}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              🗡️ 俺のアプリ🏴‍☠️
            </Heading>
            <Container maxW="container.md" centerContent>
              <Box pl={{ base: 4, md: "100px" }}>
                <VStack align="start" spacing={1} my={2}>
                  <Text>A「うわーん（ToT）」</Text>
                  <Text>B「おい、どうした（？？）」</Text>
                  <Text>A「だれも見てくれない、俺のアプリ」</Text>
                  <Text>B「おい、今から見てるから、泣くなよ！」</Text>
                </VStack>
              </Box>
            </Container>
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4} 
              justify="center"
            >
              <Link href="/show_app">
                <Button 
                  size="lg" 
                  colorScheme="blue"
                  leftIcon={<Icon as={FaIcons.FaSearch} />}
                >
                  見てやる
                </Button>
              </Link>
              <Link href="/post_app">
                <Button 
                  size="lg" 
                  variant="outline" 
                  colorScheme="blue"
                  leftIcon={<Icon as={FaIcons.FaStar} />}
                  _hover={{
                    bg: 'yellow.50',
                    borderColor: 'yellow.400',
                    color: 'yellow.600'
                  }}
                >
                  見せてやる
                </Button>
              </Link>
            </Stack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
} 