/* STATE */
import { useRecoilState } from "recoil"
import { siprelState, selectionState } from "../../atoms/"

/* COMPONENTS */
import Product from "./Product"

/* TYPES */
import { ISiprelProduct } from "../../typings"

const Products = () => {
  const [siprelData, setSiprelData] = useRecoilState(siprelState)
  const [selection, setSelection] = useRecoilState(selectionState)
  return (
    /* CONTAINER */
    <div className="flex items-center justify-center">
      {/* GRID */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card */}
        {/* BUTTON */}
        {siprelData.productos &&
          siprelData.productos
            .filter(
              (product: ISiprelProduct) =>
                product.CarrierID === selection.carrier?.ID
            )
            .map((product: ISiprelProduct) => (
              <Product key={product.Codigo} product={product} />
            ))}
      </div>
    </div>
  )
}

export default Products
