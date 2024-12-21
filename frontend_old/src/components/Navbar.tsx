'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  Image,
  Link as ChakraLink
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <Box 
      bg="blue.100"
      px={4}
      boxShadow='sm'
      borderBottom="1px"
      borderColor="blue.200"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/">
          <Flex alignItems="center">
            <Box fontWeight="bold" fontSize="xl">🗡️ 俺のアプリ 🏴‍☠️</Box>
          </Flex>
        </Link>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={4}>
            <Link href="/post_app">
              <Button 
                variant={'solid'}
                colorScheme={'green'}
                _hover={{ bg: 'green.500' }}
              >
                アプリを紹介する
              </Button>
            </Link>
            <Link href="/login">
              <Button variant={'solid'} colorScheme={'blue'}>
                ログイン
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
} 