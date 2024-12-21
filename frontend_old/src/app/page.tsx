'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface App {
  _id: string
  name: string
  description: string
  demo_url?: string
  source_url?: string
  screenshots: string[]
  created_at: string
  user_id: string
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([])

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/apps/')
        const data = await response.json()
        setApps(data)
      } catch (error) {
        console.error('アプリの取得に失敗しました:', error)
      }
    }

    fetchApps()
  }, [])

  return (
    <Box bg="blue.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              🏴‍☠️ 俺のアプリ 💀
            </Heading>
            <Text fontSize="xl" color="gray.600">
              作ったアプリを見せてやる！
            </Text>
          </Box>

          <SimpleGrid columns={1} spacing={8} w="full">
            {apps.map((app) => (
              <Box
                key={app._id}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
              >
                <Heading as="h2" size="md" mb={3}>
                  {app.name}
                </Heading>

                {app.screenshots && app.screenshots.length > 0 && (
                  <Box 
                    mb={4} 
                    borderRadius="md" 
                    overflow="hidden"
                    position="relative"
                    width="100%"
                    maxHeight="500px"
                  >
                    <Image
                      src={app.screenshots[0]}
                      alt={`${app.name}のスクリーンショット`}
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '500px',
                        margin: 'auto',
                        display: 'block'
                      }}
                      objectFit="contain"
                      backgroundColor="gray.100"
                    />
                  </Box>
                )}

                <Text color="gray.600" mb={4}>
                  {app.description}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  作成者: {app.user_id}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
} 