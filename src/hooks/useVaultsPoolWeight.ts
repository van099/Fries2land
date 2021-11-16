import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getValutsPoolWeight, getPancakeMasterChefContract } from '../fries/utils'
import useFries from './useFries'

const useVaultsPoolWeight = (pid: Number) => {
  const [portion, setPortion] = useState(new BigNumber(0))
  const fries = useFries()
  const pancakeMasterChefContract = getPancakeMasterChefContract(fries)

  const fetchVaultsPortion = useCallback(async () => {
    try {
      const newPortion = await getValutsPoolWeight(pancakeMasterChefContract, pid);
      if (!portion.eq(new BigNumber(newPortion))) {
        setPortion(newPortion);
      }
    } catch (e) {
    }
  }, [pancakeMasterChefContract])

  useEffect(() => {
    if (pancakeMasterChefContract) {
      fetchVaultsPortion()
    }
  }, [pancakeMasterChefContract, setPortion, fries])

  return portion
}

export default useVaultsPoolWeight