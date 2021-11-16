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
import useVaultsPoolWeight from '../../../hooks/useVaultsPoolWeight'
import useFarmsPoolWeight from '../../../hooks/useFarmsPoolWeight'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useVaultsCakePortion from '../../../hooks/useVaultsCakePortion'
import useCakePrice from '../../../hooks/useCakePrice'
import useWBNBPrice from '../../../hooks/useWBNBPrice'
import useFriesPrice from '../../../hooks/useFriesPrice'
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
    background: `#FFB800 !important`,
    border: `0px solid #FFB800`,
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

interface VaultProps {
  vaultData: any
  expanded: string
  setExpanded: Function
  roundId: Number
  totalValue: BigNumber
  poolAmount: BigNumber
  tvlWeight: BigNumber
}

const vaultPids = [1,2,11,15,34,14,25,41]

const pidMap = [
  {vaultPid: 2, fryingPid: 19},
  {vaultPid: 11, fryingPid: 20},
  {vaultPid: 1, fryingPid: 23},
  {vaultPid: 15, fryingPid: 21},
  {vaultPid: 34, fryingPid: 24},
  {vaultPid: 14, fryingPid: 22},
  {vaultPid: 25, fryingPid: 25},
  {vaultPid: 41, fryingPid: 18},
]

const getFryingPid = (vpid: Number) => {
  const pids = pidMap.find(onePids => onePids.vaultPid === vpid)
  if (!!pids) {
    return pids.fryingPid
  }
  return -1;
}

