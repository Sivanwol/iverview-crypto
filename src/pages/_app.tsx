import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { publicProvider } from "@wagmi/core/dist/providers/public"
import { InjectedConnector } from "@wagmi/connectors/injected"
import { jsonRpcProvider } from "@wagmi/core/dist/providers/jsonRpc"
import { WalletConnectConnector } from "@wagmi/connectors/walletConnect"
import { ConnectKitProvider } from "connectkit"

const theme = createTheme({
  type: "dark" // it could be "light" or "dark"
})

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== 31337) return null
        return { http: "http://127.0.0.1:8545" }
      }
    }), publicProvider()]
)
let client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: false
      }
    }),
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    })
  ]
})
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
// }

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
      <ConnectKitProvider>
        <NextUIProvider theme={theme}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </NextUIProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default withBlitz(MyApp)
