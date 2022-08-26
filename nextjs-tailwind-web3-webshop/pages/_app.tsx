/* WEB3 */
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"

import { MetaMask } from "@web3-react/metamask"
import { WalletConnect } from "@web3-react/walletconnect"

import { hooks as metaMaskHooks, metaMask } from "../connectors/metamask"
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "../connectors/walletconnect"

/* STATE */
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

/* STYLE */
import "../styles/globals.css"

/*  TYPES */
import { AppProps } from "next/app"

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
]

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Web3ReactProvider>
  )
}

export default App
