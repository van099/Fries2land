import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useFriesPrice from '../../../hooks/useFriesPrice'
import useBurgerPrice from '../../../hooks/useBurgerPrice'
import useWBNBPrice from '../../../hooks/useWBNBPrice'
import use7upPrice from '../../../hooks/use7upPrice'
import useFries from '../../../hooks/useFries'
import useVaultsv2TVL from '../../../hooks/useVaultsv2TVL'
import useVaultsSingleTVL from '../../../hooks/useVaultsSingleTVL'
import { getKetchupBarSupply } from '../../../fries/utils'
import BurgerFriesLPCard from './BurgerFriesLPCard'

const timeToPublish = 1608584400000

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const fryingPids = [9, 10, 11, 13, 15, 16, 17]
const pidMap = [
  {vaultPid: 2, fryingPid: 9},
  {vaultPid: 11, fryingPid: 10},
  {vaultPid: 1, fryingPid: 11},
  {vaultPid: 15, fryingPid: 13},
  {vaultPid: 34, fryingPid: 15},
  {vaultPid: 14, fryingPid: 16},
  {vaultPid: 25, fryingPid: 17},
]

const fryingv2Pids = [18, 19, 20, 21, 22, 23, 24, 25]
const pidv2Map = [
  {vaultPid: 2, fryingPid: 19},
  {vaultPid: 11, fryingPid: 20},
  {vaultPid: 1, fryingPid: 23},
  {vaultPid: 15, fryingPid: 21},
  {vaultPid: 34, fryingPid: 24},
  {vaultPid: 14, fryingPid: 22},
  {vaultPid: 25, fryingPid: 25},
  {vaultPid: 41, fryingPid: 18},
]

const fryingSinglePids = [26]
const pidSingleMap = [
  {vaultPid: 0, fryingPid: 26},
]

