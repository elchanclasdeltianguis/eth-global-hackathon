import React from "react"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { siprelState, selectionState } from "../../atoms/"

import { ICategory } from "../../typings"
import {
  DeviceMobileIcon,
  GlobeAltIcon,
  QrcodeIcon,
  CreditCardIcon,
} from "@heroicons/react/outline"

interface Props {
  categoria: ICategory
}

interface ICategoryIcons {
  [ID: number]: JSX.Element
}
const Category = (categoria: Props) => {
  const [selection, setSelection] = useRecoilState(selectionState)

  const iconHeight = 64
  const categoryIcons: ICategoryIcons = {
    1: <DeviceMobileIcon height={iconHeight} />,
    2: <GlobeAltIcon height={iconHeight} />,
    3: <QrcodeIcon height={iconHeight} />,
    4: <CreditCardIcon height={iconHeight} />,
  }
  return (
    <div>
      <button
        className="m-2 inline-block whitespace-nowrap w-44 h-44 
                    rounded-lg bg-slate-300 px-8 
                    py-4 font-display text-2xl text-black"
        onClick={() =>
          setSelection({
            categoria: categoria.categoria,
            carrier: undefined,
            producto: undefined,
          })
        }
      >
        <div className="flex flex-col">
          {categoryIcons[parseInt(categoria.categoria.ID)]}
          {categoria.categoria.Nombre}
        </div>
      </button>
    </div>
  )
}

export default Category
