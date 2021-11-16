import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import {
  getReaperValue,
  getPancakeMasterChefAddress,
  getBakeryMasterChefAddress,
  getSupportedSingleVaults
} from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'
import useWBNBPrice from './useWBNBPrice'

export interface TotalValue {
  tvl: BigNumber
  price: BigNumber
  poolAmount: BigNumber
  pid: Number
}

const useVaultsSingleTVL = () => {
  const [totalValues, setTotalValues] = useState([] as Array<TotalValue>)

  const block = useBlock()
  const fries = useFries()
  const wbnbPrice = useWBNBPrice()
  const reapers = getSupportedSingleVaults(fries)
  const pancakeMasterChefAddress = getPancakeMasterChefAddress(fries)
  const bakeryMasterChefAddress = getBakeryMasterChefAddress(fries)

  const fetchTotalValues = useCallback(async () => {
    const reserves: Array<TotalValue> = await Promise.all(
      reapers.map(
        ({
          pid,
          tokenContract,
          reaperContract,
          pairContract,
          tokenSymbol,
          pooledOrder,
          enabled,
          platform,
        }: {
          pid: Number
          tokenContract: Contract
          reaperContract: Contract
          pairContract: Contract
          tokenSymbol: String
          enabled: Number
          pooledOrder: Boolean
          platform: String
        }) => {
          return enabled ?
            getReaperValue(tokenContract, reaperContract, pairContract, tokenSymbol, pooledOrder, wbnbPrice, 
              platform === 'pancake' ? pancakeMasterChefAddress : bakeryMasterChefAddress,
              pid) :
            { tvl: new BigNumber(0), price: new BigNumber(0), poolAmount: new BigNumber(0), pid }
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
    if (reapers && fries && pancakeMasterChefAddress && wbnbPrice.toString() !== '0') {
      fetchTotalValues()
    }
  }, [reapers, setTotalValues, fries, block, wbnbPrice, pancakeMasterChefAddress])

  return totalValues
}

export default useVaultsSingleTVL
