import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { deposit } from '../fries/utils'

const useDeposit = () => {
  const { account } = useWallet()
  const fries = useFries()

  const handleDeposit = useCallback(
    async (lpContract: Contract, amount: string) => {
      const txHash = await deposit(
        lpContract,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, fries],
  )

  return { onDeposit: handleDeposit }
}

export default useDeposit
