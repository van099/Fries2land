import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Label from '../../../components/Label'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '../../../components/Input';

import useFries from '../../../hooks/useFries'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useVaultsDeposit from '../../../hooks/useVaultsDeposit'
import useVaultsWithdraw from '../../../hooks/useVaultsWithdraw'
import useUserInfo from '../../../hooks/useUserInfo'

import { getDecimalBalance } from '../../../utils/formatBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { compound } from '../../../fries/compound'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  grid: {
    display: 'inline-flex',
  },
  columnLeft: {
    [theme.breakpoints.down("sm")]: {
      flexBasis: '100%',
      textAlign: 'left',
      paddingLeft: '0%',
      margin: 'auto 0',
    },
    [theme.breakpoints.up("md")]: {
      flexBasis: '100%',
      textAlign: 'left',
      paddingLeft: '3%',
      margin: 'auto 0',
    }
  },
  columnCenter: {
      flexBasis: '100%',
      textAlign: 'left',
      margin: 'auto 0',
      paddingLeft: '10%',
  },
  columnRight: {
    flexBasis: '100%',
    textAlign: 'left',
    paddingLeft: '10%',
    margin: 'auto 0',
  },
  columnOne: {
    flexBasis: '100%',
    margin: '0 20px'
  },
  accordion: {
    background: `#575656 !important`,
    border: `0px solid #575656`,
    borderRadius: `20px !important`,
    display: `flex`,
    marginBottom: `10px`,
    flex: `1`,
    flexDirection: `column`,
  },
}));

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

interface ReaperProps {
  data: any
  expanded: string
  setExpanded: Function
  roundId: Number
  totalValue: BigNumber
  symbolPrice: BigNumber
  poolAmount: BigNumber
  tvlWeight: BigNumber
}

