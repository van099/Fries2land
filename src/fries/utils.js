import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const calcTime = (offset) => {
  const d = new Date();
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const nd = new Date(utc + (3600000 * offset));
  return nd;
}

export const getMasterChefAddress = (fries) => {
  return fries && fries.masterChefAddress
}

export const getFriesAddress = (fries) => {
  return fries && fries.friesAddress
}
//
export const getStrongFryAddress = (fries) => {
  return fries && fries.contracts.strongFries
}
export const getFriesWbnbPairAddress = (fries) => {
  return fries && fries.friesWbnbPairAddress
}
export const getBurgerWbnbPairAddress = (fries) => {
  return fries && fries.burgerWbnbPairAddress
}
export const getStableWbnbPairAddress = (fries) => {
  return fries && fries.stableWbnbPairAddress
}
export const getSevenupWbnbPairAddress = (fries) => {
  return fries && fries.sevenupWbnbPairAddress
}
export const getKetchupBarAddress = (fries) => {
  return fries && fries.ketchupBarAddress
}
export const getKetchupHarvesterAddress = (fries) => {
  return fries && fries.kechupHarvesterAddress
}
export const getPancakeMasterChefAddress = (fries) => {
  return fries && fries.pancakeMasterChefAddress
}
export const getBakeryMasterChefAddress = (fries) => {
  return fries && fries.bakeryMasterChefAddress
}

export const getWbnbContract = (fries) => {
  return fries && fries.contracts && fries.contracts.wbnb
}
export const getMasterChefContract = (fries) => {
  return fries && fries.contracts && fries.contracts.masterChef
}
export const getFriesContract = (fries) => {
  return fries && fries.contracts && fries.contracts.fries
}
export const getFriesWbnbPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.friesWbnbPair
}
export const getBurgerWbnbPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.burgerWbnbPair
}
export const getStableWbnbPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.stableWbnbPair
}
export const getCakeBusdPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.cakeBusdPair
}
export const getFilWbnbPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.filWbnbPair
}
export const getSevenupWbnbPairContract = (fries) => {
  return fries && fries.contracts && fries.contracts.sevenupWbnbPair
}
export const getKetchupBarContract = (fries) => {
  return fries && fries.contracts && fries.contracts.ketchupBar
}
export const getKetchupBarOldContract = (fries) => {
  return fries && fries.contracts && fries.contracts.ketchupBarOld
}
export const getPancakeMasterChefContract = (fries) => {
  return fries && fries.contracts && fries.contracts.pancakeMasterChef
}
export const getSupportedVaults = (fries) => {
  return fries && fries.contracts.vaults && fries.contracts.vaults
}
export const getSupportedReapers = (fries) => {
  return fries && fries.contracts.vaults && fries.contracts.reapers
}
export const getSupportedVaultsv2 = (fries) => {
  return fries && fries.contracts.vaultsv2 && fries.contracts.vaultsv2
}
export const getSupportedSingleVaults = (fries) => {
  return fries && fries.contracts.singleVaults && fries.contracts.singleVaults
}

export const getFarms = (fries) => {
  return fries
    ? fries.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        subTokenSymbol1,
        subTokenSymbol2,
        tokenContract,
        lpAddress,
        lpContract,
        subTokenContract1,
        subTokenContract2,
        separator,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        subTokenSymbol1,
        subTokenSymbol2,
        subTokenContract1,
        subTokenContract2,
        tokenContract,
        earnToken: 'fries',
        earnTokenAddress: fries.contracts.fries.options.address,
        icon,
        separator,
      }),
    )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  try {
    const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
    const totalAllocPoint = await masterChefContract.methods
      .totalAllocPoint()
      .call()
    return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
  } catch (error) {
    return new BigNumber(0);
  }
}

export const getFarmsPoolWeight = async (masterChefContract, pid) => {
  try {
    const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
    const totalAllocPoint = await masterChefContract.methods
      .totalAllocPoint()
      .call()

    return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
  } catch (error) {
    return new BigNumber(0);
  }
}

export const getValutsPoolWeight = async (pancakeMasterChefContract, pid) => {
  try {
    const { allocPoint: mainPoint } = await pancakeMasterChefContract.methods.poolInfo(pid).call()
    const { allocPoint: point0 } = await pancakeMasterChefContract.methods.poolInfo(0).call()
    const { allocPoint: point33 } = await pancakeMasterChefContract.methods.poolInfo(33).call()
    const totalAllocPoint = await pancakeMasterChefContract.methods
      .totalAllocPoint()
      .call()

    return new BigNumber(mainPoint).div(new BigNumber(totalAllocPoint).minus(new BigNumber(point0)).minus(new BigNumber(point33)))
  } catch (error) {
    return new BigNumber(0);
  }
}

