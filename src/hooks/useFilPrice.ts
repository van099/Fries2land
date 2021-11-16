import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getFilWbnbPairContract, getReserves } from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'

const useFilPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const fries = useFries()
  const filWbnbPairContract = getFilWbnbPairContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(filWbnbPairContract)
      if (!new BigNumber(reserve0).eq(new BigNumber(0))) {
        const newPrice = new BigNumber(reserve1).div(new BigNumber(reserve0))
        if (!newPrice.eq(price)) {
          setPrice(newPrice)
        }
      }
    } catch (e) {
      // setPrice(new BigNumber(0))
    }
  }, [filWbnbPairContract, fries])

  useEffect(() => {
    if (filWbnbPairContract && fries) {
      fetchBalance()
    }
  }, [filWbnbPairContract, setPrice, block, fries])

  return price
}

export default useFilPrice
