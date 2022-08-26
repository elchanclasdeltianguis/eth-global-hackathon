import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { ISiprelProduct, ICarrier, ICategory } from "../typings"

export const siprelState = atom({
  key: "siprelState", // unique ID (with respect to other atoms/selectors)
  default: {
    carriers: undefined as ICarrier[] | undefined,
    productos: undefined as ISiprelProduct[] | undefined,
    categorias: undefined as ICategory[] | undefined,
  }, // default value (aka initial value)
})
