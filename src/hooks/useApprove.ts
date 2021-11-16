import { useCallback } from 'react'

import useFries from './useFries'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getKetchupBarContract, getMasterChefContract } from '../fries/utils'

const useApprove = (lpContract: Contract, isStake: boolean = false, vaultsContract: Contract = null) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  let masterChefContract: any = null;
  if (vaultsContract) {
    masterChefContract = vaultsContract
  } else {
    if (!isStake) {
      masterChefContract = getMasterChefContract(fries)
    } else {
      masterChefContract = getKetchupBarContract(fries)
    }
  }

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
