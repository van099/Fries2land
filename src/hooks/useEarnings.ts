import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../fries/utils'
import useFries from './useFries'
import useBlock from './useBlock'

const useEarnings = (pid: number, address: string = null) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
  }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    let accountToSearch = account;
    if (address) {
      accountToSearch = address;
    }
    const balance = await getEarned(masterChefContract, pid, accountToSearch)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, fries])

  useEffect(() => {
    if (account && masterChefContract && fries) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, fries])

  return balance
}

export default useEarnings
