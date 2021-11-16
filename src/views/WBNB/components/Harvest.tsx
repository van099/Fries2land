import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useGetBalance from '../../../hooks/useGetBalance'
import useDeposit from '../../../hooks/useDeposit'
import useModal from '../../../hooks/useModal'
import { getBalanceNumber } from '../../../utils/formatBalance'
import WithdrawModal from './WithdrawModal'

interface HarvestProps {
  lpContract: Contract
}

const Harvest: React.FC<HarvestProps> = ({ lpContract }) => {
  const balance = useGetBalance();

  const { onDeposit } = useDeposit()

  const [onPresentDeposit] = useModal(
    <WithdrawModal
      max={balance}
      onConfirm={onDeposit}
      tokenName={''}
      lpContract={lpContract}
    />
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍬</CardIcon>
            <Value value={getBalanceNumber(balance)} />
            <Label text="BNB Balance" />
          </StyledCardHeader>
          <StyledCardActions>
              <>
                <Button
                  disabled={balance.eq(new BigNumber(0))}
                  text="Wrap"
                  onClick={onPresentDeposit}
                />
              </>
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

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
