import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../fries/utils'
import useFries from './useFries'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const newBalance = await getStaked(masterChefContract, pid, account)
    if (!balance.eq(newBalance)) {
      setBalance(new BigNumber(newBalance))
    }
  }, [account, pid, fries])

  useEffect(() => {
    if (account && fries && pid >= 0) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, fries])

  return balance
}

export default useStakedBalance
