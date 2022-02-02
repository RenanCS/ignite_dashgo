import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MenuDrawerProiver } from 'src/contexts/MenuDrawerContext'
import { makeServer } from 'src/services/mirage'
import { queryClient } from 'src/services/queryClient'
import { theme } from 'src/styles/theme'

if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
  makeServer();
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        < MenuDrawerProiver>
          <Component {...pageProps} />
        </MenuDrawerProiver>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