const Vaultv2Form: React.FC<VaultProps> = ({ vaultData, expanded, setExpanded, roundId, totalValue, poolAmount, tvlWeight }) => {
  const classes = useStyles();
  const [pendingTx, setPendingTx] = useState(false)
  const [vaultPoolAPY, setVaultPoolAPY] = useState(0)
  const [friesAPY, setFriesAPY] = useState(0)
  const [cakeLpBalance, setCakeLpBalance] = useState(new BigNumber(0))

  // console.log('pidMap.find :>> ', pidMap.find(onePair => onePair.vaultPid === vaultData.pid));
  const fryingPid = getFryingPid(vaultData.pid)

  const fries = useFries()
  const allowance = useAllowance(vaultData.lpContract, false, vaultData.vaultContract)
  const lpTokenBalance = getDecimalBalance(useTokenBalance(vaultData.lpContract.options.address)).toNumber()
  const fryTokenBalanceBG = useTokenBalance(vaultData.vaultContract.options.address)
  const fryTokenBalance = getDecimalBalance(fryTokenBalanceBG).toNumber()
  const stakedBalanceBG = useStakedBalance(fryingPid)
  const stakedBalance = getDecimalBalance(stakedBalanceBG).toNumber()
  const { onApprove } = useApprove(vaultData.lpContract, false, vaultData.vaultContract)
  const { onDeposit } = useVaultsDeposit(vaultData.vaultContract)
  const { onWithdraw } = useVaultsWithdraw(vaultData.vaultContract)

  const [tokenVal, setTokenVal] = useState('0.00')
  const [tokenFryVal, setTokenFryVal] = useState('0.00')
  const [tokenSliderVal, setTokenSliderVal] = useState(0)
  const [tokenFrySliderVal, setTokenFrySliderVal] = useState(0)

  const cakePrice = useCakePrice();
  const CAKE_PER_BLOCK = new BigNumber(40);
  const CAKE_BLOCK_CONSTANT = new BigNumber(10368000)

  const vaultsPoolWeight = useVaultsPoolWeight(vaultData.pid);
  const vaultsCakePortion = useVaultsCakePortion();
  const poolWeight = useFarmsPoolWeight(fryingPid);

  const wbnbPrice = useWBNBPrice() // wbnb price
  const friesPrice = useFriesPrice().times(wbnbPrice) // fries price in wbnb.
  const FRIES_BLOCK_CONSTANT = new BigNumber(64152)

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        const totalSupply = new BigNumber(await vaultData.vaultContract.methods.totalSupply().call())
        // const { reserve0, reserve1 }: { reserve0: string, reserve1: string } = await getReserves(pairContract)
        const balance = new BigNumber(await vaultData.vaultContract.methods.balance().call())
        if (totalSupply.isGreaterThan(new BigNumber(0))) {
          const newCakeLpBalance = (fryTokenBalanceBG.plus(stakedBalanceBG)).div(totalSupply).times(balance)
          if (totalSupply.isGreaterThan(new BigNumber(0)) && !newCakeLpBalance.eq(cakeLpBalance)) {
            setCakeLpBalance(newCakeLpBalance)
          }
        }
      } catch (error) { }
    }
    if (fries && vaultData.enabled) {
      fetchTotalSupply()
    }
  }, [fries, vaultData, fryTokenBalanceBG, stakedBalanceBG, setCakeLpBalance])

  useEffect(() => {
    let newFriesAPY = new BigNumber(0);
    if (totalValue.toString() != '0' && vaultPids.includes(vaultData.pid) && poolWeight) {
      newFriesAPY = friesPrice
        .times(FRIES_BLOCK_CONSTANT)
        .times(poolWeight)
        .div(totalValue)
        .div(tvlWeight)
      if (newFriesAPY.toNumber() !== friesAPY) {
        setFriesAPY(newFriesAPY.toNumber())
      }
    }
  }, [friesPrice, poolWeight, totalValue])

  useEffect(() => {
    const vaultsPoolYearCakeRewardsInUSD = CAKE_PER_BLOCK.times(CAKE_BLOCK_CONSTANT).times(vaultsCakePortion).times(cakePrice)

    if (poolAmount.toString() != '0') {
      const vaultAPR = vaultsPoolYearCakeRewardsInUSD.times(vaultsPoolWeight).div(poolAmount);
      // setVaultPoolAPY(vaultAPR.toNumber());
      const newValutAPY = compound(vaultAPR.toNumber(), Number(process.env.REACT_APP_COMPOUND_APCTT), 365, Number(process.env.REACT_APP_COMPOUND_TIMES_PER_DAY))
      if (newValutAPY !== vaultPoolAPY) {
        setVaultPoolAPY(newValutAPY);
      }
    }
  }, [poolAmount, cakePrice, vaultsPoolWeight, vaultsCakePortion, poolWeight])

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  }

  const handleTokenValInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setTokenVal(e.currentTarget.value)
      if (Number(e.currentTarget.value) === 0 || lpTokenBalance === 0)
        setTokenSliderVal(0);
      else
        setTokenSliderVal(Math.floor(parseFloat(e.currentTarget.value) * 100 / lpTokenBalance));
    },
    [setTokenVal, lpTokenBalance],
  )

  const handleTokenValSliderChange = useCallback(
    (e: React.ChangeEvent<{}>, tokenSliderValue: any) => {
      setTokenVal(`${lpTokenBalance * tokenSliderValue / 100}`);
      setTokenSliderVal(tokenSliderValue);
    },
    [setTokenSliderVal, lpTokenBalance],
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
      setTokenFryVal(`${fryTokenBalance * tokenFrySliderValue / 100}`);
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
      expanded={expanded === vaultData.pid}
      key={`accordion_${vaultData.pid}`}
      onChange={handleChange(vaultData.pid)}
      className={classes.accordion}
      disabled={vaultData.pid >= roundId || !vaultData.enabled}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${vaultData.pid}-content`}
        id={`panel${vaultData.pid}-header`}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={5} className={classes.grid}>
            <div className={classes.columnLeft}>
              <StyledRowDiv>
                <StyledIcon><img src={vaultData.logo} width={50} /></StyledIcon>
                <StyledColDiv>
                  <StyledTitle>
                    {vaultData.title}
                  </StyledTitle>
                </StyledColDiv>
              </StyledRowDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.grid}>
            <div className={classes.columnCenter}>
              <StyledColDiv>
                <Label text={'APY:'} />
                <StyledValue>{((vaultPoolAPY + friesAPY) * 100).toFixed(2)}%</StyledValue>
                {vaultPids.includes(vaultData.pid) &&
                  <>
                    <StyledSubValue>{`• ${(vaultPoolAPY * 100).toFixed(2)}%`}</StyledSubValue>
                    <StyledSubValue>{`• ${(friesAPY * 100).toFixed(2)}% 🍟`}</StyledSubValue>
                  </>
                }
              </StyledColDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.grid}>
            <div className={classes.columnRight}>
              <StyledColDiv>
                <Label text={'Your LP tokens:'} align="right" />
                <StyledValue>{`${getBalanceNumber(cakeLpBalance)}`}</StyledValue>
              </StyledColDiv>
            </div>
          </Grid>
          <Grid item xs={12} md={3} className={classes.grid}>
            <div className={classes.columnRight}>
              <StyledColDiv>
                <Label text={'Total Value Locked:'} align="right" />
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
              <StyledLabel>{`Your wallet: ${lpTokenBalance.toFixed(5)} ${vaultData.lpSymbol}`}</StyledLabel>
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
                    disabled={vaultData.pid >= roundId || pendingTx || !vaultData.enabled}
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
                      disabled={vaultData.pid >= roundId ||
                        pendingTx ||
                        !parseFloat(tokenVal) ||
                        parseFloat(tokenVal) > lpTokenBalance ||
                        !vaultData.enabled}
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
                      disabled={vaultData.pid >= roundId || pendingTx || !lpTokenBalance}
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
              <StyledLabel>{`${(fryTokenBalance + stakedBalance).toFixed(5)} ${vaultData.tokenSymbol}`}</StyledLabel>
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
                    disabled={vaultData.pid >= roundId || pendingTx || !parseFloat(tokenFryVal) || parseFloat(tokenFryVal) > fryTokenBalance}
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
                    disabled={vaultData.pid >= roundId || pendingTx || !fryTokenBalance}
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
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 20px;
  font-weight: 600;
  margin: ${(props) => props.theme.spacing[1]}px 0 0;
  padding: 0;
`

const StyledValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 22px;
  font-weight: 700;
`

const StyledSubValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  font-weight: 600;
`

const StyledLabel = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  text-align: right;
`

export default Vaultv2Form
