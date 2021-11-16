import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'

import { getDepositBalance } from '../fries/utils'
import useFries from './useFries'
import useBlock from './useBlock'

const useDepositBalance = (lpContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const fries = useFries()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getDepositBalance(lpContract, account)
    setBalance(new BigNumber(balance))
  }, [account, fries])

  useEffect(() => {
    if (account && fries) {
      fetchBalance()
    }
  }, [account, setBalance, block, fries])

  return balance
}

export default useDepositBalance
