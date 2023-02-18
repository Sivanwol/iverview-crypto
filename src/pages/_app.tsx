import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { configureChains, Connector, createClient, mainnet, WagmiConfig } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { publicProvider } from "@wagmi/core/providers/public"
import { InjectedConnector } from "@wagmi/connectors/injected"
import { hardhat } from "@wagmi/chains"

const theme = createTheme({
  type: "dark" // it could be "light" or "dark"
})

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, hardhat],
  [publicProvider()]
)
const connectors: Connector[] = [
  new MetaMaskConnector({ chains }),
  new InjectedConnector({
    chains,
    options: {
      name: "Injected",
      shimDisconnect: true
    }
  })
]

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error.message || error.name}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <WagmiConfig client={client}>
      <NextUIProvider theme={theme}>
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </NextUIProvider>
    </WagmiConfig>
  )
}

export default withBlitz(MyApp)
