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
import useModal from '../../../hooks/useModal'
import useWithdraw from '../../../hooks/useWithdraw'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'

interface StakeProps {
  lpContract: Contract
  tokenName: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, tokenName }) => {
  const tokenBalance = useTokenBalance(lpContract.options.address)

  const { onWithdraw } = useWithdraw()

  const [onPresentWithdraw] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onWithdraw}
      tokenName={tokenName}
      lpContract={lpContract}
    />,
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🎁</CardIcon>
            <Value value={getBalanceNumber(tokenBalance)} />
            <Label text={`wBNB Balance`} />
          </StyledCardHeader>
          <StyledCardActions>
            <>
              <Button
                disabled={tokenBalance.eq(new BigNumber(0))}
                text="Unwrap"
                onClick={onPresentWithdraw}
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

export default Stake
