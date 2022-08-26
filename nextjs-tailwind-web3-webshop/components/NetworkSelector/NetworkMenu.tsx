/* hooks */
import { Fragment, useEffect, useRef, useState, useCallback } from "react"

/* STATE */
import { useRecoilState } from "recoil"

import { networkState } from "../../atoms/"

/* WEB3 */
import { WalletConnect } from "@web3-react/walletconnect"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { useWeb3React } from "@web3-react/core"

import { metaMask } from "../../connectors/metamask"
import { walletConnect } from "../../connectors/walletconnect"

import { getAddChainParameters } from "../../config/chains"

/* CONFIG */
import { CHAINS } from "../../config/chains"

/* COMPONENTS */
import { ChevronDownIcon } from "@heroicons/react/solid"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"

export default function NetworkMenu() {
  const [network, setNetwork] = useRecoilState(networkState)
  useWeb3React()
  const { accounts, chainId, provider, connector, isActive, isActivating } =
    useWeb3React()

  const title = (chainId && CHAINS[chainId]?.name) || "Networks"

  const switchChain = useCallback(
    (desiredChainId: string) => {
      if (CHAINS[parseInt(desiredChainId)]) {
        console.log("switchChain", desiredChainId)
        if (
          connector instanceof WalletConnect ||
          connector instanceof Network
        ) {
          connector.activate(parseInt(desiredChainId))
        } else {
          connector.activate(getAddChainParameters(parseInt(desiredChainId)))
        }
      }
    },
    [connector, chainId]
  )

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center 
                                  rounded-lg bg-black bg-opacity-20 
                                  px-4 py-2 text-sm font-medium 
                                  text-white hover:bg-opacity-30 
                                  focus:outline-none focus-visible:ring-2 
                                  focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div className="mr-2 h-4">
              <img
                src={title !== "Networks" ? `/images/networkIcons/${title.toLowerCase()}-network.png` : `/images/question-mark.png`}
                height={20}
                width={20}
              />
            </div>
            <div className="hidden sm:flex">{title}</div>
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 sm:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {Object.keys(CHAINS).map((chainId) => (
                <Menu.Item key={chainId}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      onClick={() => switchChain(chainId)}
                    >
                      <div className="pr-4">
                        <Image
                          src={`/images/networkIcons/${CHAINS[
                            parseInt(chainId)
                          ].name.toLowerCase()}-network.png`}
                          height={32}
                          width={32}
                        />
                      </div>
                      {CHAINS[parseInt(chainId)].name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
