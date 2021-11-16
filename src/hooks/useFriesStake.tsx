import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'

import { enterFries, getKetchupBarContract } from '../fries/utils'

const useFriesStake = () => {
  const { account } = useWallet()
  const fries = useFries()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await enterFries(
        getKetchupBarContract(fries),
        amount,
        account,
      )
      console.log(txHash)
    },
    [fries],
  )

  return { onStake: handleStake }
}

export default useFriesStake
