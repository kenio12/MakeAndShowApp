'use client'

import React, { useState, useRef } from 'react'
import { Box, Container, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast, SimpleGrid, Image, IconButton, Text, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation';
import { FaUpload } from 'react-icons/fa'

interface AppFormData {
  name: string;
  prefix_icon: string;
  suffix_icon: string;
  description: string;
  demoUrl: string;
  sourceUrl: string;
  screenshots: File[];
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
    prefix_icon: '🗡️',
    suffix_icon: '🏴‍☠️',
    description: '',
    demoUrl: '',
    sourceUrl: '',
    screenshots: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        screenshots: files
      }));

      // プレビュー用のURL生成
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => {
        // 古いプレビューのURLを解放
        prev.forEach(url => URL.revokeObjectURL(url));
        return newPreviews;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true);
      
      let uploadedUrls: string[] = [];
      
      // まず画像をアップロード
      if (formData.screenshots && formData.screenshots.length > 0) {
        const imageFormData = new FormData();
        formData.screenshots.forEach(file => {
          imageFormData.append('files', file);
        });

        const uploadResponse = await fetch('http://localhost:8000/api/upload/screenshots', {
          method: 'POST',
          body: imageFormData
        });

        if (!uploadResponse.ok) {
          throw new Error('画像のアップロードに失敗しました');
        }

        uploadedUrls = await uploadResponse.json();
      }

      // アプリデータを送信（スクリーンショットのURLを含む）
      const response = await fetch('http://localhost:8000/api/apps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.name,
          prefix_icon: formData.prefix_icon,
          suffix_icon: formData.suffix_icon,
          description: formData.description,
          demo_url: formData.demoUrl || null,
          github_url: formData.sourceUrl || null,
          user_id: "development_user_001",
          screenshots: uploadedUrls
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
        duration: 3000,
        isClosable: true,
      });
      
      // フォームをリセット
      setFormData({
        name: '',
        prefix_icon: '',
        suffix_icon: '',
        description: '',
        demoUrl: '',
        sourceUrl: '',
        screenshots: []
      });

      // 少し待ってからリダイレクト（トーストメッセージを見せるため）
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
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
    <Box bg="blue.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading as="h1" size="xl">
            アプリを見せてやる
          </Heading>

          <Box 
            as="form"
            onSubmit={handleSubmit}
            w="full" 
            maxW="800px" 
            p={8} 
            borderRadius="xl" 
            bg="blue.50"
          >
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>アプリ名</FormLabel>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="あなたのアプリの名前" 
                  bg="white"
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
                  bg="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>デモURL</FormLabel>
                <Input 
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://..." 
                  bg="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>ソースコードURL</FormLabel>
                <Input 
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..." 
                  bg="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>スクリーンショット</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  display="none"
                  ref={fileInputRef}
                />
                
                <Box
                  bg="white"
                  p={6}
                  borderRadius="md"
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor="blue.300"
                  textAlign="center"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const files = Array.from(e.dataTransfer.files)
                    if (files.some(file => !file.type.startsWith('image/'))) {
                      toast({
                        title: "エラー",
                        description: "画像ファイルのみアップロードできます",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      })
                      return
                    }
                    const event = { target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>
                    handleFileChange(event)
                  }}
                >
                  <VStack spacing={2}>
                    <Icon as={FaUpload} w={8} h={8} color="blue.400" />
                    <Text>
                      ドラッグ&ドロップ または
                    </Text>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      colorScheme="blue"
                      variant="outline"
                      bg="white"
                    >
                      画像を選択
                    </Button>
                  </VStack>
                </Box>
                
                {/* プレビュー表示 */}
                {previews.length > 0 && (
                  <SimpleGrid columns={3} spacing={4} mt={4}>
                    {previews.map((preview, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          borderRadius="md"
                        />
                        <IconButton
                          aria-label="Remove image"
                          icon={<CloseIcon />}
                          size="sm"
                          position="absolute"
                          top={1}
                          right={1}
                          onClick={() => {
                            // プレビューと選択された画像を削除
                            URL.revokeObjectURL(preview);
                            setPreviews(prev => prev.filter((_, i) => i !== index));
                            setFormData(prev => ({
                              ...prev,
                              screenshots: prev.screenshots.filter((_, i) => i !== index)
                            }));
                          }}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                )}
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
    </Box>
  )
} 