const FarmCards: React.FC = () => {
  // console.log((new Date('Dec 21, 2020 04:00:00 PM GMT-05:00')).getTime())
  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()

  const wbnbPrice = useWBNBPrice() // wbnb price
  const friesPrice = useFriesPrice().times(wbnbPrice) // fires price in wbnb.
  const burgerPrice = useBurgerPrice().times(wbnbPrice) // burger price from Pancake.
  const sevenupPrice = use7upPrice().times(wbnbPrice) // 7up price from burgerswap
  const totalValuesv2 = useVaultsv2TVL();
  const totalSingleValues = useVaultsSingleTVL();

  // const BLOCKS_PER_YEAR = new BigNumber(10368000)
  const FRIES_PER_BLOCK = new BigNumber(0.0061875)
  // BLOCK_CONSTANT = BLOCKS_PER_YEAR*FRIES_PER_BLOCK
  const FRIES_BLOCK_CONSTANT = new BigNumber(64152)

  const [ketchupSupply, setKetchupSupply] = useState(new BigNumber(0))
  const fries = useFries()

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

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      let apyValue = new BigNumber(0);
      if (stakedValue[i]) {
        let friesPortion = friesPrice
          .times(FRIES_BLOCK_CONSTANT)
          .times(stakedValue[i].poolWeight)

        if (farm.pid === 0) {
          apyValue = friesPortion
            .div(stakedValue[i].totalWbnbValue)
            .div(burgerPrice)
        }
        else if (farm.pid === 1) {
          apyValue = friesPortion
            .div(stakedValue[i].totalWbnbValue)
        }
        else if (farm.pid === 2) {
          apyValue = friesPortion
            .div(stakedValue[i].totalWbnbValue)
            .div(wbnbPrice)
        } else if (farm.pid === 8) {
          let subTokenTotalValue1 = stakedValue[i].subTokenValue1.times(friesPrice)
          let ketchupTVL = stakedValue[i].totalWbnbValue
            .div(ketchupSupply.div(new BigNumber(10).pow(18)))
            .times(subTokenTotalValue1)

          apyValue = friesPortion
            .div(ketchupTVL)
        } else if (fryingPids.includes(farm.pid)) {
          apyValue = new BigNumber(0)
        } else if (fryingv2Pids.includes(farm.pid) && totalValuesv2.length > 0) {
          const matchedVault = pidv2Map.find(pidItem => pidItem.fryingPid === farm.pid)
          const index = totalValuesv2.findIndex(tvlItem => tvlItem.pid === matchedVault.vaultPid)
          
          apyValue = friesPortion
            .div(totalValuesv2[index].tvl)
            .div(totalValuesv2[index].tvlWeight)
        } else if (fryingSinglePids.includes(farm.pid) && totalSingleValues.length > 0) {
          const matchedVault = pidSingleMap.find(pidItem => pidItem.fryingPid === farm.pid)
          const index = totalSingleValues.findIndex(tvlItem => tvlItem.pid === matchedVault.vaultPid)
          
          apyValue = friesPortion
            .div(totalSingleValues[index].tvl)
            // .div(totalSingleValues[index].tvlWeight)
        } else if ([12].includes(farm.pid)) {
          apyValue = friesPortion
            .div(stakedValue[i].totalWbnbValue)
            .div(sevenupPrice)
        // } else if ([17].includes(farm.pid)) {
        } else if (farm.pid > 17) {
          apyValue = null
        } else {
          let subTokenPrice1 = getPrice(farm.subTokenSymbol1);
          let subTokenPrice2 = getPrice(farm.subTokenSymbol2);
          let subTokenTotalValue1 = stakedValue[i].subTokenValue1.times(subTokenPrice1)
          let subTokenTotalValue2 = stakedValue[i].subTokenValue2.times(subTokenPrice2)
          let totalValue = subTokenTotalValue1.plus(subTokenTotalValue2)
          apyValue = friesPortion
            .div(totalValue)
        }
      }

      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: apyValue,
      }
      const newFarmRows = [...farmRows]
      // if (newFarmRows[newFarmRows.length - 1].length === 3 || (newFarmRows[newFarmRows.length - 1].length === 1 && newFarmRows.length === 1)) {
      if (farm.separator > 3) {
        let tmp = []
        for (let i = 0; i < farm.separator; i ++) {
          tmp.push(farmWithStakedValue)
        }
        newFarmRows.push(tmp)
        newFarmRows.push([])
      }
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => {
          const text = farmRow.length  === 4 ? "Cake LP v2" :
                        farmRow.length  === 5 ? "Expired Farms" :
                        farmRow.length  === 6 ? "Single Coin Vaults" : ""
          return farmRow.length < 4  ?
          (<StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                {farm.pid !== 4 ? <FarmCard farm={farm} /> : <BurgerFriesLPCard apy={farm.apy} />}
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>) :
          (<StyledRow key={i}>
            <StyledBorder>{text}</StyledBorder>
          </StyledRow>)
        })
      ) : (
          <StyledLoadingWrapper>
            <Loader text="Loading the Fryer ..." />
          </StyledLoadingWrapper>
        )}
    </StyledCards>

  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const totalHours = hours + 24 * days;
    const paddedHours = totalHours < 10 ? `0${totalHours}` : totalHours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  let poolActive = true
  if (farm.pid > 26 && (timeToPublish - Date.now()) > 0) {    
    poolActive = false;
  }

  return (
    <StyledCardWrapper>
      {[4, 5, 6].includes(farm.pid) && <StyledCardAccent />}
      {[8].includes(farm.pid) && <StyledCardRedAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            {![15, 24].includes(farm.pid) ?
            (<StyledTitle>{farm.name}</StyledTitle>) : 
            (<StyledTitleSmFont>{farm.name}</StyledTitleSmFont>)
            }
            <StyledDetails>
              {
                ![6].includes(farm.pid) ?
                  [1, 2, ...fryingPids].includes(farm.pid) ?
                    (<StyledDetail>Please enter fryer to withdraw tokens</StyledDetail>) :
                    (<StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>) :
                  (<StyledDetailSm>Deposit {farm.lpToken.toUpperCase()}</StyledDetailSm>)
              }
              {
                [1, 2, ...fryingPids].includes(farm.pid) ? "" :
                  (<StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>)
              }
            </StyledDetails>
            <Spacer />
            <Button
              // disabled={!poolActive}
              text={poolActive ? 'Enter Fryer' : undefined}
              to={`/farms/${farm.id}`}
            >
              {!poolActive && (
                <Countdown
                  date={timeToPublish}
                  renderer={renderer}
                />
              )}
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm.apy !== null ?
                  [1, 2, ...fryingPids].includes(farm.pid) ? `0%` :
                    farm.apy.toString() !== '0'
                      ? `${farm.apy
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

const StyledCardRedAccent = styled.div`
  background: linear-gradient(
    90deg,
    rgba(237,49,201,1) 0%,
    rgba(237,49,201,1) 10%,
    rgba(237,49,201,1) 20%,
    rgba(237,49,201,1) 30%,
    rgba(237,49,201,1) 40%,
    rgba(237,49,201,1) 50%,
    rgba(237,49,201,1) 60%,
    rgba(237,49,201,1) 70%,
    rgba(237,49,201,1) 80%,
    rgba(237,49,201,1) 90%,
    rgba(237,49,201,1) 100%
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

const StyledTitleSmFont = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 22px;
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

const StyledDetailSm = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 15px;
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

const StyledBorder = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.color.grey[900]};
  width: 100%;
  color: ${(props) => props.theme.color.grey[900]};
`

export default FarmCards
