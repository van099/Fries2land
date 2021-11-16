import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import useFries from './useFries'
import { getKetchupBarAddress } from '../fries/utils'
import useTokenBalance from './useTokenBalance'
import useStakedBalance from './useStakedBalance'
import useBlock from './useBlock'

const useKetchupAmount = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const fries = useFries()
  const ketchupContractAddress = getKetchupBarAddress(fries);
  const ketchupBalance = useTokenBalance(ketchupContractAddress)
  const stakedBalance = useStakedBalance(8)

  const block = useBlock()

  useEffect(() => {
    setBalance(stakedBalance.plus(ketchupBalance))
  }, [stakedBalance, ketchupBalance, block])

  return balance
}

export default useKetchupAmount
