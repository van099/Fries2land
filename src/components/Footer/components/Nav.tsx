import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://github.com/fryworld-finance/fryworld-farming-core"
      >
        Github
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://www.bscscan.com/address/0x066d5544a0b05b19f08e45dbc13758a3590386c4"
      >
        DeepFryer Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://burgerswap.org/"
      >
        Trade on BurgerSwap
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/t2uAG6q">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/FryWorldFinance">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/fry_world">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com/@fryworld">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="https://docs.binance.org/smart-chain/wallet/metamask.html">
        Connect Metamask with Binance
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media(max-width: 768px) {
    flex-flow: column;
    margin-top: 150px;
    margin-bottom: 20px;
  }
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[900]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none !important;
  &:hover {
    color: ${(props) => props.theme.color.grey[100]};
  }
  @media(max-width: 768px) {
    padding-top: 10px;
  }
`

export default Nav
