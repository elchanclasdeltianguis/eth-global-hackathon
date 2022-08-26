import type { NextApiRequest, NextApiResponse } from "next"

/* UTILS  */
import { BigNumber, ethers } from "ethers"

/* APOLLO */
import client from "../../apollo/apolloClient"
import { GET_ORDER_BY_TX, GET_USER_BY_ADDRESS } from "../../apollo/queries"
import { INSERT_USER, INSERT_ORDER } from "../../apollo/mutations"

/* CONFIGS */
import { CHAINS } from "../../config/chains"
import { MAX_TIME_DIFF_TX } from "../../config"

/* TYPES */
import { IOrder, ISiprelProduct, IToken } from "../../typings"

const TESTING = true

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("hey! in backend!")

  // format order
  const order: IOrder = req.body
  const product: ISiprelProduct = order.product
  const tx: any = order.tx
  const chainId: number = order.chainId
  const token: string = order.token
  const amount: number = order.amount
  const account: string = order.account
  const phone: number = order.phone

  // check if tx is good
  // 1. txhash exists onchain
  const provider = new ethers.providers.JsonRpcProvider(CHAINS[chainId].urls[0])
  let txProvider: ethers.providers.TransactionResponse
  console.log("tx hash user:", tx.transactionHash)
  try {
    txProvider = await provider?.getTransaction(tx.transactionHash)
    console.log("tx from proviider", txProvider)
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      error: "Tx no existe!",
    })
  }
  const txProviderFromAddress = txProvider.from // user address
  const txProviderTokenAddress = txProvider.to // token contract
  const txProviderData = txProvider?.data
  let formattedCallData = "0x" + txProviderData.slice(10)
  // note: data is [address, amount]
  let extractedCallData = ethers.utils.defaultAbiCoder.decode(
    ["address", "uint256"],
    formattedCallData
  )
  const onchainFromAddress: string = extractedCallData[0]
  const onChainAmount: BigNumber = extractedCallData[1]

  // 2. from user account
  if (
    !TESTING &&
    !(
      onchainFromAddress === txProviderFromAddress &&
      onchainFromAddress === account
    )
  ) {
    return res.status(400).send({
      error: "Address no coincide!",
    })
  }
  console.log(
    "tx address is good",
    onchainFromAddress === txProviderFromAddress &&
      onchainFromAddress === account
  )

  // 3. amount corresponds to order
  if (
    !TESTING &&
    !(amount === parseFloat(ethers.utils.formatEther(onChainAmount)))
  ) {
    console.log(
      amount === parseFloat(ethers.utils.formatEther(onChainAmount)),
      amount,
      parseFloat(ethers.utils.formatEther(onChainAmount))
    )
    console.log("Montos no coinciden!")
    return res.status(400).send({
      error: "Montos no coincide!",
    })
  }
  console.log(
    "Amounts are good!: ",
    amount === parseFloat(ethers.utils.formatEther(onChainAmount)),
    amount,
    parseFloat(ethers.utils.formatEther(onChainAmount))
  )

  // 4. time is recent
  const timestamp = (
    await provider.getBlock(txProvider.blockNumber ? txProvider.blockNumber : 0)
  ).timestamp
  const now = new Date().getTime() / 1000
  const timeDiff = now - timestamp
  if (!TESTING && timeDiff > MAX_TIME_DIFF_TX) {
    return res.status(400).send({
      error: "Tx viejo!",
    })
  }
  console.log(
    "tx time is within the last ",
    MAX_TIME_DIFF_TX,
    "seconds: ",
    timeDiff
  )

  // 5. tx hash does not exist in database
  console.log("5. check if tx exists in db")
  const { data: orders } = await client.query({
    query: GET_ORDER_BY_TX(tx.transactionHash),
  })

  const txExists: boolean = Object.entries(orders).length !== 0

  if (!TESTING && txExists) {
    console.log("tx exists!: ", txExists)
    return res.status(400).send({ error: `tx existe en db!` })
  }
  console.log("Tx id ok!", txExists)

  // 6. does user exist in db?
  const { data: userDB } = await client.query({
    query: GET_USER_BY_ADDRESS(account),
  })

  const userExist: boolean = userDB.getUsers
    ? Object.entries(userDB.getUsers).length > 0
    : false
  console.log("user exists in db: ", userExist, userDB)

  if (!userExist) {
    const { data: newUser } = await client.mutate({
      mutation: INSERT_USER(account),
    })
    console.log("adding user to db: ", newUser)
  }

  // 6. create order in db
  // amount_mxn: number,
  // amount_token: number,
  // chain_id: number,
  // phone: string,
  // product_code: string,
  // token: string,
  // tx: string,
  // address: string
  console.log(
    "check order",
    parseFloat(product.Monto),
    amount,
    chainId,
    phone.toString(),
    order.product.Codigo,
    token,
    tx.transactionHash,
    account
  )
  const { data: newOrder } = await client.mutate({
    mutation: INSERT_ORDER(
      parseFloat(product.Monto),
      amount,
      chainId,
      phone.toString(),
      product.Codigo,
      token,
      tx.transactionHash,
      account
    ),
  })

  // 7. send order to siprel
  // return res.status(200).json({
  //   METHOD: "APP",
  //   Message: "DISABLED",
  // })

  // process with siprel
  if (
    process.env.SIPREL_API_KEY &&
    process.env.SIPREL_API_NIP &&
    order.product.Codigo &&
    order.phone &&
    order.product.Monto
  ) {
    const siprelTxnResponse = await fetch(
      "****",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          key: process.env.SIPREL_API_KEY,
          nip: process.env.SIPREL_API_NIP,
          producto: order.product.Codigo,
          referencia: order.phone.toString(),
          monto: order.product.Monto,
        }),
      }
    )

    const siprelTxnResponseJson = await siprelTxnResponse.json()
    const siprelTxnResponseMessage = siprelTxnResponseJson["message"]
    const siprel_txn_response_transID = siprelTxnResponseJson["data"]["transID"]
    console.log("siprel response message:", siprelTxnResponseMessage)

    // get txn status
    let siprelTxnStatusResponse = await fetch(
      "*****",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          key: process.env.SIPREL_API_KEY,
          nip: process.env.SIPREL_API_NIP,
          transID: siprel_txn_response_transID,
        }),
      }
    )

    const siprelTxnStatusResponseJson = await siprelTxnStatusResponse.json()
    console.log(siprelTxnStatusResponseJson)
  } else {
    return res.status(500).json({
      error: "Missing args!",
    })
  }

  return res.status(200).json({
    METHOD: "POST",
    Message: "Sucess",
  })
}