const ReaperForm: React.FC<ReaperProps> = ({ data, expanded, setExpanded, roundId, totalValue, symbolPrice, poolAmount, tvlWeight }) => {
  const classes = useStyles();
  const [pendingTx, setPendingTx] = useState(false)
  const [yourProfit, setYourProfit] = useState(new BigNumber(0))
  const [poolAPY, setPoolAPY] = useState(0)

  const fries = useFries()
  const allowance = useAllowance(data.tokenContract, false, data.reaperContract)
  const tokenBalanceBG = useTokenBalance(data.tokenContract.options.address)
  const tokenBalance = getDecimalBalance(tokenBalanceBG).toNumber()
  const fryTokenBalanceBG = useTokenBalance(data.reaperContract.options.address)
  const fryTokenBalance = getDecimalBalance(fryTokenBalanceBG).toNumber()
  const { depositedAmount } = useUserInfo(data.reaperContract)
  const { onApprove } = useApprove(data.tokenContract, false, data.reaperContract)
  const { onDeposit } = useVaultsDeposit(data.reaperContract)
  const { onWithdraw } = useVaultsWithdraw(data.reaperContract)

  const [tokenVal, setTokenVal] = useState('0.00')
  const [tokenFryVal, setTokenFryVal] = useState('0.00')
  const [tokenSliderVal, setTokenSliderVal] = useState(0)
  const [tokenFrySliderVal, setTokenFrySliderVal] = useState(0)

  const REWARD_PER_BLOCK = new BigNumber(10);
  const BLOCK_CONSTANT = new BigNumber(10368000)

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        const totalSupply = new BigNumber(await data.reaperContract.methods.totalSupply().call())
        const balance = new BigNumber(await data.reaperContract.methods.balance().call())
        if (totalSupply.isGreaterThan(new BigNumber(0))) {
          const newUpdatedBalance = (balance).times(fryTokenBalanceBG).div(totalSupply)          
          const newProfitValue = (newUpdatedBalance.minus(depositedAmount)).times(symbolPrice)
          if (!newProfitValue.eq(yourProfit)) {
            setYourProfit(newProfitValue)
          }
        }
      } catch (error) { }
    }
    if (fries && data.enabled) {
      fetchTotalSupply()
    }
  }, [fries, data, fryTokenBalanceBG, depositedAmount, fryTokenBalanceBG, setYourProfit, symbolPrice])

  useEffect(() => {
    const vaultsPoolYearCakeRewardsInUSD = REWARD_PER_BLOCK.times(BLOCK_CONSTANT).times(symbolPrice)

    if (poolAmount.toString() != '0') {
      const vaultAPR = vaultsPoolYearCakeRewardsInUSD.div(poolAmount);
      const newValutAPY = compound(vaultAPR.toNumber(), Number(0.88), 365, Number(process.env.REACT_APP_COMPOUND_TIMES_PER_DAY))
      if (newValutAPY !== poolAPY) {
        setPoolAPY(newValutAPY);
      }      
    }
  }, [poolAmount, symbolPrice])

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  }

  const handleTokenValInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTokenVal(e.currentTarget.value)
      if (Number(e.currentTarget.value) === 0 || tokenBalance === 0)
        setTokenSliderVal(0);
      else
        setTokenSliderVal(Math.floor(parseFloat(e.currentTarget.value) * 100 / tokenBalance));
    },
    [setTokenVal, tokenBalance],
  )

  const handleTokenValSliderChange = useCallback(
    (e: React.ChangeEvent<{}>, tokenSliderValue: any) => {
      setTokenVal(`${tokenBalance * (tokenSliderValue >= 100 ? 99 : tokenSliderValue) / 100}`);
      setTokenSliderVal(tokenSliderValue);
    },
    [setTokenSliderVal, tokenBalance],
  )

  const handleTokenFryValInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTokenFryVal(e.currentTarget.value)
      if (Number(e.currentTarget.value) === 0 || fryTokenBalance === 0)
        setTokenFrySliderVal(0);
      else
        setTokenFrySliderVal(Math.floor(parseFloat(e.currentTarget.value) * 100 / fryTokenBalance));
    },
    [setTokenFryVal, fryTokenBalance],
  )

  const handleTokenFryValSliderChange = useCallback(
    (e: React.ChangeEvent<{}>, tokenFrySliderValue: any) => {
      setTokenFryVal(`${fryTokenBalance * (tokenFrySliderValue >= 100 ? 99 : tokenFrySliderValue)/ 100}`);
      setTokenFrySliderVal(tokenFrySliderValue);
    },
    [setTokenFrySliderVal, fryTokenBalance],
  )

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Accordion
      expanded={expanded === data.pid}
      key={`accordion_${data.pid}`}
      onChange={handleChange(data.pid)}
      className={classes.accordion}
      disabled={data.pid >= roundId || !data.enabled}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${data.pid}-content`}
        id={`panel${data.pid}-header`}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3} className={classes.grid}>
            <div className={classes.columnLeft}>
              <StyledRowDiv>
                <StyledIcon><img src={data.logo} width={50} /></StyledIcon>
                <StyledColDiv>
                  <StyledTitle>
                    {data.title}
                  </StyledTitle>
                </StyledColDiv>
              </StyledRowDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.grid}>
            <div className={classes.columnCenter}>
              <StyledColDiv>
                {/* <Label color={200} text={'APY:'} /> */}
                <StyledFontLabel>{`APY:`}</StyledFontLabel>
                <StyledValue>{((poolAPY) * 100).toFixed(2)}%</StyledValue>
              </StyledColDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.grid}>
            <div className={classes.columnRight}>
              <StyledColDiv>
                <StyledFontLabel>{`${data.tokenSymbol} Deposited:`}</StyledFontLabel>
                <StyledValue>{`${getBalanceNumber(depositedAmount, 18, depositedAmount.div(10**18).toNumber() > 1000 ? 2 : 5)}`}</StyledValue>
              </StyledColDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.grid}>
            <div className={classes.columnRight}>
              <StyledColDiv>
                {/* <Label color={200} text={`Your $ Profit:`} align="right" /> */}
                <StyledFontLabel>{`Your $ Profit:`}</StyledFontLabel>
                <StyledValue>{`$${getBalanceNumber(yourProfit, 18, yourProfit.div(10**18).toNumber() > 100 ? 2 : 5)}`}</StyledValue>
              </StyledColDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={3} className={classes.grid}>
            <div className={classes.columnRight}>
              <StyledColDiv>
                {/* <Label color={200} text={'Total Value Locked:'} align="right" /> */}
                <StyledFontLabel>{`Total Value Locked:`}</StyledFontLabel>
                <StyledValue>{`${formatter.format(totalValue ? totalValue.toNumber() : 0)}`}</StyledValue>
              </StyledColDiv>
            </div>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.columnOne}>
          <Grid container spacing={6}>
            <Grid item xs>
              <StyledLabel>{`Your wallet: ${tokenBalance.toFixed(5)} ${data.tokenSymbol}`}</StyledLabel>
              <Input
                value={tokenVal}
                onChange={handleTokenValInputChange}
              />
              <StyledSlider
                defaultValue={0}
                value={tokenSliderVal}
                onChange={handleTokenValSliderChange}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
              />
              {!allowance.toNumber() ? (
                <StyledButtonDiv>
                  <Button
                    disabled={pendingTx || !data.enabled}
                    text={pendingTx ? 'Pending Confirmation' : 'Approve'}
                    onClick={async () => {
                      setPendingTx(true)
                      try {
                        await onApprove()
                      } catch (error) {
                        // console.log('error :>> ', error);
                      }
                      setPendingTx(false)
                    }}
                  />
                </StyledButtonDiv>) :
                (<StyledButtonRow>
                  <StyledButtonDiv>
                    <Button
                      disabled={data.pid >= roundId ||
                        pendingTx ||
                        !parseFloat(tokenVal) ||
                        parseFloat(tokenVal) > tokenBalance ||
                        !data.enabled}
                      text={pendingTx ? 'Pending Confirmation' : 'Deposit'}
                      onClick={async () => {
                        setPendingTx(true)
                        try {
                          await onDeposit(tokenVal, false)
                          setPendingTx(false)
                        } catch (error) {
                          // console.log('error :>> ', error);
                        }
                        setPendingTx(false)
                      }}
                    />
                  </StyledButtonDiv>
                  <StyledButtonDiv>
                    <Button
                      disabled={data.pid >= roundId || pendingTx || !tokenBalance}
                      text={pendingTx ? 'Pending Confirmation' : 'Deposit All'}
                      onClick={async () => {
                        setPendingTx(true)
                        try {
                          await onDeposit('', true)
                          setPendingTx(false)
                        } catch (error) {
                          // console.log('error :>> ', error);
                        }
                        setPendingTx(false)
                      }}
                    />
                  </StyledButtonDiv>
                </StyledButtonRow>)
              }
            </Grid>
            <Grid item xs>
              <StyledLabel>{`${(fryTokenBalance).toFixed(5)} ${data.reaperSymbol}`}</StyledLabel>
              <Input
                value={tokenFryVal}
                onChange={handleTokenFryValInputChange}
              />
              <StyledSlider
                defaultValue={0}
                value={tokenFrySliderVal}
                onChange={handleTokenFryValSliderChange}
                aria-labelledby="discrete-slider-custom"
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
              />
              <StyledButtonRow>
                <StyledButtonDiv>
                  <Button
                    disabled={data.pid >= roundId || pendingTx || !parseFloat(tokenFryVal) || parseFloat(tokenFryVal) > fryTokenBalance}
                    text={pendingTx ? 'Pending Confirmation' : 'Withdraw'}
                    onClick={async () => {
                      setPendingTx(true)
                      try {
                        await onWithdraw(tokenFryVal, false)
                      } catch (error) {
                        // console.log('error :>> ', error);
                      }
                      setPendingTx(false)
                    }}
                  />
                </StyledButtonDiv>
                <StyledButtonDiv>
                  <Button
                    disabled={data.pid >= roundId || pendingTx || !fryTokenBalance}
                    text={pendingTx ? 'Pending Confirmation' : 'Withdraw All'}
                    onClick={async () => {
                      setPendingTx(true)
                      try {
                        await onWithdraw('', true)
                      } catch (error) {
                        // console.log('error :>> ', error);
                      }
                      setPendingTx(false)
                    }}
                  />
                </StyledButtonDiv>
              </StyledButtonRow>
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion >
  )
}

const StyledRowDiv = styled.div`
  text-align: left;
  display: flex;
`

const StyledButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
`

const StyledButtonDiv = styled.div`
  margin: 0 auto;
  width: 150px;
`

const StyledColDiv = styled.div`
  text-align: left;
  display: inline-block;
  flex-direction: column;
  margin: auto 0;
`

const StyledIcon = styled.div`
background-color: ${props => props.theme.color.grey[200]};
font-size: 36px;
height: 80px;
width: 80px;
border-radius: 40px;
align-items: center;
display: flex;
justify-content: center;
box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
inset -6px -6px 12px ${props => props.theme.color.grey[100]};
margin-right: 10px;
`

const StyledSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 20px;
  font-weight: 600;
  margin: ${(props) => props.theme.spacing[1]}px 0 0;
  padding: 0;
`

const StyledValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 22px;
  font-weight: 700;
`

const StyledFontLabel = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 15px;
`

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  text-align: right;
`

export default ReaperForm
