import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import { vaultsDeposit } from '../fries/utils'

const useVaultsDeposit = (vaultContract: Contract) => {
  const { account } = useWallet()

  const handleDeposit = useCallback(
    async (amount: string, isAll: boolean = false) => {
      const txHash = await vaultsDeposit(
        vaultContract,
        amount,
        account,
        isAll,
      )
      console.log(txHash)
    },
    [account, vaultContract],
  )

  return { onDeposit: handleDeposit }
}

export default useVaultsDeposit
