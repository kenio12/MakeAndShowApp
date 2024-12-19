'use client'

import React, { useEffect, useState } from 'react'
import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { 
  Rocket, 
  GameController, 
  Robot, 
  ChartPie, 
  Database, 
  Globe,
  Code,
  Lightning,
  Cloud,
  Laptop
} from "@phosphor-icons/react"

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

const icons = [
  Rocket,
  GameController,
  Robot,
  ChartPie,
  Database,
  Globe,
  Code,
  Lightning,
  Cloud,
  Laptop
]

export default function ShowAppPage() {
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
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          あぷり達
        </Heading>
        
        <SimpleGrid 
          columns={1}
          spacing={8}
          width="100%"
          maxWidth="800px"
          mx="auto"
        >
          {apps.map((app, index) => {
            const IconComponent = icons[index % icons.length]
            return (
              <Box
                key={app._id}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                width="100%"
                _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
              >
                <Heading as="h2" size="md" mb={3} display="flex" alignItems="center" gap={2}>
                  <IconComponent size={24} weight="duotone" color="#4A5568" />
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
                    sx={{
                      '& img': {
                        maxWidth: '100%',
                        maxHeight: '500px',
                        margin: 'auto',
                        display: 'block'
                      }
                    }}
                  >
                    <Image
                      src={app.screenshots[0]}
                      alt={`${app.name}のスクリーンショット`}
                      style={{
                        width: 'auto',
                        height: 'auto'
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
                {(app.demo_url || app.source_url) && (
                  <Box mt={4}>
                    {app.demo_url && (
                      <Button as="a" href={app.demo_url} target="_blank" size="sm" mr={2}>
                        デモを見る
                      </Button>
                    )}
                    {app.source_url && (
                      <Button as="a" href={app.source_url} target="_blank" size="sm" variant="outline">
                        ソースコード
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            )
          })}
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