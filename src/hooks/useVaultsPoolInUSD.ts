import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import { getReserves } from '../fries/utils'
import useBlock from './useBlock'
import useWBNBPrice from './useWBNBPrice'
import useFilPrice from './useFilPrice'

const useVaultsPoolInUSD = (lpContract: Contract, symbol0: String, symbol1: String, enabled: Number) => {
  const [value, setValue] = useState(new BigNumber(0))
  const block = useBlock()
  const bnbPrice = useWBNBPrice()
  const filPrice = useFilPrice().times(bnbPrice)

  const fetchBalance = useCallback(async () => {
    try {
      if (enabled) {
        let { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(lpContract)
        let breserve0 = new BigNumber(reserve0)
        let breserve1 = new BigNumber(reserve1)
        if (symbol0 === 'BNB') { breserve0 = breserve0.times(bnbPrice) }
        if (symbol1 === 'BNB') { breserve1 = breserve1.times(bnbPrice) }
        if (symbol0 === 'FIL') { breserve0 = breserve0.times(filPrice) }
        setValue((breserve0.plus(breserve1)).div(10 ** 18))
      } else {
        setValue(new BigNumber(0))
      }
    } catch (e) {
      setValue(new BigNumber(0))
    }
  }, [lpContract, symbol0, symbol1, bnbPrice, filPrice])

  useEffect(() => {
    if (lpContract && symbol0 && symbol1) {
      fetchBalance()
    }
  }, [lpContract, symbol0, symbol1, setValue, block])

  return value
}

export default useVaultsPoolInUSD