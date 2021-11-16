import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import useFries from './useFries'
import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'
import { getKetchupBarContract } from '../fries/utils'

const useFriesStakedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()
  const block = useBlock()
  const fries = useFries()
  const ketchupContract = getKetchupBarContract(fries)

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, ketchupContract.options.address)
    setBalance(new BigNumber(balance))
  }, [ketchupContract, ethereum, tokenAddress])

  useEffect(() => {
    if (ketchupContract && ethereum) {
      fetchBalance()
    }
  }, [ketchupContract, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useFriesStakedBalance
