/* STATE */
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { siprelState, selectionState } from "../../atoms/"

/* CONFIG */
import { usedCategoresByID } from "../../config"

/* COMPONENTS */
import Category from "./Category"

// NOTE: grid cols number should be equal to number of categories

const Categories = () => {
  const [siprelData, setSiprelData] = useRecoilState(siprelState)
  return (
    /* CONTAINER */
    <div className="flex items-center justify-center">
      {/* Card */}
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* CATEGORIES */}
        {siprelData.categorias &&
          siprelData.categorias
            .filter((categoria) => usedCategoresByID.includes(categoria.ID))
            .map((categoria) => (
              <Category key={categoria.ID} categoria={categoria} />
            ))}
      </div>
    </div>
  )
}

export default Categories
