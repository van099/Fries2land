import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useFries from '../../../hooks/useFries'
import { getMasterChefContract, getKetchupBarSupply, getKetchupHarvesterAddress, getEarned } from '../../../fries/utils'
import useFriesPrice from '../../../hooks/useFriesPrice'
import useWBNBPrice from '../../../hooks/useWBNBPrice'
import useKetchupAmount from '../../../hooks/useKetchupAmount'

const HarvestStrongFries: React.FC = () => {
  const [nextFriesHarvest, setNextFriesHarvest] = useState(new BigNumber(0))
  const [nextFriesHarvestInUSD, setNextFriesHarvestInUSD] = useState(new BigNumber(0))
  const [earned, setEarned] = useState(new BigNumber(0))
  const [ketchupSupply, setKetchupSupply] = useState(new BigNumber(0))

  const fries = useFries()
  const ketchupHarvesterAddress = getKetchupHarvesterAddress(fries)
  const masterChefContract = getMasterChefContract(fries);
  const ketchupBalance = useKetchupAmount()

  const friesPrice = useFriesPrice()
  const wbnbPrice = useWBNBPrice()

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        const supply = await getKetchupBarSupply(fries)
        setKetchupSupply(supply)
      } catch (err) { }
    }
    if (fries) {
      fetchTotalSupply()
    }
  }, [fries, setKetchupSupply])

  useEffect(() => {
    async function fetchGetEarned() {
      if (masterChefContract && ketchupHarvesterAddress) {
        try {
          const result = await getEarned(masterChefContract, 7, ketchupHarvesterAddress)
          setEarned(result)
        } catch (err) { }
      }
    }
    if (fries) {
      fetchGetEarned()
    }
  }, [fries, masterChefContract, ketchupHarvesterAddress, setEarned])

  useEffect(() => {
    if (!!ketchupBalance && ketchupSupply.isGreaterThan(0) && !!nextFriesHarvest) {
      setNextFriesHarvest(ketchupBalance.div(ketchupSupply).times(earned))
    }
  }, [earned, ketchupBalance, ketchupSupply])

  useEffect(() => {
    if (friesPrice !== new BigNumber(0) && wbnbPrice != new BigNumber(0)) {
      setNextFriesHarvestInUSD(nextFriesHarvest.times(friesPrice).times(wbnbPrice).div(10 ** 18).dp(2, 1));
    }
  }, [nextFriesHarvest, friesPrice, wbnbPrice])


  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🧧</CardIcon>
            <Value value={getBalanceNumber(nextFriesHarvest)} />
            <Label text='Your Share of Harvest in FRIES' />
            <Spacer />
            <Value value={`$${nextFriesHarvestInUSD}`} />
            <Label text='Your Share of Harvest in USD' />
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default HarvestStrongFries
