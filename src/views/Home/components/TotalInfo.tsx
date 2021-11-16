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
import TotalIcon from '../../../components/TotalIcon'
import useVaultsTVL from '../../../hooks/useVaultsTVL'
import useVaultsv2TVL from '../../../hooks/useVaultsv2TVL'
import useReapersTVL from '../../../hooks/useReapersTVL'
import useVaultsSingleTVL from '../../../hooks/useVaultsSingleTVL'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFries from '../../../hooks/useFries'
import useFarms from '../../../hooks/useFarms'
import useFriesPrice from '../../../hooks/useFriesPrice'
import useBurgerPrice from '../../../hooks/useBurgerPrice'
import useWBNBPrice from '../../../hooks/useWBNBPrice'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getKetchupBarAddress, getFriesAddress } from '../../../fries/utils'

const TotalInfo: React.FC = () => {
  const [stakedValueInUSD, setStakedValueInUSD] = useState(0)
  const [totalTVL, setTotalTVL] = useState(0)

  const fries = useFries()
  const [farms] = useFarms()
  const friesContractAddress = getFriesAddress(fries);
  const ketchupContractAddress = getKetchupBarAddress(fries);
  const friesStakedBalance = useTokenBalance(friesContractAddress, ketchupContractAddress).div(10 ** 18).toNumber()

  const wbnbPrice = useWBNBPrice() // wbnb price
  const friesPrice = useFriesPrice().times(wbnbPrice) // fires price in wbnb.
  const burgerPrice = useBurgerPrice().times(wbnbPrice) // burger price from Pancake.
  const stakedValue = useAllStakedValue()
  const totalValues = useVaultsTVL()
  const totalValuesv2 = useVaultsv2TVL()
  const totalValuesSingle = useVaultsSingleTVL()
  const reaperTotalValues = useReapersTVL()

  const getPrice = (symbol: string) => {
    let price = new BigNumber(1)
    if (symbol === 'FRIES')
      price = friesPrice;
    else if (symbol === 'wBNB')
      price = wbnbPrice;
    else if (symbol === 'BURGER')
      price = burgerPrice;
    return price;
  }

  useEffect(() => {
    if (farms.length !== 0 && wbnbPrice && friesPrice && burgerPrice && stakedValue.length !== 0) {
      let sum = 0;
      for (let i = 0; i < farms.length; i++) {
        if (farms[i].pid === 0) {
          sum = sum + (burgerPrice.toNumber() * stakedValue[i].totalWbnbValue.toNumber())
        } else if (farms[i].pid === 1) {
          sum = sum + (stakedValue[i].totalWbnbValue.toNumber())
        } else if (farms[i].pid === 2) {
          sum = sum + (wbnbPrice.toNumber() * stakedValue[i].totalWbnbValue.toNumber())
        } else if (farms[i].pid === 8) {
          sum = sum + (friesPrice.toNumber() * stakedValue[i].totalWbnbValue.toNumber())
        } else {
          let subTokenPrice1 = getPrice(farms[i].subTokenSymbol1);
          let subTokenPrice2 = getPrice(farms[i].subTokenSymbol2);
          let subTokenTotalValue1 = stakedValue[i].subTokenValue1.times(subTokenPrice1)
          let subTokenTotalValue2 = stakedValue[i].subTokenValue2.times(subTokenPrice2)
          let totalValue = subTokenTotalValue1.plus(subTokenTotalValue2)
          const totalValueNumber = totalValue.toNumber()
          sum += totalValueNumber
        }
      }
      sum = sum + friesStakedBalance * friesPrice.toNumber()
      if (stakedValueInUSD !== sum && sum > 0 && totalTVL > 0) {
        setStakedValueInUSD(sum + totalTVL)
      }
    }
  }, [farms, wbnbPrice, friesPrice, burgerPrice, stakedValue, totalTVL, setStakedValueInUSD])

  useEffect(() => {
    if (totalValues.length !== 0 && reaperTotalValues.length !== 0) {
      let sum = 0
      reaperTotalValues.every((reaperValue) => sum = sum + reaperValue["tvl"].toNumber())
      totalValues.every((value) => sum = sum + value["tvl"].toNumber())
      totalValuesv2.every((valuev2) => sum = sum + valuev2["tvl"].toNumber())
      totalValuesSingle.every((valuevSingle) => sum = sum + valuevSingle["tvl"].toNumber())
      if (totalTVL !== sum && sum > 0) {
        setTotalTVL(sum)
      }
    }
  }, [totalValues, totalValuesv2, reaperTotalValues,setTotalTVL])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <TotalIcon staked={1} />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Total Staked Value" />
                <Value
                  value={stakedValueInUSD ? `${formatter.format(stakedValueInUSD + totalTVL)}` : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 420px;
  margin: auto;
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

export default TotalInfo
