import React, { useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import friesAndKetchup from '../../assets/img/friesandketchup.png'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import Spacer from '../../components/Spacer'
import useModal from '../../hooks/useModal'

import useFries from '../../hooks/useFries'
import { getContract } from '../../utils/erc20'
import { getFriesAddress } from '../../fries/utils'

import Stats from './components/Stats'
import Harvest from './components/Harvest'
import HarvestStrongFries from './components/HarvestStrongFries'
import HarvestFries from './components/HarvestFries'
import Stake from './components/Stake'

import BigNumber from 'bignumber.js'
import useFarms from '../../hooks/useFarms'
import useFriesPrice from '../../hooks/useFriesPrice'
import useWBNBPrice from '../../hooks/useWBNBPrice'
import useAllStakedValue from '../../hooks/useAllStakedValue'
import useFarmsPoolWeight from '../../hooks/useFarmsPoolWeight'

const Farm: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fries = useFries()
  const { ethereum } = useWallet()
  const friesAddress = getFriesAddress(fries)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, friesAddress)
  }, [ethereum, friesAddress])

  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()

  const wbnbPrice = useWBNBPrice() // wbnb price
  const friesPrice = useFriesPrice().times(wbnbPrice) // fires price in wbnb.

  // BLOCK_CONSTANT = BLOCKS_PER_YEAR*FRIES_PER_BLOCK
  const BLOCK_CONSTANT = new BigNumber(64152)
  // YEAR_CONSTANT = DAYS_PER_YEAR*FRIES_PER_DAY
  const YEAR_CONSTANT = new BigNumber(8760)

  let apyValueString = "Loading..";
  let apyValueForFriesStaking = new BigNumber(0);
  let poolWeightForFriesStaking = useFarmsPoolWeight(7);

  farms.forEach((farm, i) => {
    if (stakedValue[i] && farm.pid === 8) {
      let friesPortion = friesPrice
        .times(BLOCK_CONSTANT)
        .times(poolWeightForFriesStaking)
      friesPortion = friesPortion.plus(YEAR_CONSTANT.times(friesPrice))

      let totalValue = stakedValue[i].subTokenValue1.times(friesPrice)
      apyValueForFriesStaking = friesPortion.div(totalValue)
      apyValueString = `APY: ${apyValueForFriesStaking
        .times(new BigNumber(100))
        .toNumber()
        .toLocaleString('en-US')
        .slice(0, -1)}%`
    }
  })

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={<img src={friesAndKetchup} height="120" style={{ marginLeft: "-50%" }} />}
            title="Fry World Staking"
            subtitle="Stake Fries, Get Ketchup + StrongFries + 3X Fries Pool!"
            highlight={apyValueString}
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Stats index={0} />
              </StyledCardWrapper>
              <Spacer />
              <Stake
                lpContract={lpContract}
                tokenName={"FRIES"}
              />
              <Spacer />
              <StyledCardWrapper>
                <Stats index={1} />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="md" />
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <HarvestFries />
              </StyledCardWrapper>
              <Spacer />
              <Harvest lpTokenName="KETCHUP" lpTokenIcon="🍅" />
              <Spacer />
              <StyledCardWrapper>
                <HarvestStrongFries />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="lg" />
            <StyledCardsWrapper>
              <StyledInfo>
                Ketchup holders will earn all the StrongFries produced,
                along with a 3X multiplier pool from the farming contract,
                until distribution has completed.
                More details to come about staking and unstaking rewards on the medium article soon! 🍟🍅
            </StyledInfo>
            </StyledCardsWrapper>
            <Spacer size="lg" />
          </StyledFarm>
        </>
      ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
    </Page>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 900px;
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

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
