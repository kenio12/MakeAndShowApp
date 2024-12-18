'use client'

import React from 'react'
import { Box, Container, Heading, Text, SimpleGrid, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function ShowAppPage() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          アプリ一覧
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {/* メモアプリ */}
          <Box
            p={6}
            borderRadius="lg"
            boxShadow="md"
            bg="white"
            _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
          >
            <Heading as="h2" size="md" mb={3}>
              メモアプリ
            </Heading>
            <Text color="gray.600" mb={4}>
              シンプルで使いやすいメモ管理アプリです。
            </Text>
            <Button
              as={Link}
              href="/memo"
              colorScheme="blue"
            >
              開く
            </Button>
          </Box>

          {/* 今後のアプリを追加する場合はここに追加していく */}
        </SimpleGrid>

        <Box mt={8}>
          <Button
            as={Link}
            href="/"
            variant="link"
            color="blue.500"
            leftIcon={<span>←</span>}
          >
            トップページに戻る
          </Button>
        </Box>
      </VStack>
    </Container>
  )
} 