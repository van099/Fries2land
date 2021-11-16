import { Contract } from 'web3-eth-contract'

export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  subTokenSymbol1: string
  subTokenSymbol2: string
  subTokenContract1: Contract
  subTokenContract2: Contract
  separator: number
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
