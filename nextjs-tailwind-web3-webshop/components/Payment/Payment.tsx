/* HOOKS */
import { useWeb3React } from "@web3-react/core"
import { useState } from "react"

/* STATE */
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { selectionState, stableCoinState, mxnState } from "../../atoms/"

/* CONFIG */
import { chainDefaultToken } from "../../config/tokens"
import { ADDRESSES } from "../../config/addresses"
import { TOKENS } from "../../config/tokens"

/* UTILS */
import { handlePay } from "../../utils/calls"
import { ethers } from "ethers"
import validatePhoneNumber from "../../utils/validatePhoneNumber"
import { postOrder } from "../../utils/postOrder"

/* COMPONENTS */
import {
  PhoneIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline"

const Payment = () => {
  const { chainId, provider, account } = useWeb3React()
  const [selection] = useRecoilState(selectionState)
  const [stableCoinPrice] = useRecoilState(stableCoinState)
  const [mxnPrice] = useRecoilState(mxnState)

  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [phoneNumberCopy, setPhoneNumberCopy] = useState<string>("")
  const [showInformation, setShowInformation] = useState<boolean>(false)

  const amountMxn = parseInt(
    selection.producto ? selection.producto?.Monto : "0"
  )
  const amount: number = amountMxn / (stableCoinPrice * mxnPrice)

  const isValidNumber = () => {
    return validatePhoneNumber(phoneNumber) && phoneNumber === phoneNumberCopy
  }

  const canBuy: boolean = isValidNumber() && phoneNumber.length === 10

  const phoneNumberOnChange = (event: any) => {
    const query = event.target.value
    setPhoneNumber(query)
  }
  const phoneNumberOnChangeCopy = (event: any) => {
    const query = event.target.value
    setPhoneNumberCopy(query)
  }

  const signer = provider?.getSigner()

  const handlePayment = async () => {
    let txReceipt // up here for scopes sake :D
    try {
      console.log("try payment")
      if (chainId && account) {
        txReceipt = await handlePay(
          account,
          TOKENS[chainDefaultToken[chainId]].address[chainId],
          amount,
          signer,
          chainId
        )
        console.log("receipt: ", txReceipt)
      }
    } catch (error) {
      console.log("transaction error", error)
    }

    // create order
    const order = {
      product: selection.producto,
      tx: txReceipt,
      account: account,
      chainId: chainId,
      token: chainDefaultToken[chainId ? chainId : -1],
      amount: amount,
      phone: phoneNumber,
    }
    console.log("frontend order check", order)
    // process order
    console.log(await postOrder(order))
  }
  return (
    /* CONTAINER */
    <div className="flex justify-center">
      <div className="mt-16 grid grid-cols-1">
        <div
          className="m-2 flex  w-80  flex-col justify-between
                        rounded-lg bg-slate-300 py-8 px-4
                        uppercase text-black shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="-rotate-45 border-b border-black font-sans text-base text-red-500">
              Producto
            </div>
            <div className="">
              <h1 className=" font-display text-6xl">
                {selection.producto?.Codigo}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-between font-sans">
            <div className="-rotate-45 border-b border-black text-base text-red-500">
              Monto
            </div>
            <h1 className="font-display text-5xl">{amountMxn} MXN</h1>
          </div>
          <div className="flex items-center justify-between font-sans">
            <div className="-rotate-45 border-b border-black text-base text-red-500">
              token
            </div>
            <h1 className="font-display text-5xl">
              {amount.toFixed(2)} {chainId && chainDefaultToken[chainId]}
            </h1>
          </div>
          {/* LINE */}
          <div className="my-4 flex justify-center">
            <div className=" w-44 border-b border-black" />
          </div>
          {/* INPUT */}
          <div className="mb-4 flex flex-col items-center justify-center space-y-2">
            <PhoneIcon width={24} />
            <input
              id="phoneNumber"
              type="text"
              maxLength={10}
              value={phoneNumber}
              className="w-44 rounded-lg text-center outline-none"
              placeholder="telefono"
              onChange={phoneNumberOnChange}
            />
            <input
              id="phoneNumberCopy"
              type="text"
              value={phoneNumberCopy}
              maxLength={10}
              className={`w-44 rounded-lg text-center outline-none ${
                !canBuy && phoneNumber.length > 0 && "bg-red-500/40"
              }`}
              placeholder="copia"
              onChange={phoneNumberOnChangeCopy}
            />
          </div>
          {/* INFORMATION */}
          <div
            className="group mb-4 flex flex-col items-center justify-center text-xs"
            onClick={() => setShowInformation(!showInformation)}
          >
            <div className="mb-2 flex items-center">
              <div className="">Informacion</div>
              {!showInformation && <ChevronUpIcon width={24} />}
              {showInformation && <ChevronDownIcon width={24} />}
            </div>
            {showInformation && <div>{selection.producto?.Descripcion}</div>}
          </div>
          {/* PAY BUTTON */}
          <button
            className={`rounded-lg ${!canBuy && "bg-blue-500/40"} ${
              canBuy && "bg-blue-500"
            } px-6 py-1 shadow-xl`}
            onClick={() => handlePayment()}
            disabled={!canBuy}
          >
            Recarga!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
