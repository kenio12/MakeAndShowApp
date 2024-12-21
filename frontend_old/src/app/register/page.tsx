'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { register as registerUser } from '@/services/auth'

type RegisterForm = {
  email: string
  username: string
  password: string
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true)
      await registerUser(data)
      toast({
        title: '確認メールを送信しました',
        description: 'メールを確認して登録を完了してください',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: '登録に失敗しました',
        description: error instanceof Error ? error.message : '予期せぬエラーが発生しました',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
        <Stack spacing={6}>
          <Heading size="lg">新規登録</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  {...register('email', { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>ユーザー名</FormLabel>
                <Input
                  {...register('username', { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  {...register('password', { required: true })}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                isLoading={isLoading}
              >
                登録する
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Container>
  )
} 