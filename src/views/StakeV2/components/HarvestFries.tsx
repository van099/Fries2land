import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useFries from '../../../hooks/useFries'
import { getMasterChefContract, getKetchupHarvesterAddress, calcTime, getEarned } from '../../../fries/utils'

const HarvestFries: React.FC = () => {
  const [curTime, setCurrentTime] = useState("00:00:00")
  const [earned, setEarned] = useState(new BigNumber(0))

  const fries = useFries()
  const masterChefContract = getMasterChefContract(fries)
  const ketchupHarvesterAddress = getKetchupHarvesterAddress(fries)

  useEffect(() => {
    async function fetchGetEarned() {
      if (masterChefContract && ketchupHarvesterAddress) {
        try {
          const result = await getEarned(masterChefContract, 7, ketchupHarvesterAddress)
          setEarned(new BigNumber(result))
        } catch (err) { }
      }
    }
    if (fries) {
      fetchGetEarned()
    }
  }, [fries, masterChefContract, ketchupHarvesterAddress, setEarned])

  useEffect(() => {
    const timer = setInterval(() => {
      const d = calcTime(-5);
      let minutes = d.getMinutes(), seconds = d.getSeconds();
      const hours = 3 - (d.getHours() + 1) % 4;
      let remainedSeconds = (3600 - minutes * 60 - seconds);
      minutes = parseInt((remainedSeconds / 60).toString());
      seconds = remainedSeconds % 60;
      const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
      setCurrentTime(`0${hours}:${paddedMinutes}:${paddedSeconds}`)
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🏆</CardIcon>
            <Value value={getBalanceNumber(earned)} />
            <Label text='Next Total harvest from 3X pool' />
          </StyledCardHeader>
          <StyledCardActions>
            <Button>
              <span style={{ width: '100%' }}>
                {curTime}
              </span>
            </Button>
          </StyledCardActions>
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

export default HarvestFries
