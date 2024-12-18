'use client'

import React, { useState } from 'react'
import { Box, Container, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react'
import Link from 'next/link'

interface AppFormData {
  name: string;
  description: string;
  demoUrl: string;
  sourceUrl: string;
}

interface ApiError {
  detail: string | {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

interface ApiResponse {
  id: number;
  name: string;
  description: string;
  demo_url: string | null;
  source_url: string | null;
}

export default function PostAppPage() {
  const toast = useToast()
  const [formData, setFormData] = useState<AppFormData>({
    name: '',
    description: '',
    demoUrl: '',
    sourceUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('http://localhost:8000/api/apps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          demo_url: formData.demoUrl || null,
          source_url: formData.sourceUrl || null
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        const errorMessage = Array.isArray(errorData.detail) 
          ? errorData.detail[0].msg 
          : errorData.detail;
        throw new Error(errorMessage);
      }

      const data = await response.json() as ApiResponse;
      
      // 成功時の処理
      toast({
        title: "投稿成功！",
        description: "アプリの情報が正常に投稿されました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // フォームをリセット
      setFormData({
        name: '',
        description: '',
        demoUrl: '',
        sourceUrl: ''
      });
      
    } catch (error: unknown) {
      let errorMessage = "予期せぬエラーが発生しました";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast({
        title: "エラー",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      
      // 開発環境でのみエラーの詳細をログ出力
      if (process.env.NODE_ENV === 'development') {
        console.error('投稿エラーの詳細:', error);
      }
      
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          アプリを投稿する
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>アプリ名</FormLabel>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="あなたのアプリの名前" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>説明</FormLabel>
              <Textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="アプリの説明、開発秘話、苦労した点など" 
                rows={6}
              />
            </FormControl>

            <FormControl>
              <FormLabel>デモURL</FormLabel>
              <Input 
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://..." 
              />
            </FormControl>

            <FormControl>
              <FormLabel>ソースコードURL</FormLabel>
              <Input 
                name="sourceUrl"
                value={formData.sourceUrl}
                onChange={handleChange}
                placeholder="https://github.com/..." 
              />
            </FormControl>

            <Box>
              <Button 
                type="submit" 
                colorScheme="blue" 
                mr={4}
                isLoading={isSubmitting}
                loadingText="投稿中..."
              >
                投稿する
              </Button>
              <Button as={Link} href="/" variant="ghost">
                キャンセル
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
} 