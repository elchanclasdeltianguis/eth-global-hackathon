import React from "react"
import { ISiprelProduct } from "../../typings"

/* WEB3 */
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core"

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
  mxnState,
  stableCoinState,
} from "../../atoms/"

/* CONFIG */
import { TOKENS, chainDefaultToken } from "../../config/tokens"

interface Props {
  product: ISiprelProduct
}

const Product = (product: Props) => {
  const [stableCoinPrice, setStableCoinPrice] = useRecoilState(stableCoinState)
  const [mxnPrice, setMxnPrice] = useRecoilState(mxnState)
  const [selection, setSelection] = useRecoilState(selectionState)
  const { account, connector, chainId, isActivating, isActive } = useWeb3React()
  return (
    <div>
      <button
        className="m-2 inline-block h-44 
                        w-44 rounded-lg bg-slate-300 
                          px-8 py-4 font-display text-6xl text-black"
        onClick={() =>
          setSelection({
            categoria: selection.categoria,
            carrier: selection.carrier,
            producto: product.product,
          })
        }
      >
        <div className="relative">
          <div className="absolute top-0 left-0 text-6xl text-red-500">
            ${parseFloat(product.product.Monto).toFixed(0)}
          </div>
          <div className="absolute top-1 left-1 ">
            ${parseFloat(product.product.Monto).toFixed(0)}
            <div className="border-b-2 border-black" />
          </div>
          <div className="absolute bottom-0 text-sm">
            {chainDefaultToken[chainId ? chainId : -1]}$ ~
            {(
              parseFloat(product.product.Monto) /
              (mxnPrice / stableCoinPrice)
            ).toFixed(2)}
          </div>
        </div>
      </button>
    </div>
  )
}

export default Product
