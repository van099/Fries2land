import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import moment from 'moment'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Spacer from '../../../components/Spacer'
import useEarnings from '../../../hooks/useEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { calcTime } from '../../../fries/utils'

interface FarmCardProps {
  apy: BigNumber
}

const BurgerFriesLPCard: React.FC<FarmCardProps> = ({ apy }) => {
  const [curTime, setCurrentTime] = useState("00:00:00")

  useEffect(() => {
    const timer = setInterval(() => {
      const d = calcTime(-5);
      let minutes = d.getMinutes(), seconds = d.getSeconds();
      const hours = 5 - (d.getHours()) % 6;
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
    <StyledCardWrapper>
      <StyledCardAccent />
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>🍟</CardIcon>
            <StyledTitle>BURGER/FRIES 15X</StyledTitle>
            <StyledDetails>
              <StyledDetail>Add BURGER/FRIES LP</StyledDetail>
              <StyledDetail>Earn FRIES</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              text={'Until Next Reward'}
              onClick={() => { window.open('https://burgerswap.org/?type=1&from=FRIES&to=BURGER') }}
            >
              <span style={{ width: '100%' }}>
                {curTime}
              </span>
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {apy !== null ?
                  apy.toString() !== '0'
                    ? `${apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                    : 'Loading ...'
                  : 'Coming Soon'}
              </span>
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

export default BurgerFriesLPCard
