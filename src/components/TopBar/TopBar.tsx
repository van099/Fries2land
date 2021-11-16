import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import useFriesPrice from '../../hooks/useFriesPrice'
import useWBNBPrice from '../../hooks/useWBNBPrice'

import AccountButton from './components/AccountButton'
import { NavLink } from 'react-router-dom';

import './TopBar.css';

import {
  Nav,
  Navbar,
  Dropdown
} from 'react-bootstrap';
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: `5px 15px`,
    zIndex: 0,
  },
  navbar: {
    padding: `0px !important`,
    paddingTop: `10px !important`,
    paddingLeft: `15% !important`,
    paddingRight: `15% !important`,
    textAlign: 'center'
  },
  rightNav: {
    width: `250px`,
    justifyContent: `flex-end`
  },
  dropdownToggle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    color: `#FFB800`,
    fontWeight: 700,
    '&:focus, &:hover, &$active': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0)',
      color: `#FFB800`,
    },
  }
}));

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const classes = useStyles();
  const { color: themeColor } = useContext(ThemeContext)
  const [friesPriceInUSD, setFriesPriceInUSD] = useState(0);

  const friesPrice = useFriesPrice()
  const wbnbPrice = useWBNBPrice()

  useEffect(() => {
    if (friesPrice && wbnbPrice) {
      setFriesPriceInUSD(wbnbPrice.times(friesPrice).dp(2, 1).toNumber())
    }
  }, [friesPrice, wbnbPrice])

  return (
    <Navbar collapseOnSelect className={classes.navbar} expand="lg">
      <Navbar.Brand href="/"><Logo /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          <StyledLink exact activeClassName="active" to="/farms">
            <Badge className={classes.padding} color="secondary" badgeContent="Hot">
              Frying
            </Badge>
          </StyledLink>
          <StyledLink2 exact activeClassName="active" to="/stakingv2">
            Ketchup
          </StyledLink2>
          <Dropdown>
            <Dropdown.Toggle className={classes.dropdownToggle}>
              Vaults
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <StyledLink exact activeClassName="active" to="/vaults">
                  <Badge className={classes.padding} badgeContent="">
                    CakeLPv1
                  </Badge>
                </StyledLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledLink exact activeClassName="active" to="/vaultsv2">
                  <Badge className={classes.padding} color="secondary" badgeContent="New">
                    CakeLPv2
                  </Badge>
                </StyledLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledLink exact activeClassName="active" to="/fryreaper">
                  <Badge className={classes.padding} color="secondary" badgeContent="Hot">
                    fryReaper
                </Badge>
                </StyledLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledLink exact activeClassName="active" to="/singlevaults">
                  <Badge className={classes.padding} color="secondary" badgeContent="New">
                    Single Coins
                </Badge>
                </StyledLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <StyledLink2 exact activeClassName="active" to="/WBNB">
            WBNB
          </StyledLink2>
          <StyledLink3
            target="_blank"
            href="https://fry-world.gitbook.io/fry-world/"
          >
            Docs
          </StyledLink3>
          <StyledLink3
            target="_blank"
            href="https://defiyield.info/assets/pdf/FryWorld.pdf"
          >
            Audit
          </StyledLink3>
        </Nav>
        <Nav className={classes.rightNav}>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
          {
            friesPriceInUSD ?
              (<StyledFriesPriceWrapper>
                <span style={{ color: `${themeColor.grey[900]}` }}>FRIES Price</span>
                <span style={{ color: `${themeColor.grey[900]}`, fontWeight: 600, fontSize: '1.2em', paddingTop: '5px' }}>${`${friesPriceInUSD}`}</span>
              </StyledFriesPriceWrapper>) : undefined
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

const StyledLogoWrapper = styled.div`
  width: 260px;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none !important;
  &:hover {
    color: ${(props) => props.theme.color.grey[100]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 768px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-top: 5px;
  }
`

const StyledLink3 = styled.a`
  font-weight: 700;
  color: ${(props) => props.theme.color.grey[900]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-top: 6px;
  text-decoration: none !important;
  &:hover {
    color: ${(props) => props.theme.color.grey[100]};
  }
  @media(max-width: 768px) {
    padding-top: 5px;
  }
`

const StyledLink2 = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[900]};
  font-weight: 700;
  padding-top: 6px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none !important;
  &:hover {
    color: ${(props) => props.theme.color.grey[100]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 768px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-top: 5px;
  }
`

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  @media (max-width: 768px) {
    height: 100%;
  }
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledFriesPriceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 150px;
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 500;
  margin: auto;
  color: 
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`
export default TopBar
