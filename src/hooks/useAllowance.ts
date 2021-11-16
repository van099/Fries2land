import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useFries from './useFries'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getKetchupBarContract, getMasterChefContract } from '../fries/utils'

const useAllowance = (lpContract: Contract, isStake: boolean = false, vaultContract: Contract = null) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  let masterChefContract: Contract = null;
  if (!vaultContract) {
    if (!isStake) {
      masterChefContract = getMasterChefContract(fries)
    } else {
      masterChefContract = getKetchupBarContract(fries)
    }
  }
  else {
    masterChefContract = vaultContract
  }

  const fetchAllowance = useCallback(async () => {
    const newAllowance = await getAllowance(
      lpContract,
      masterChefContract,
      account,
    )
    if (!allowance.eq(newAllowance)) {
      setAllowance(new BigNumber(newAllowance))
    }
  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefContract, lpContract])

  return allowance
}

export const useAllowanceByAddress = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      masterChefContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefContract, lpContract])

  return allowance
}

export default useAllowance
