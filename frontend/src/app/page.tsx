'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Icon, AspectRatio, Button, Stack } from '@chakra-ui/react'
import * as FaIcons from 'react-icons/fa'
import Link from 'next/link'

type FeatureIconName = 'FaHeart' | 'FaLightbulb' | 'FaRobot' | 'FaUsers' | 'FaCode';

interface Feature {
  iconName: FeatureIconName;
  title: string;
  description: string;
}

export default function Home() {
  const features: Feature[] = [
    {
      iconName: 'FaHeart',
      title: "開発者の気持ちに寄り添う",
      description: "開発中の喜怒哀楽を共有。モチベーション維持を支援します。"
    },
    {
      iconName: 'FaLightbulb',
      title: "作りかけでもOK",
      description: "完成前でも気軽に共有。フィードバックをもらえます。"
    },
    {
      iconName: 'FaRobot',
      title: "AI開発体験の共有",
      description: "AIツールとの開発体験を共有。成功も失敗も学びに。"
    },
    {
      iconName: 'FaUsers',
      title: "リアルな開発の裏側",
      description: "開発の真の姿を共有。同じ悩みを持つ仲間と繋がれます。"
    },
    {
      iconName: 'FaCode',
      title: "完全無料",
      description: "すべての機能を無料で利用可能。気軽に始められます。"
    }
  ]

  return (
    <Box bg="blue.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={10} align="stretch">
          {/* ヒーローセクション */}
          <Box 
            textAlign="center" 
            py={20} 
            bg="blue.50"
            borderRadius="xl"
            px={4}
            boxShadow="sm"
          >
            <Heading 
              as="h1" 
              size="2xl" 
              mb={6}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              🗡️ 俺のアプリ🏴‍☠️
            </Heading>
            <Container maxW="container.md" centerContent>
              <Box pl={{ base: 4, md: "100px" }}>
                <VStack align="start" spacing={2} my={4}>
                  <Text>A「うわーん（ToT）」</Text>
                  <Text>B「おい、どうした（？？）」</Text>
                  <Text>A「だれも見てくれない、俺のアプリ」</Text>
                  <Text>B「おい、今から見てやるから
                    、泣くなよ！」</Text>
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

          {/* 最新の開発ストーリー */}
          <Box>
            <Heading as="h2" size="xl" mb={6} textAlign="center">
              最新の開発ストーリー
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {[1, 2, 3].map((_, index) => (
                <Box 
                  key={index}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  bg="white"
                  _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
                >
                  <AspectRatio ratio={16 / 9} mb={4}>
                    <Box 
                      bg="gray.200" 
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>アプリのスクリーンショット</Text>
                    </Box>
                  </AspectRatio>
                  <Heading as="h3" size="md" mb={2}>
                    作りかけのAIチャットボット
                  </Heading>
                  <Text color="gray.600" mb={4}>
                    "まだバグだらけだけど、AIの応答がちょっと面白い。みんなの意見が欲しい！"
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    @開発者の名前 • 2時間前
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* 動画セクション */}
          <Box>
            <Heading as="h2" size="xl" mb={6} textAlign="center">
              開発の舞台裏をのぞいてみよう
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box 
                p={6}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
              >
                <AspectRatio ratio={16 / 9} mb={4}>
                  <iframe
                    src="https://www.youtube.com/embed/your-video-id"
                    title="開発の様子"
                    allowFullScreen
                    style={{ borderRadius: '10px' }}
                  />
                </AspectRatio>
                <Heading as="h3" size="md" mb={2}>
                  リアルな開発風景
                </Heading>
                <Text color="gray.600">
                  実際の開発現場での試行錯誤や、問題解決の過程をご覧ください。
                </Text>
              </Box>
              <Box 
                p={6}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
              >
                <AspectRatio ratio={16 / 9} mb={4}>
                  <iframe
                    src="https://www.youtube.com/embed/another-video-id"
                    title="開発テクニック"
                    allowFullScreen
                    style={{ borderRadius: '10px' }}
                  />
                </AspectRatio>
                <Heading as="h3" size="md" mb={2}>
                  実践的な開発テクニック
                </Heading>
                <Text color="gray.600">
                  効率的な開発手法やトラブルシューティングのコツをシェアします。
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* 特徴紹介 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <Box 
                key={index}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                _hover={{ transform: 'translateY(-4px)', transition: '0.3s' }}
              >
                <Icon as={FaIcons[feature.iconName]} w={8} h={8} color="blue.500" mb={4} />
                <Heading as="h3" size="md" mb={3}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
} 