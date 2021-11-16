import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useKetchupUnstake from '../../../hooks/useKetchupUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useFries from '../../../hooks/useFries'
import { getKetchupBarAddress } from '../../../fries/utils'
import UnstakeModal from './UnstakeModal'
import useModal from '../../../hooks/useModal'
import useKetchupAmount from '../../../hooks/useKetchupAmount'

interface HarvestProps {
  lpTokenName: string
  lpTokenIcon: string
}

const Harvest: React.FC<HarvestProps> = ({ lpTokenName, lpTokenIcon }) => {
  const fries = useFries()
  const ketchupContractAddress = getKetchupBarAddress(fries);
  const ketchupBalance = useTokenBalance(ketchupContractAddress)
  const ketchupAmount = useKetchupAmount()

  const { onUnstake } = useKetchupUnstake()

  const [onPresentUnstake] = useModal(
    <UnstakeModal
      max={ketchupBalance}
      onConfirm={onUnstake}
      tokenName={lpTokenName}
    />,
  )

  return (
    <StyledCardWrapper>
      <StyledCardAccent />
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>{lpTokenIcon}</CardIcon>
              <Value value={getBalanceNumber(ketchupAmount)} />
              <Label text={`${lpTokenName} Balance`} />
            </StyledCardHeader>
            <StyledCardActions>
              <Button
                disabled={!ketchupBalance.toNumber()}
                text='Convert to FRIES'
                onClick={onPresentUnstake}
              />
            </StyledCardActions>
          </StyledCardContentInner>
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

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

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

export default Harvest
