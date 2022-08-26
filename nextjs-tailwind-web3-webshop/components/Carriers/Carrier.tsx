import React from "react"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { siprelState, selectionState } from "../../atoms"

import { ICarrier } from "../../typings"

interface Props {
  carrier: ICarrier
}

const Carrier = (carrier: Props) => {
  const [selection, setSelection] = useRecoilState(selectionState)
  return (
    <div>
      <button
        className="m-2 inline-block h-44 w-44 truncate 
                    whitespace-nowrap rounded-lg 
                    bg-slate-300 p-2 px-8 
                    py-4 font-sans text-2xl"
        onClick={() =>
          setSelection({
            categoria: selection.categoria,
            carrier: carrier.carrier,
            producto: undefined,
          })
        }
      >
        <img src={carrier.carrier.Logotipo} />
        <div className="whitespace-pre-wrap pt-2 text-sm  text-black">
          {carrier.carrier.Nombre}
        </div>
      </button>
    </div>
  )
}

export default Carrier
