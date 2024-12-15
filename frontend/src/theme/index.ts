import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  colors: {
    brand: {
      50: '#e5f0ff',
      100: '#b8d4ff',
      200: '#8ab8ff',
      300: '#5c9cff',
      400: '#2e80ff',
      500: '#0064ff',
      600: '#004ec7',
      700: '#00388f',
      800: '#002257',
      900: '#000c1f',
    },
  },
}) 