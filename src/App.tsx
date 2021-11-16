import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import FriesProvider from './contexts/FriesProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import NFTs from './views/NFTs'
import StakeV2 from './views/StakeV2'
import WBNB from './views/WBNB'
import Vaults from './views/Vaults'
import Vaultsv2 from './views/Vaultsv2'
import FryReaper from './views/FryReaper'
import SingleVaults from './views/SingleVaults'
import 'bootstrap/dist/css/bootstrap.min.css'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/stakingv2">
            <StakeV2 />
          </Route>
          <Route path="/vaults">
            <Vaults />
          </Route>
          <Route path="/vaultsv2">
            <Vaultsv2 />
          </Route>
          <Route path="/fryreaper">
            <FryReaper />
          </Route>
          <Route path="/singlevaults">
            <SingleVaults />
          </Route>
          <Route path="/NFTs">
            <NFTs />
          </Route>
          <Route path="/WBNB">
            <WBNB />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ( ) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
        }}
      >
        <FriesProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider></ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </FriesProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
