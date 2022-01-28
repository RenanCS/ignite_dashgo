import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles/theme'
import { MenuDrawerProiver } from 'src/contexts/MenuDrawerContext'
import { makeServer } from 'src/services/mirage'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        < MenuDrawerProiver>
          <Component {...pageProps} />
        </MenuDrawerProiver>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
