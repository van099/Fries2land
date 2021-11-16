import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getBurgerWbnbPairContract, getReserves } from '../fries/utils'
import useBlock from './useBlock'
import useFries from './useFries'

const useBurgerPrice = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  const fries = useFries()
  const buggerWbnbPairContract = getBurgerWbnbPairContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(buggerWbnbPairContract)
      if (!new BigNumber(reserve0).eq(new BigNumber(0))) {
        setPrice(new BigNumber(reserve1).div(new BigNumber(reserve0)))
      } else {
        setPrice(new BigNumber(0))
      }
    } catch (e) {
      setPrice(new BigNumber(0))
    }
  }, [buggerWbnbPairContract, fries])

  useEffect(() => {
    if (buggerWbnbPairContract && fries) {
      fetchBalance()
    }
  }, [buggerWbnbPairContract, setPrice, block, fries])

  return price
}

export default useBurgerPrice
