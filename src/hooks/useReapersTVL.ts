import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import {
  getSupportedReapers,
  getReaperValue,
  getPancakeMasterChefAddress
} from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'
import useWBNBPrice from './useWBNBPrice'

export interface TotalValue {
  tvl: BigNumber
  price: BigNumber
  poolAmount: BigNumber
}

const useReapersTVL = () => {
  const [totalValues, setTotalValues] = useState([] as Array<TotalValue>)

  const block = useBlock()
  const fries = useFries()
  const wbnbPrice = useWBNBPrice()
  const reapers = getSupportedReapers(fries)
  const pancakeMasterChefAddress = getPancakeMasterChefAddress(fries)

  const fetchTotalValues = useCallback(async () => {
    const reserves: Array<TotalValue> = await Promise.all(
      reapers.map(
        ({
          tokenContract,
          reaperContract,
          pairContract,
          tokenSymbol,
          pooledOrder,
          enabled,
        }: {
          tokenContract: Contract
          reaperContract: Contract
          pairContract: Contract
          tokenSymbol: String
          enabled: Number
          pooledOrder: Boolean
        }) => {
          return enabled ?
            getReaperValue(tokenContract, reaperContract, pairContract, tokenSymbol, pooledOrder, wbnbPrice, pancakeMasterChefAddress) :
            { tvl: new BigNumber(0), price: new BigNumber(0) }
        }),
    )
    let i = 0, updated = 0;
    for (i = 0; i < totalValues.length; i++) {
      if (!totalValues[i].tvl.eq(reserves[i].tvl) || !totalValues[i].price.eq(reserves[i].price)) {
        updated = 1;
        break;
      }
    }
    if (updated || totalValues.length === 0) {
      setTotalValues(reserves)
    }
  }, [reapers, fries, setTotalValues, wbnbPrice, pancakeMasterChefAddress])

  useEffect(() => {
    if (reapers && fries && pancakeMasterChefAddress) {
      fetchTotalValues()
    }
  }, [reapers, setTotalValues, fries, block, wbnbPrice, pancakeMasterChefAddress])

  return totalValues
}

export default useReapersTVL
