import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { withdraw } from '../fries/utils'

const useWithdraw = () => {
  const { account } = useWallet()
  const fries = useFries()

  const handleWithdraw = useCallback(
    async (lpContract: Contract, amount: string) => {
      const txHash = await withdraw(
        lpContract,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, fries],
  )

  return { onWithdraw: handleWithdraw }
}

export default useWithdraw
