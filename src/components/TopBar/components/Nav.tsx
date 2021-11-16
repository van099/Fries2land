import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: `5px 15px`,
    zIndex: 0,
  }
}));

const Nav: React.FC = () => {
  const classes = useStyles();

  return (
    <StyledNav>
      {/* <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink> */}
      <StyledLink exact activeClassName="active" to="/farms">
        <Badge className={classes.padding} color="secondary" badgeContent="Hot">
          Frying
        </Badge>
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/stakingv2">
          Ketchup
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/vaults">
        <Badge className={classes.padding} color="secondary" badgeContent="Hot">
          CakeLPv1
        </Badge>
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/vaultsv2">
        <Badge className={classes.padding} color="secondary" badgeContent="New">
          CakeLPv2
        </Badge>
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/fryreaper">
      <Badge className={classes.padding} color="secondary" badgeContent="New">
          fryReaper
        </Badge>
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/NFTs">
        NFTs
      </StyledLink> */}
      <StyledLink exact activeClassName="active" to="/WBNB">
        WBNB
      </StyledLink>
      {/* <StyledAbsoluteLink
        href="https://medium.com/@fryworld"
        target="_blank"
      >
        About
      </StyledAbsoluteLink> */}
    </StyledNav>
  )
}

const StyledIcon = styled.span`
  top: 0;
  right: 0;
  transform: scale(1) translate(0%, -60%);
  transform-origin: 100% 0%;
`

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media(max-width: 768px) {
    flex-flow: column;
    margin-top: 20px;
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

const StyledAbsoluteLink = styled.a`
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
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    padding-top: 5px;
  }
`

export default Nav
