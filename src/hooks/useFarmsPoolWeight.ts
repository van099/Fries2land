import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getFarmsPoolWeight, getMasterChefContract } from '../fries/utils'
import useFries from './useFries'

const useFarmsPoolWeight = (pid: Number) => {
  const [portion, setPortion] = useState(new BigNumber(0))
  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)

  const fetchFarmPortion = useCallback(async () => {
    try {
      const newPortion = await getFarmsPoolWeight(masterChefContract, pid);
      if (!portion.eq(newPortion)) {
        setPortion(newPortion);
      }
    } catch (e) {
    }
  }, [masterChefContract])

  useEffect(() => {
    if (masterChefContract) {
      fetchFarmPortion()
    }
  }, [masterChefContract, setPortion, fries])

  return portion
}

export default useFarmsPoolWeight