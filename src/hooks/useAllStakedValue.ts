import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWbnbContract,
  getFarms,
  getTotalLPWbnbValue,
} from '../fries/utils'
import useFries from './useFries'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wbnbAmount: BigNumber
  totalWbnbValue: BigNumber
  tokenPriceInWbnb: BigNumber
  poolWeight: BigNumber
  subTokenValue1: BigNumber
  subTokenValue2: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const fries = useFries()
  const farms = getFarms(fries)
  const masterChefContract = getMasterChefContract(fries)
  const wbnbContact = getWbnbContract(fries)
  const block = useBlock()
  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          subTokenContract1,
          subTokenContract2,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          subTokenContract1: Contract
          subTokenContract2: Contract
        }) =>
          getTotalLPWbnbValue(
            masterChefContract,
            wbnbContact,
            lpContract,
            tokenContract,
            pid,
            subTokenContract1,
            subTokenContract2,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, fries])

  useEffect(() => {
    if (account && masterChefContract && fries) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, fries])

  return balances
}

export default useAllStakedValue