export const getValutsCakePortion = async (pancakeMasterChefContract) => {
  try {
    const { allocPoint: point0 } = await pancakeMasterChefContract.methods.poolInfo(0).call()
    const { allocPoint: point33 } = await pancakeMasterChefContract.methods.poolInfo(33).call()
    const totalAllocPoint = await pancakeMasterChefContract.methods
      .totalAllocPoint()
      .call()

    return new BigNumber(1).minus((new BigNumber(point0).plus(new BigNumber(point33))).div(new BigNumber(totalAllocPoint)))
  } catch (error) {
    return new BigNumber(0);
  }
}

export const getEarned = async (masterChefContract, pid, account) => {
  // if ([17].includes(pid)) { // TODO: remove in future
  //   return 0
  // }
  return masterChefContract.methods.pendingFries(pid, account).call()
}

export const getTotalLPWbnbValue = async (
  masterChefContract,
  wbnbContract,
  lpContract,
  tokenContract,
  pid,
  subTokenContract1,
  subTokenContract2,
) => {
  if (pid >= 0) {
    let balance = new BigNumber(0);
    let subBalance1 = new BigNumber(0);
    let subBalance2 = new BigNumber(0);
    if ([0, 1, 2, 12].includes(pid)) {
      balance = await tokenContract.methods
        .balanceOf(masterChefContract.options.address)
        .call()
    } else {
      if (pid === 8) {
        balance = await tokenContract.methods
          .balanceOf(masterChefContract.options.address)
          .call()
      }
      subBalance1 = await subTokenContract1.methods
        .balanceOf(lpContract.options.address)
        .call()

      subBalance2 = await subTokenContract2.methods
        .balanceOf(lpContract.options.address)
        .call()
    }
    return {
      totalWbnbValue: new BigNumber(balance).div(new BigNumber(10).pow(18)),
      subTokenValue1: new BigNumber(subBalance1).div(new BigNumber(10).pow(18)),
      subTokenValue2: new BigNumber(subBalance2).div(new BigNumber(10).pow(18)),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  }
  return {
    totalWbnbValue: new BigNumber(0),
    subTokenValue1: new BigNumber(0),
    subTokenValue2: new BigNumber(0),
    poolWeight: new BigNumber(0),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getFriesSupply = async (fries) => {
  return new BigNumber(await fries.contracts.fries.methods.totalSupply().call())
}

export const getStrongFriesBalance = async (fries, address) => {
  return new BigNumber(await fries.contracts.fries.methods.balanceOf(address).call())
}

export const getBurntSupply = async (fries) => {
  return new BigNumber(await fries.contracts.fries.methods.burntFries().call())
}

export const getKetchupBarOldSupply = async (fries) => {
  return new BigNumber(await fries.contracts.ketchupBarOld.methods.totalSupply().call())
}

export const getKetchupBarSupply = async (fries) => {
  return new BigNumber(await fries.contracts.ketchupBar.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const deposit = async (wBNBContract, amount, account) => {
  return wBNBContract.methods
    .deposit(0)
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const withdraw = async (wBNBContract, amount, account) => {
  return wBNBContract.methods
    .withdraw(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getDepositBalance = async (wBNBContract, account) => {
  try {
    const { amount } = await wBNBContract.methods
      .balanceOf(account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getReserves = async (pairContract) => {
  try {
    const { _reserve0, _reserve1, _blockTimestampLast } = await pairContract.methods
      .getReserves()
      .call()
    return { reserve0: _reserve0, reserve1: _reserve1 }
  } catch {
    return { reserve0: '0', reserve1: '0' }
  }
}

export const getSymbolPrice = async (pairContract, symbol, order) => {
  try {
    const { _reserve0, _reserve1, _blockTimestampLast } = await pairContract.methods
      .getReserves()
      .call()
    let reserve0 = new BigNumber(_reserve0)
    let reserve1 = new BigNumber(_reserve1)
    if (!order) {
      reserve0 = new BigNumber(_reserve1)
      reserve1 = new BigNumber(_reserve0)
    }
    if (!reserve0.eq(new BigNumber(0))) {
      if (symbol !== "CTK") {
      return new BigNumber(reserve1).div(new BigNumber(reserve0))
      }
      return new BigNumber(reserve1).div(new BigNumber(reserve0)).div(10**12)
    }
    return new BigNumber(0)
  } catch {
    return new BigNumber(0)
  }
}

export const getReservesValue = async (lpContract, vaultContract, symbol0, symbol1, order, bnbPrice, cakePrice, pid, masterChefAddress, version) => {
  try {
    const { _reserve0, _reserve1, _blockTimestampLast } = await lpContract.methods
      .getReserves()
      .call()
    const totalSupply = new BigNumber(await lpContract.methods.totalSupply().call())
    const deposited = new BigNumber(await vaultContract.methods.totalSupply().call())
    let reserve0 = new BigNumber(_reserve0)
    let reserve1 = new BigNumber(_reserve1)
    let tvlWeight = new BigNumber(0)
    if (symbol0 === "CTK") {
      reserve0 = reserve0.times(10**12)
    }
    let symbol0Price = new BigNumber(1)
    let symbol1Price = new BigNumber(1)
    if (symbol0 === "BNB") { symbol0Price = bnbPrice }
    if (symbol1 === "BNB") { symbol1Price = bnbPrice }
    if (symbol0 === "CAKE") { symbol0Price = cakePrice }
    if (symbol1 === "CAKE") { symbol1Price = cakePrice }
    
    if (!['BUSD', 'USDT', 'DAI', 'USDC', 'BNB', 'CAKE'].includes(symbol0)) {
      try {
        symbol0Price = await getSymbolPrice(lpContract, symbol0, order)
        if (symbol1 === "BNB") {
          symbol0Price = symbol0Price.times(bnbPrice)
        }
        if (symbol1 === "CAKE") {
          symbol0Price = symbol0Price.times(cakePrice)
        }
      } catch (error) { }
    }
    if (!['BUSD', 'USDT', 'DAI', 'USDC', 'BNB', 'CAKE'].includes(symbol1)) {
      try {
        symbol1Price = await getSymbolPrice(lpContract, symbol1, order)
        if (symbol0 === "BNB") {
          symbol1Price = symbol1Price.times(bnbPrice)
        }
        if (symbol1 === "CAKE") {
          symbol1Price = symbol1Price.times(cakePrice)
        }
      } catch(error) {}
    }
    // console.log(`${symbol0} : ${symbol0Price}`)
    // console.log(`${symbol1} : ${symbol1Price}`)
    reserve0 = reserve0.times(symbol0Price)
    reserve1 = reserve1.times(symbol1Price)
    let tvl = new BigNumber(0)
    if (totalSupply.toString() != "0") {
      tvl = (reserve0.plus(reserve1)).div(totalSupply).times(deposited).div(10 ** 18)
    }
    if (((version === 1 && [1,2,11,15,34,14, 25].includes(pid)) || 
      (version === 2 && [1,2,11,15,34,14,25,41].includes(pid))) && deposited.toString() != "0") {
      tvlWeight = new BigNumber(await vaultContract.methods.balanceOf(masterChefAddress).call()).div(deposited)
    }
    return { tvl, poolAmount: (reserve0.plus(reserve1)).div(10 ** 18), tvlWeight, pid }
  } catch {
    return { tvl: new BigNumber(0), poolAmount: new BigNumber(0), tvlWeight: new BigNumber(0), pid }
  }
}

export const enterFries = async (ketchupContract, amount, account) => {
  return ketchupContract.methods
    .enter(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const leaveKetchup = async (ketchupContract, amount, account) => {
  return ketchupContract.methods
    .leave(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const vaultsDeposit = async (vaultContract, amount, account, isAll) => {
  let args = [new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()]
  let method = vaultContract.methods.deposit
  if (isAll) {
    args = []
    method = vaultContract.methods.depositAll
  }
  return method(...args)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const vaultsWithdraw = async (vaultContract, amount, account, isAll) => {
  let args = [new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()]
  let method = vaultContract.methods.withdraw
  if (isAll) {
    args = []
    method = vaultContract.methods.withdrawAll
  }
  return method(...args)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getReaperValue = async (tokenContract, reaperContract, pairContract, symbol, order, bnbPrice, masterChefAddress, pid) => {
  try {
    let reaperTvl = new BigNumber(0)
    let symbolPrice = new BigNumber(0)
    let poolAmount = new BigNumber(0)
    const totalFryTokens = new BigNumber(await reaperContract.methods.totalSupply().call())
    const poolBalance = new BigNumber(await tokenContract.methods.balanceOf(masterChefAddress).call())

    try {
      symbolPrice = await getSymbolPrice(pairContract, symbol, order)
      symbolPrice = symbolPrice.times(bnbPrice)
      reaperTvl = totalFryTokens.times(symbolPrice).div(10**18)
      poolAmount = poolBalance.times(symbolPrice).div(10**18)
    } catch (error) { }

    return { tvl: reaperTvl, price: symbolPrice, poolAmount, pid }
  } catch {
    return { tvl: new BigNumber(0) ,price: new BigNumber(0), poolAmount: new BigNumber(0), pid }
  }
}

export const getUserInfo = async (reaperContract, account) => {
  try {
    const { depositAmount, shares } = await reaperContract.methods
      .userInfo(account)
      .call()
    return { depositAmount: new BigNumber(depositAmount), shares: new BigNumber(shares) }
  } catch {
    return { depositAmount: new BigNumber(0), shares: new BigNumber(0) }
  }
}