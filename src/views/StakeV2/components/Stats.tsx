import { SpaceBar } from '@material-ui/icons'
import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import Spacer from '../../../components/Spacer'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useFries from '../../../hooks/useFries'
import { getKetchupBarAddress, getFriesAddress, getKetchupBarSupply } from '../../../fries/utils'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useFriesPrice from '../../../hooks/useFriesPrice'
import useKetchupAmount from '../../../hooks/useKetchupAmount'
import useWBNBPrice from '../../../hooks/useWBNBPrice'

interface StatsProps {
  index: number
}

const Stats: React.FC<StatsProps> = ({ index }) => {
  const [totalPoolShare, setTotalPoolShare] = useState(new BigNumber(0))
  const [totalPoolShareInFries, setTotalPoolShareInFries] = useState(new BigNumber(0))
  const [totalPoolShareInUSD, setTotalPoolShareInUSD] = useState(new BigNumber(0))

  const fries = useFries()
  const friesAddress = getFriesAddress(fries);
  const ketchupContractAddress = getKetchupBarAddress(fries);
  const friesBalance = useTokenBalance(friesAddress, ketchupContractAddress);
  const ketchupBalance = useKetchupAmount()

  const friesPrice = useFriesPrice()
  const wbnbPrice = useWBNBPrice()

  const [ketchupSupply, setKetchupSupply] = useState(new BigNumber(0))

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getKetchupBarSupply(fries)
      setKetchupSupply(supply)
    }
    if (fries) {
      fetchTotalSupply()
    }
  }, [fries, setKetchupSupply])

  useEffect(() => {
    if (!!ketchupBalance && ketchupSupply.isGreaterThan(0)) {
      const TPS = ketchupBalance.div(ketchupSupply);
      setTotalPoolShare(TPS.times(100));
      if (index) {
        const TPSInFries = TPS.times(friesBalance)
        setTotalPoolShareInFries(TPSInFries);
        if (!!friesPrice && !!wbnbPrice) {
          setTotalPoolShareInUSD(TPSInFries.times(friesPrice).times(wbnbPrice).div(10 ** 18));
        }
      }
    }
  }, [fries, ketchupBalance, ketchupSupply, setTotalPoolShare, friesPrice, wbnbPrice, index])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {
              !index ?
                (
                  <>
                    <CardIcon>🏦</CardIcon>
                    <Value value={getBalanceNumber(friesBalance)} />
                    <Label text={`Total Fries in Staking Pool`} />
                    <Spacer />
                    <Value value={`${totalPoolShare.dp(5, 1).toString()}%`} />
                    <Label text={`Your Total Pool Share`} />
                  </>) :
                (<>
                  <CardIcon>🕴</CardIcon>
                  <Value value={getBalanceNumber(totalPoolShareInFries)} />
                  <Label text={`Your Total Pool Share in Fries`} />
                  <Spacer />
                  <Value value={`$${totalPoolShareInUSD.dp(2, 1).toString()}`} />
                  <Label text={`Your Total Pool Share in USD`} />
                </>)
            }
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

export default Stats
