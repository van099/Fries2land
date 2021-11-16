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
import { getSupportedVaults } from '../../fries/utils'

import { makeStyles } from '@material-ui/core/styles';

import VaultForm from './components/VaultForm'

import chef from '../../assets/img/chef.png'
import { BigNumber } from '../../fries'

const MAX = 999999
// const timeToPublish = 1603846800000;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

const Farm: React.FC = () => {
  const classes = useStyles();
  const [totalVaultsTVL, setTotalVaultsTVL] = useState(-1)

  const fries = useFries()
  const totalValues = useVaultsTVL()
  const vaults = getSupportedVaults(fries)
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (totalValues.length !== 0) {
      let sum = 0
      totalValues.every((value) => sum = sum + value["tvl"].toNumber())
      if (totalVaultsTVL !== sum && sum > -1) {
        setTotalVaultsTVL(sum)
      }
    }
  }, [totalValues, setTotalVaultsTVL])

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
            title={"Fry World Pancake LP Vaults"}
            subtitle="This project is in beta. (Withdrawal Fee: 0.5%)"
            isIcon={0}
            highlight={totalVaultsTVL > -1 ? `Total Vaults Value: ${formatter.format(totalVaultsTVL)}` : 'Loading...'}
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <div className={classes.root}>
                {vaults && vaults.map((item: any, key: number) => {
                  return (
                    <VaultForm
                      key={`vaultsform_${key}`}
                      vaultData={item}
                      expanded={expanded}
                      setExpanded={setExpanded}
                      roundId={MAX} // TODO: Remove key === 0
                      totalValue={totalValues.length > 0 ? totalValues[key].tvl : new BigNumber(0)}
                      poolAmount={totalValues.length > 0 ? totalValues[key].poolAmount : new BigNumber(0)}
                      tvlWeight={totalValues.length > 0 ? totalValues[key].tvlWeight : new BigNumber(0)}
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
