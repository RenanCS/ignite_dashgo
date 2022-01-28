import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles/theme'
import { MenuDrawerProiver } from 'src/contexts/MenuDrawerContext'

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
