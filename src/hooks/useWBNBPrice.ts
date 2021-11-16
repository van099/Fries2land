import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getStableWbnbPairContract, getReserves } from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'

const useWBNBPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const fries = useFries()
  const pairContract = getStableWbnbPairContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(pairContract)
      if (!new BigNumber(reserve0).eq(new BigNumber(0))) {
        const newPrice = new BigNumber(reserve1).div(new BigNumber(reserve0))
        if (!newPrice.isEqualTo(price)) {
          setPrice(newPrice)
        }
      } else {
        // setPrice(new BigNumber(0))
      }
    } catch (e) {
      // setPrice(new BigNumber(0))
    }
  }, [pairContract, fries])

  useEffect(() => {
    if (pairContract && fries) {
      fetchBalance()
    }
  }, [pairContract, setPrice, block, fries])

  return price
}

export default useWBNBPrice
