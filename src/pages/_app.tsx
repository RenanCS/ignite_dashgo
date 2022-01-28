import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles/theme'
import { MenuDrawerProiver } from 'src/contexts/MenuDrawerContext'
import { makeServer } from 'src/services/mirage'

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      < MenuDrawerProiver>
        <Component {...pageProps} />
      </MenuDrawerProiver>
    </ChakraProvider>
  )
}

export default MyApp
