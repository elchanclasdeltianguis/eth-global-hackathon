import { useEffect, useState } from "react"
import { GetStaticProps } from "next"

/* WEB3 */
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"

/* STATE */
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import {
  siprelState,
  selectionState,
  networkState,
  stableCoinState,
  mxnState,
} from "../atoms/"

/* UTILS */
import { fetchProductData } from "../utils/fetchProductData"
import { fetchOraclePrice } from "../utils/calls"
import axios from "axios"

/* CONFIG */
import { TOKENS, chainDefaultToken } from "../config/tokens"

/* COMPONENTS */
import Image from "next/image"
import Layout from "../components/Layout"
import Categories from "../components/Categories/Categories"
import Carriers from "../components/Carriers/Carriers"
import Products from "../components/Products/Products"
import Payment from "../components/Payment/Payment"
import { XIcon } from "@heroicons/react/solid"

/* interfaces */
import { ISiprelProduct, ICarrier, ICategory, IToken } from "../typings"
import { CHAINS } from "../config/chains"

interface PropsContent {
  carriers: ICarrier[] | undefined
  productos: ISiprelProduct[] | undefined
  categorias: ICategory[] | undefined
}

interface Props {
  productData: PropsContent
  mxn: number
}

export default function Home({ productData, mxn }: Props) {
  const [, setSiprelData] = useRecoilState(siprelState)
  const [selection, setSelection] = useRecoilState(selectionState)
  const [prices, setPrices] = useRecoilState(stableCoinState)
  const [mxnPrice, setMxnPrice] = useRecoilState(mxnState)
  const [error, setError] = useState()
  const { account, connector, chainId, isActivating, isActive } = useWeb3React()

  useEffect(() => {
    setSiprelData(productData)
  }, []) // only load once

  useEffect(() => {
    // fetch busd price from chainlink oracle
    async function fetchPrice() {
      if (chainId) {
        let price = await fetchOraclePrice(
          chainId,
          TOKENS[chainDefaultToken[chainId]].oracle[chainId]
        )
        setPrices(price.toNumber() / 1e8)
        console.log(chainDefaultToken[chainId], price.toString())
      }
    }
    fetchPrice()
  }, [account, chainId]) // only load once

  useEffect(() => {
    setMxnPrice(mxn)
  }, [account, chainId, mxn])

  return (
    <Layout>
      {/* BRAND INFO */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <Image src="/images/logo.png" width={888} height={460} />
        <div className="mt-2 text-sm lowercase">
          powered by Chainlink & WalletConnect 😉
        </div>
        <h1>ALPHA USE AT OWN RISK!</h1>
      </div>
      {/* SHOP SECTION */}
      {!isActive && (
        <div className="mt-4 flex items-center justify-center font-display text-4xl">
          <h1 className="-skew-x-12 text-red-500 text-opacity-60">
            Conecta tu wallet!
          </h1>
        </div>
      )}
      {isActive && (
        <div>
          {/* SELECTION */}
          {selection.categoria && (
            <div className="mt-8 ml-8 flex items-center justify-center space-x-4 text-black">
              <div className="cursor-pointer rounded-lg bg-red-500 text-white shadow-lg">
                <div
                  onClick={() =>
                    setSelection({
                      categoria: undefined,
                      carrier: undefined,
                      producto: undefined,
                    })
                  }
                >
                  <XIcon height={32} />
                </div>
              </div>
              <button
                className="inline-block rounded-lg bg-slate-300 px-4 py-2 shadow-lg"
                onClick={() =>
                  setSelection({
                    categoria: undefined,
                    carrier: undefined,
                    producto: undefined,
                  })
                }
              >
                {selection.categoria?.Nombre}
              </button>
              {selection.carrier && (
                <button
                  className="inline-block rounded-lg bg-slate-300 px-4 py-2 shadow-lg"
                  onClick={() =>
                    setSelection({
                      categoria: selection.categoria,
                      carrier: undefined,
                      producto: undefined,
                    })
                  }
                >
                  {selection.carrier.Nombre}
                </button>
              )}
              {selection.producto && (
                <button
                  className="inline-block rounded-lg bg-slate-300 px-4 py-2 shadow-lg"
                  onClick={() =>
                    setSelection({
                      categoria: selection.categoria,
                      carrier: selection.carrier,
                      producto: undefined,
                    })
                  }
                >
                  <div>${parseInt(selection.producto.Monto)}</div>
                </button>
              )}
            </div>
          )}
          {/* NOTHING SELECTED */}
          {selection.categoria === undefined && (
            <div>
              <div>
                <Categories />
              </div>
            </div>
          )}
          {/* CATEGORIA SELECTED */}
          {selection.categoria && selection.carrier === undefined && (
            <div>
              <div>
                <Carriers />
              </div>
            </div>
          )}
          {/* CARRIER SELECTED */}
          {selection.producto === undefined && selection.carrier && (
            <div>
              <div>
                <Products />
              </div>
            </div>
          )}
          {/* PRODUCT SELECTED AKA PAYMENT*/}
          {selection.producto !== undefined && (
            <div>
              <Payment />
            </div>
          )}
        </div>
      )}
      {/* BOTTOM SPACER */}
      <div className="h-8" />
      <div className="flex items-center justify-center">
        hecho con
        <Image src="/images/chanclas.png" width={64} height={64} />
        en Mexico
      </div>
      <div className="h-12" />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchProductData()
  async function fetchPrice() {
    const mxnUrl = "*****"

    let response = await axios
      .get(mxnUrl, {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((res) => res)
      .catch((err) => console.log(err))
    return response
  }

  const mxn: any = await fetchPrice()
  console.log("fe", mxn.data.payload.vwap)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { productData: data, mxn: mxn.data.payload.vwap },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 86400 seconds
    revalidate: 86400, // in secs, 86400 sec = 1 day
  }
}
