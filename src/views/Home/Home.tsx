import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Balances2 from './components/Balances2'
import TotalInfo from './components/TotalInfo'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} />}
        title="Fry World"
        subtitle="Stake BEP-20 Tokens to get some FRIES for a limited time"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="md" />
      <Container>
        <Balances2 />
      </Container>
      <Spacer size="md" />
      <Container>
        <TotalInfo />
      </Container>

      <StyledInfo>

      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🥔 Start frying!" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
