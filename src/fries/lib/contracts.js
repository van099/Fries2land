import BigNumber from 'bignumber.js/bignumber'
import ERC20Abi from './abi/erc20.json'
import MasterChefAbi from './abi/masterchef.json'
import FriesAbi from './abi/fries.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import WBNBAbi from './abi/wbnb.json'
import FriesWbnbPairAbi from './abi/friesWbnbPair.json'
import ketchupBarAbi from './abi/ketchupbar.json'
import VaultsAbi from './abi/vaultsAbi.json'
import ReaperAbi from './abi/reaperAbi.json'
import PancakePairAbi from './abi/PancakePairAbi.json'
import PancakeMasterChefAbi from './abi/pancakeMasterChef.json'

import {
  contractAddresses,
  SUBTRACT_GAS_LIMIT,
  supportedPools,
  supportedVaults,
  supportedReapers,
  supportedVaultsv2,
  supportedSingleVaults
} from './constants.js'
import * as Types from './types.js'

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.fries = new this.web3.eth.Contract(FriesAbi)
    this.masterChef = new this.web3.eth.Contract(MasterChefAbi)
    this.wbnb = new this.web3.eth.Contract(WBNBAbi)
    this.friesWbnbPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.burgerWbnbPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.stableWbnbPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.cakeBusdPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.filWbnbPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.sevenupWbnbPair = new this.web3.eth.Contract(FriesWbnbPairAbi)
    this.ketchupBar = new this.web3.eth.Contract(ketchupBarAbi)
    this.ketchupBarOld = new this.web3.eth.Contract(ketchupBarAbi)
    this.pancakeMasterChef = new this.web3.eth.Contract(PancakeMasterChefAbi)
    this.bakeryMasterChef = new this.web3.eth.Contract(PancakeMasterChefAbi)
    
    this.pools = supportedPools.map((pool) =>
      Object.assign(pool, {
        lpAddress: pool.lpAddresses[networkId],
        tokenAddress: pool.tokenAddresses[networkId],
        subTokenAddress1: pool.subTokenAddresses1[networkId],
        subTokenAddress2: pool.subTokenAddresses2[networkId],
        lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
        tokenContract: new this.web3.eth.Contract(ERC20Abi),
        subTokenContract1: new this.web3.eth.Contract(ERC20Abi),
        subTokenContract2: new this.web3.eth.Contract(ERC20Abi),
      }),
    )

    this.vaults = supportedVaults.map((vault) =>
      Object.assign(vault, {
        lpAddress: vault.lpAddresses[networkId],
        vaultAddress: vault.vaultAddresses[networkId],
        strategyAddress: vault.strategyAddresses[networkId],
        lpContract: new this.web3.eth.Contract(PancakePairAbi),
        vaultContract: new this.web3.eth.Contract(VaultsAbi),
      }),
    )

    this.reapers = supportedReapers.map((reaper) =>
      Object.assign(reaper, {
        tokenAddress: reaper.tokenAddresses[networkId],
        reaperAddress: reaper.reaperAddresses[networkId],
        pairAddress: reaper.pairAddresses[networkId],
        tokenContract: new this.web3.eth.Contract(ERC20Abi),
        reaperContract: new this.web3.eth.Contract(ReaperAbi),
        pairContract: new this.web3.eth.Contract(PancakePairAbi),
      }),
    )

    this.vaultsv2 = supportedVaultsv2.map((vault) =>
      Object.assign(vault, {
        lpAddress: vault.lpAddresses[networkId],
        vaultAddress: vault.vaultAddresses[networkId],
        strategyAddress: vault.strategyAddresses[networkId],
        lpContract: new this.web3.eth.Contract(PancakePairAbi),
        vaultContract: new this.web3.eth.Contract(VaultsAbi),
      }),
    )

    this.singleVaults = supportedSingleVaults.map((reaper) =>
      Object.assign(reaper, {
        tokenAddress: reaper.tokenAddresses[networkId],
        reaperAddress: reaper.reaperAddresses[networkId],
        pairAddress: reaper.pairAddresses[networkId],
        tokenContract: new this.web3.eth.Contract(ERC20Abi),
        reaperContract: new this.web3.eth.Contract(ReaperAbi),
        pairContract: new this.web3.eth.Contract(PancakePairAbi),
      }),
    )

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    setProvider(this.fries, contractAddresses.fries[networkId])
    setProvider(this.masterChef, contractAddresses.masterChef[networkId])
    setProvider(this.wbnb, contractAddresses.wbnb[networkId])
    setProvider(this.friesWbnbPair, contractAddresses.friesWbnbPair[networkId])
    setProvider(this.burgerWbnbPair, contractAddresses.burgerWbnbPair[networkId])
    setProvider(this.stableWbnbPair, contractAddresses.stableWbnbPair[networkId])
    setProvider(this.cakeBusdPair, contractAddresses.cakeBusdPair[networkId])
    setProvider(this.filWbnbPair, contractAddresses.filWbnbPair[networkId])
    setProvider(this.sevenupWbnbPair, contractAddresses.sevenupWbnbPair[networkId])
    setProvider(this.ketchupBar, contractAddresses.ketchupBar[networkId])
    setProvider(this.ketchupBarOld, "0xe201a4bdce0871e7d15ff9ec9ffbd6c255359e4f")
    setProvider(this.pancakeMasterChef, contractAddresses.pancakeMasterChef[networkId])
    setProvider(this.bakeryMasterChef, contractAddresses.bakeryMasterChef[networkId])

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress, subTokenContract1, subTokenAddress1, subTokenContract2, subTokenAddress2 }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
        setProvider(subTokenContract1, subTokenAddress1)
        setProvider(subTokenContract2, subTokenAddress2)
      },
    )

    this.vaults.forEach(
      ({ lpContract, lpAddress, vaultContract, vaultAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(vaultContract, vaultAddress)
      },
    )

    this.reapers.forEach(
      ({ tokenContract, tokenAddress,
        reaperContract, reaperAddress,
        pairContract, pairAddress }) => {
        setProvider(tokenContract, tokenAddress)
        setProvider(reaperContract, reaperAddress)
        setProvider(pairContract, pairAddress)
      },
    )

    this.vaultsv2.forEach(
      ({ lpContract, lpAddress, vaultContract, vaultAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(vaultContract, vaultAddress)
      },
    )

    this.singleVaults.forEach(
      ({ tokenContract, tokenAddress,
        reaperContract, reaperAddress,
        pairContract, pairAddress }) => {
        setProvider(tokenContract, tokenAddress)
        setProvider(reaperContract, reaperAddress)
        setProvider(pairContract, pairAddress)
      },
    )
  }

  setDefaultAccount(account) {
    this.fries.options.from = account
    this.masterChef.options.from = account
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          // console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
