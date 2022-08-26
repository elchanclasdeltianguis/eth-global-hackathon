import HeaderLogo from "./HeaderLogo"
import NetworkMenu from "../NetworkSelector/NetworkMenu"
import WalletMenu from "../WalletSelector/WalletMenu"

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
} from "../../atoms/"

const Header = () => {
  const [stableCoinPrice, setStableCoinPrice] = useRecoilState(stableCoinState)
  const [mxnPrice, setMxnPrice] = useRecoilState(mxnState)
  return (
    <div className="h-12 bg-white bg-opacity-0 z-50">
      <div className="mx-8 my-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <div>
            <HeaderLogo />
          </div> */}
          {/* <div className="font-display text-2xl">Criptotianguis.mx</div>
          <div>stablecoin/usd: {stableCoinPrice}</div>
          <div>mxn/usd: {mxnPrice}</div>
          <div>stable*mxn: {stableCoinPrice * mxnPrice}</div> */}
        </div>
        <div className="flex space-x-4">
          <div>
            <NetworkMenu />
          </div>
          <WalletMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
