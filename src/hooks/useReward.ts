import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../fries/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, fries])

  return { onReward: handleReward }
}

export default useReward
