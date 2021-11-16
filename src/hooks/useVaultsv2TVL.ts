import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import {
  getReservesValue,
  getSupportedVaultsv2,
  getMasterChefAddress
} from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'
import useWBNBPrice from './useWBNBPrice'
import useCakePrice from './useCakePrice'

export interface TotalValue {
  tvl: BigNumber
  poolAmount: BigNumber
  tvlWeight: BigNumber
  pid: Number
}

const useVaultsv2TVL = () => {
  const [totalValues, setTotalValues] = useState([] as Array<TotalValue>)

  const block = useBlock()
  const fries = useFries()
  const wbnbPrice = useWBNBPrice()
  const cakePrice = useCakePrice()
  const vaults = getSupportedVaultsv2(fries)
  const masterChefAddress = getMasterChefAddress(fries)

  const fetchTotalValues = useCallback(async () => {
    const reserves: Array<TotalValue> = await Promise.all(
      vaults.map(
        ({
          lpContract,
          vaultContract,
          symbol0,
          symbol1,
          enabled,
          pooledOrder,
          pid,
        }: {
          lpContract: Contract
          vaultContract: Contract
          symbol0: String
          symbol1: String
          enabled: Number
          pooledOrder: Boolean
          pid: Number
        }) => {
          return enabled ?
            getReservesValue(lpContract, vaultContract, symbol0, symbol1, pooledOrder, wbnbPrice, cakePrice, pid, masterChefAddress, 2) :
            { tvl: new BigNumber(0), poolAmount: new BigNumber(0), tvlWeight: new BigNumber(0), pid }
        }),
    )
    let i = 0, updated = 0;
    for (i = 0; i < totalValues.length; i++) {
      if (!totalValues[i].tvl.isEqualTo(reserves[i].tvl) ||
        !totalValues[i].tvlWeight.isEqualTo(reserves[i].tvlWeight) ||
        !totalValues[i].poolAmount.isEqualTo(reserves[i].poolAmount)) {
        updated = 1;
        break;
      }
    }
    if (updated || totalValues.length === 0) {
      setTotalValues(reserves)
    }
  }, [vaults, fries, masterChefAddress, setTotalValues, wbnbPrice])

  useEffect(() => {
    if (vaults && fries && masterChefAddress) {
      fetchTotalValues()
    }
  }, [vaults, masterChefAddress, setTotalValues, fries, block, wbnbPrice])

  return totalValues
}

export default useVaultsv2TVL
