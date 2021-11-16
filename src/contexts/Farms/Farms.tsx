import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useFries from '../../hooks/useFries'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../fries/utils'
import { getFarms } from '../../fries/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const fries = useFries()
  const { account } = useWallet()

  const farms = getFarms(fries)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
