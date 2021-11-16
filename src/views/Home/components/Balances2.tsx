import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import FriesIcon from '../../../components/FriesIcon'
import BurntIcon from '../../../components/BurntIcon'
import StrongIcon from '../../../components/StrongIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useFries from '../../../hooks/useFries'
import {
  getFriesAddress,
  getFriesSupply,
  getBurntSupply,
  getStrongFryAddress,
  getStrongFriesBalance
} from '../../../fries/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'


const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWbnb = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWbnbValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [burntBalance, setBurntBalance] = useState<BigNumber>()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [strongFriesBalance, setStrongFriesBalance] = useState<BigNumber>()
  //const [strongBalance, setStrongBalance] = useState<BigNumber>() // test strong
  const fries = useFries()
  const friesBalance = useTokenBalance(getFriesAddress(fries))
  const strongFriesAddress = '0x10492A5b581e1aca62f64B79adC2cbCeE3A6B466';
  //const strongFryBalance = useTokenBalance(getStrongFryAddress(fries))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchStrongFriesBalance() {
      const balance = await getStrongFriesBalance(fries, strongFriesAddress)
      setStrongFriesBalance(balance)
    }
    if (fries) {
      fetchStrongFriesBalance()
    }
  }, [fries, setStrongFriesBalance])

  useEffect(() => {
    async function fetchTotalBurned() {
      const burned = await getBurntSupply(fries)
      setBurntBalance(burned)
    }
    if (fries) {
      fetchTotalBurned()
    }
  }, [fries, setBurntBalance])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getFriesSupply(fries)
      setTotalSupply(supply)
    }
    if (fries) {
      fetchTotalSupply()
    }
  }, [fries, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <BurntIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Total BURNT Fries" />
                <Value
                  value={burntBalance ? getBalanceNumber(burntBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <StrongIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Strong FRIES Reserve" />
                <Value
                  value={strongFriesBalance ? getBalanceNumber(strongFriesBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>

      </Card>

    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[600]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
