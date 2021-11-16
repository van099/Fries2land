import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBNBBalance } from '../utils/wbnb'
import useBlock from './useBlock'

const useGetBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBNBBalance(ethereum, account)
    setBalance(new BigNumber(balance))
  }, [account, ethereum])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, block, fetchBalance])

  return balance
}

export default useGetBalance
