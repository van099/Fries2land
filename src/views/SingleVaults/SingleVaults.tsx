import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import moment from 'moment'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import Spacer from '../../components/Spacer'
import useModal from '../../hooks/useModal'
import useFries from '../../hooks/useFries'
import useVaultsTVL from '../../hooks/useVaultsTVL'
import { getSupportedSingleVaults } from '../../fries/utils'

import { makeStyles } from '@material-ui/core/styles';

import SingleVaultsForm from './components/SingleVaultsForm'

import chef from '../../assets/img/chef.png'

import { BigNumber } from '../../fries'
import useVaultsSingleTVL from '../../hooks/useVaultsSingleTVL'

const MAX = 999999
// const timeToPublish = 1603846800000;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

const Farm: React.FC = () => {
  const classes = useStyles();
  // const [totalReaperTVL, setTotalReaperTVL] = useState(-1)

  const fries = useFries()
  const totalValues = useVaultsSingleTVL()
  const reapers = getSupportedSingleVaults(fries)
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // useEffect(() => {
  //   if (totalValues.length !== 0) {
  //     let sum = 0
  //     totalValues.every((value) => sum = sum + value["tvl"].toNumber())
  //     if (totalReaperTVL !== sum && sum > -1) {
  //       setTotalReaperTVL(sum)
  //     }
  //   }
  // }, [totalValues, setTotalReaperTVL])

  const [expanded, setExpanded] = useState('WBNB')

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={<img src={chef} height="120" />}
            title="Fry World Single Coin Vaults"
            subtitle="This project is in beta. (No Withdrawal Fee)"
            isIcon={0}
            // highlight={totalReaperTVL > -1 ? `Total Reaper Value: ${formatter.format(totalReaperTVL)}` : 'Loading...'}
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <div className={classes.root}>
                {reapers && reapers.map((item: any, key: number) => {
                  return (
                    <SingleVaultsForm
                      key={`reaperform_${key}`}
                      data={item}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      roundId={MAX} // TODO: Remove key === 0
                      totalValue={totalValues.length > 0 ? totalValues[key].tvl : new BigNumber(0)}
                      symbolPrice={totalValues.length > 0 ? totalValues[key].price : new BigNumber(0)}
                      poolAmount={totalValues.length > 0 ? totalValues[key].poolAmount : new BigNumber(0)}
                      // tvlWeight={totalValues.length > 0 ? totalValues[key].tvlWeight : new BigNumber(0)}
                      tvlWeight={new BigNumber(0)}
                    />
                  )
                })}
              </div>
            </StyledCardsWrapper>
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
        @media(max-width: 768px) {
          width: 100%;
        }
        `

const StyledCardsWrapper = styled.div`
        display: flex;
        width: 900px;
        @media(max-width: 768px) {
          align-items: center;
        }
        `
export default Farm
