import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../fries/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, fries],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
