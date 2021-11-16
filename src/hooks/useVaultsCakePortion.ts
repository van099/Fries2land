import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getValutsCakePortion, getPancakeMasterChefContract } from '../fries/utils'
import useFries from './useFries'

const useVaultsCakePortion = () => {
  const [cakePortion, setCakePortion] = useState(new BigNumber(0))
  const fries = useFries()
  const pancakeMasterChefContract = getPancakeMasterChefContract(fries)

  const fetchVaultsPortion = useCallback(async () => {
    try {
      const newPortion = await getValutsCakePortion(pancakeMasterChefContract)
      if (!cakePortion.eq(newPortion)) {
        setCakePortion(newPortion);
      }
    } catch (e) {
    }
  }, [pancakeMasterChefContract])

  useEffect(() => {
    if (pancakeMasterChefContract) {
      fetchVaultsPortion()
    }
  }, [pancakeMasterChefContract, setCakePortion, fries])

  return cakePortion
}

export default useVaultsCakePortion