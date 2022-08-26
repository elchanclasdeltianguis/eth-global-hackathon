import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { ISiprelProduct, ICarrier, ICategory } from "../typings"

export const selectionState = atom({
  key: "selectionState", // unique ID (with respect to other atoms/selectors)
  default: {
    carrier: undefined as ICarrier | undefined,
    producto: undefined as ISiprelProduct | undefined,
    categoria: undefined as ICategory | undefined,
  }, // default value (aka initial value)
})
