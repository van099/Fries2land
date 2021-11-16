import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getUserInfo } from '../fries/utils'
import useBlock from './useBlock'
import { Contract } from 'web3-eth-contract'

const useUserInfo = (reaperContract: Contract) => {
  const [info, setInfo] = useState({ depositAmount: new BigNumber(0), shares: new BigNumber(0)} )

  const { account }: { account: string } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    try {
      const { depositAmount, shares }: { depositAmount: BigNumber, shares: BigNumber } = await getUserInfo(reaperContract, account)
      if (!depositAmount.eq(info.depositAmount) || !shares.eq(info.shares)) {
        setInfo({depositAmount, shares})
      }
    } catch (e) {
    }
  }, [account, block, reaperContract])

  useEffect(() => {
    if (reaperContract) {
      fetchBalance()
    }
  }, [account, reaperContract, setInfo, block])

  return {depositedAmount: info.depositAmount, shares: info.shares}
}

export default useUserInfo
