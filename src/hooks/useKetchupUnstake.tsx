import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'

import { leaveKetchup, getKetchupBarContract } from '../fries/utils'

const useKetchupUnstake = () => {
  const { account } = useWallet()
  const fries = useFries()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await leaveKetchup(
        getKetchupBarContract(fries),
        amount,
        account,
      )
      console.log(txHash)
    },
    [fries],
  )

  return { onUnstake: handleUnstake }
}

export default useKetchupUnstake
