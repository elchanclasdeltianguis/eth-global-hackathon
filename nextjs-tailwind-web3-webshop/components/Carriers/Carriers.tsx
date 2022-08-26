/* STATE */
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { siprelState, selectionState } from "../../atoms"

import Carrier from "./Carrier"

const Carriers = () => {
  const [siprelData, setSiprelData] = useRecoilState(siprelState)
  const [selection, setSelection] = useRecoilState(selectionState)
  return (
    /* CONTAINER */
    <div className="flex items-center justify-center">
      {/* GRID */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* BUTTON */}
        {siprelData.carriers &&
          siprelData.carriers
            .filter(
              (carrier) => carrier.CategoriaID === selection.categoria?.ID
            )
            .map((carrier) => <Carrier key={carrier.ID} carrier={carrier} />)}
      </div>
    </div>
  )
}

export default Carriers
