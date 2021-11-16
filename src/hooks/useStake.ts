import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../fries/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const fries = useFries()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(fries),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, fries],
  )

  return { onStake: handleStake }
}

export default useStake
