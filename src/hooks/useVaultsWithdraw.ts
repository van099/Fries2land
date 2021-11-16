import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { vaultsWithdraw } from '../fries/utils'

const useVaultsWithdraw = (vaultContract: Contract) => {
  const { account } = useWallet()

  const handleWithdraw = useCallback(
    async (amount: string, isAll: boolean = false) => {
      const txHash = await vaultsWithdraw(
        vaultContract,
        amount,
        account,
        isAll,
      )
      console.log(txHash)
    },
    [account, vaultContract],
  )

  return { onWithdraw: handleWithdraw }
}

export default useVaultsWithdraw
