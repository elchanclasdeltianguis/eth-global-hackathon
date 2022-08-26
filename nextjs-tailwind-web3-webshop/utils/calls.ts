import { ethers, Contract, BigNumber } from "ethers"
import ERC20_ABI from "../config/abis/erc20.json"
import ORACLE_ABI from "../config/abis/chainlinkOracle.json"
import { JsonRpcProvider } from "@ethersproject/providers"
import { CHAINS } from "../config/chains"
import { ADDRESSES } from "../config/addresses"

export const getTokenBalance = async (
  chainId: number,
  contractAddress: string,
  account: string
) => {
  const rpc = CHAINS[chainId].urls[0]
  const ethersProvider = new JsonRpcProvider(rpc)
  const contract = new Contract(contractAddress, ERC20_ABI, ethersProvider)
  try {
    const tx = await contract.balanceOf(account)
    const response = await tx
    return response
  } catch (e: any) {
    return e.message
  }
}

export const fetchOraclePrice = async (
  chainId: number,
  oracleAddress: string
) => {
  try {
    const rpc = CHAINS[chainId].urls[0]
    const ethersProvider = new JsonRpcProvider(rpc)
    const contract = new Contract(oracleAddress, ORACLE_ABI, ethersProvider)
    const tx = await contract.latestAnswer()
    const response = await tx
    return response
  } catch (e: any) {
    return e.message
  }
}

export const handlePay = async (
  account: string,
  tokenAddress: string,
  priceInToken: number,
  signer: any,
  chainId: number
) => {
  try {
    console.log("check args in handle pay:", account, tokenAddress)
    const contractWithUserAsSigner = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      signer
    )
    const userBalance: BigNumber = await contractWithUserAsSigner.balanceOf(
      account
    )

    if (!(parseFloat(ethers.utils.formatEther(userBalance)) >= priceInToken)) {
      return "No tienes saldo! ".concat(userBalance.toString())
    }
    const tx = await contractWithUserAsSigner.transfer(
      ADDRESSES[chainId],
      ethers.utils.parseEther(priceInToken.toString())
    )
    const receipt = await tx.wait()
    return receipt
  } catch (e: any) {
    return e.message
  }
}
