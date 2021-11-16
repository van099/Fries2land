import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getFriesWbnbPairContract, getReserves } from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'

const useFriesPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const fries = useFries()
  const friesWbnbPairContract = getFriesWbnbPairContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(friesWbnbPairContract)
      if (!new BigNumber(reserve0).eq(new BigNumber(0))) {
        const newPrice = new BigNumber(reserve1).div(new BigNumber(reserve0))
        if (!newPrice.eq(price)) {
          setPrice(newPrice)
        }
      }
    } catch (e) {
    }
  }, [friesWbnbPairContract, fries])

  useEffect(() => {
    if (friesWbnbPairContract && fries) {
      fetchBalance()
    }
  }, [friesWbnbPairContract, setPrice, block, fries])

  return price
}

export default useFriesPrice
