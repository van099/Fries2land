import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../fries/utils'
import useFries from './useFries'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  const farms = getFarms(fries)
  const masterChefContract = getMasterChefContract(fries)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, fries])

  useEffect(() => {
    if (account && masterChefContract && fries && farms) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, fries, farms])

  return balances
}

export default useAllEarnings
