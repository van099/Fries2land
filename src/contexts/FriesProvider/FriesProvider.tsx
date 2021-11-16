import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Fries } from '../../fries'

export interface FriesContext {
  fries?: typeof Fries
}

export const Context = createContext<FriesContext>({
  fries: undefined,
})

declare global {
  interface Window {
    friessauce: any
  }
}

const FriesProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [fries, setFries] = useState<any>()

  // @ts-ignore
  window.fries = fries
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const friesLib = new Fries(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setFries(friesLib)
      window.friessauce = friesLib
    }
  }, [ethereum])


  return <Context.Provider value={{ fries }}>{children}</Context.Provider>

}

export default FriesProvider
