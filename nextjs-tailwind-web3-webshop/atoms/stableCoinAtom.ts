import { atom } from "recoil"

// token prices in usd
export const stableCoinState = atom({
  key: "stableCoinState", // unique ID (with respect to other atoms/selectors)
  default: 1 as number, // default value (aka initial value)
})
