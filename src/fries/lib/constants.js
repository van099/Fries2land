import BigNumber from 'bignumber.js/bignumber'

import iconBUSDBNB from '../../assets/img/busd-bnb.png'
import iconUSDTBUSD from '../../assets/img/usdt-busd.png'
import iconDAIBNB from '../../assets/img/dai-bnb.png'
import iconUSDTBNB from '../../assets/img/usdt-bnb.png'
import iconUSDCBNB from '../../assets/img/usdc-bnb.png'

import iconBTCBBNB from '../../assets/img/btcb-bnb.png'
import iconETHBNB from '../../assets/img/eth-bnb.png'
import iconUNIBNB from '../../assets/img/uni-bnb.png'
import iconFILBNB from '../../assets/img/fil-bnb.png'
import iconDOTBNB from '../../assets/img/dot-bnb.png'
import iconLINKBNB from '../../assets/img/link-bnb.png'

import iconCAKEBNB from '../../assets/img/cake-bnb.png'
import iconCTKBNB from '../../assets/img/ctk-bnb.png'
import iconTWTBNB from '../../assets/img/twt-bnb.png'
import iconINJBNB from '../../assets/img/inj-bnb.png'
import iconALPHABNB from '../../assets/img/alpha-bnb.png'

import iconSXPBNB from '../../assets/img/sxp-bnb.png'
import iconYFIBNB from '../../assets/img/yfi-bnb.png'
import iconYFIIBNB from '../../assets/img/yfii-bnb.png'
import iconXVSBNB from '../../assets/img/xvs-bnb.png'
import iconATOMBNB from '../../assets/img/atom-bnb.png'
import iconBANDBNB from '../../assets/img/band-bnb.png'
import iconXRPBNB from '../../assets/img/xrp-bnb.png'
import iconADABNB from '../../assets/img/ada-bnb.png'

import iconXTZBNB from '../../assets/img/xtz-bnb.png'
import iconEOSBNB from '../../assets/img/eos-bnb.png'
import iconBCHBNB from '../../assets/img/bch-bnb.png'
import iconSTAXCAKE from '../../assets/img/stax-cake.png'

// reaper and single vaults icons

import iconReaperCAKE from '../../assets/img/cake.png'
import iconReaperBake from '../../assets/img/reaper-bake.svg'
import iconWBNB from '../../assets/img/wbnb.png'
import iconFRIES from '../../assets/img/chef.png'

// vault v2 icons
import iconVAIBUSDv2 from '../../assets/img/vai-busdv2.png'
import iconBUSDBNBv2 from '../../assets/img/busd-bnbv2.png'
import iconUSDTBUSDv2 from '../../assets/img/usdt-busdv2.png'
import iconDAIBNBv2 from '../../assets/img/dai-bnbv2.svg'
import iconUSDTBNBv2 from '../../assets/img/usdt-bnbv2.svg'
import iconUSDCBNBv2 from '../../assets/img/usdc-bnbv2.svg'

import iconBTCBBNBv2 from '../../assets/img/btcb-bnbv2.png'
import iconETHBNBv2 from '../../assets/img/eth-bnbv2.png'
import iconUNIBNBv2 from '../../assets/img/uni-bnbv2.png'
import iconFILBNBv2 from '../../assets/img/fil-bnbv2.svg'
import iconDOTBNBv2 from '../../assets/img/dot-bnbv2.svg'
import iconLINKBNBv2 from '../../assets/img/link-bnbv2.svg'

import iconCAKEBNBv2 from '../../assets/img/cake-bnbv2.png'
import iconCTKBNBv2 from '../../assets/img/ctk-bnbv2.svg'
import iconTWTBNBv2 from '../../assets/img/twt-bnbv2.svg'
import iconINJBNBv2 from '../../assets/img/inj-bnbv2.svg'
import iconALPHABNBv2 from '../../assets/img/alpha-bnbv2.svg'

import iconSXPBNBv2 from '../../assets/img/sxp-bnbv2.svg'
import iconYFIBNBv2 from '../../assets/img/yfi-bnbv2.svg'
import iconYFIIBNBv2 from '../../assets/img/yfii-bnbv2.svg'
import iconXVSBNBv2 from '../../assets/img/xvs-bnbv2.svg'
import iconATOMBNBv2 from '../../assets/img/atom-bnbv2.svg'
import iconBANDBNBv2 from '../../assets/img/band-bnbv2.svg'
import iconXRPBNBv2 from '../../assets/img/xrp-bnbv2.svg'
import iconADABNBv2 from '../../assets/img/ada-bnbv2.svg'

import iconXTZBNBv2 from '../../assets/img/xtz-bnbv2.svg'
import iconEOSBNBv2 from '../../assets/img/eos-bnbv2.svg'
import iconBCHBNBv2 from '../../assets/img/bch-bnbv2.svg'
import iconSTAXCAKEv2 from '../../assets/img/stax-cakev2.png'
import iconBLKBNB from '../../assets/img/blk-bnb.svg'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  fries: {
    56: '0x393B312C01048b3ed2720bF1B090084C09e408A1', // prod
    // 56: '0x837c1ca26f7de31afe4e7fff73a93259bf45ca79', // wings
  },
  masterChef: {
    56: '0x066d5544A0b05B19f08E45Dbc13758a3590386C4',
  },
  wbnb: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  friesWbnbPair: {
    56: '0xe4ff29825bffe847aad0bb2b00365ac058bbd91c',
  },
  burgerWbnbPair: {
    56: '0xd937fb9e6e47f3805981453bfb277a49fffe04d7',
  },
  stableWbnbPair: {
    56: '0xa5e6519e1623547b7c6b1ec8f0f4f918bbace5dd',
  },
  cakeBusdPair: {
    56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
  },
  filWbnbPair: {
    56: '0x35fe9787f0ebf2a200bac413d3030cf62d312774',
  },
  sevenupWbnbPair: {
    56: '0x2a728556e0833c4332ec1f9fb99075f49856fbb4',
  },
  ketchupBar: {
    56: '0x15B3d410fCd0d695E1bbe4F717F8E1B6D0Fb2D0C', // prod
    // 56: '0x7a8f1c2112f106774d464b4903cc8507fedbbd97', // hotsauce
  },
  pancakeMasterChef: {
    56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  },
  bakeryMasterChef: {
    56: '0x20eC291bB8459b6145317E7126532CE7EcE5056f',
  }
}

export const referenceAddresses = {
  ketchupHarvester: {
    56: '0x0884300EF166A79235CaCc5c83fE2D9560aec92e',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 FRIES 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 4,
    lpAddresses: {
      56: '0x9f59de5a2a5b28cbee5f9fdc3bb909d5e67cba76',
    },
    tokenAddresses: {
      56: '0x9f59de5a2a5b28cbee5f9fdc3bb909d5e67cba76',
    },
    subTokenSymbol1: 'FRIES',
    subTokenSymbol2: 'BURGER',
    subTokenAddresses1: {
      56: '0x393b312c01048b3ed2720bf1b090084c09e408a1',
    },
    subTokenAddresses2: {
      56: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    },
    name: 'BURGER/FRIES 15X',
    symbol: 'BURGER/FRIES',
    icon: '🍟',
    separator: 0,
  },
  {
    pid: 5,
    lpAddresses: {
      56: '0xe4ff29825bffe847aad0bb2b00365ac058bbd91c',
    },
    tokenAddresses: {
      56: '0xe4ff29825bffe847aad0bb2b00365ac058bbd91c',
    },
    subTokenSymbol1: 'FRIES',
    subTokenSymbol2: 'wBNB',
    subTokenAddresses1: {
      56: '0x393b312c01048b3ed2720bf1b090084c09e408a1',
    },
    subTokenAddresses2: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    name: 'BNB/FRIES LP 14X',
    symbol: 'Pancake BNB-FRIES LP',
    icon: '🏆',
    separator: 0,
  },
  {
    pid: 6,
    lpAddresses: {
      56: '0x03f256a166c6c17951aeCeeD216524DDc1Da8F7B',
    },
    tokenAddresses: {
      56: '0x03f256a166c6c17951aeCeeD216524DDc1Da8F7B',
    },
    subTokenSymbol1: 'FRIES',
    subTokenSymbol2: 'BUSD',
    subTokenAddresses1: {
      56: '0x393b312c01048b3ed2720bf1b090084c09e408a1',
    },
    subTokenAddresses2: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    name: 'BUSD/FRIES LP 13X',
    symbol: 'Pancake BUSD-FRIES LP',
    icon: '💲',
    separator: 0,
  },
  {
    pid: 8,
    lpAddresses: {
      56: '0x15B3d410fCd0d695E1bbe4F717F8E1B6D0Fb2D0C',
    },
    tokenAddresses: {
      56: '0x15B3d410fCd0d695E1bbe4F717F8E1B6D0Fb2D0C',
    },
    subTokenSymbol1: 'FRIES',
    subTokenSymbol2: 'FRIES',
    subTokenAddresses1: {
      56: '0x393b312c01048b3ed2720bf1b090084c09e408a1',
    },
    subTokenAddresses2: {
      56: '0x393b312c01048b3ed2720bf1b090084c09e408a1',
    },
    name: 'KETCHUP 1X',
    symbol: 'KETCHUP',
    icon: '🍅',
    separator: 0,
  },
  {
    pid: 0,
    lpAddresses: {
      56: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
    },
    tokenAddresses: {
      56: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
    },
    subTokenSymbol1: '',
    subTokenSymbol2: '',
    subTokenAddresses1: {
      56: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
    },
    subTokenAddresses2: {
      56: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
    },
    name: 'BURGER 0.1X',
    symbol: 'BURGER',
    icon: '🍔',
    separator: 0,
  },
  {
    pid: 12,
    lpAddresses: {
      56: '0x29f350B3822F51dc29619C583AdBC9628646E315',
    },
    tokenAddresses: {
      56: '0x29f350B3822F51dc29619C583AdBC9628646E315',
    },
    subTokenSymbol1: '7UP',
    subTokenSymbol2: '7UP',
    subTokenAddresses1: {
      56: '0x29f350B3822F51dc29619C583AdBC9628646E315',
    },
    subTokenAddresses2: {
      56: '0x29f350B3822F51dc29619C583AdBC9628646E315',
    },
    name: '7UP 0.1X',
    symbol: '7UP',
    icon: '🥤',
    separator: 0,
  },
  //==================Single Coin Vaults=======================
  {
    pid: 26,
    lpAddresses: {
      56: '0x79cD0E1a3F52D14efD930479EF86787CD4a1d846',
    },
    tokenAddresses: {
      56: '0x79cD0E1a3F52D14efD930479EF86787CD4a1d846',
    },
    subTokenSymbol1: 'fryCake',
    subTokenSymbol2: 'fryCake',
    subTokenAddresses1: {
      56: '0x79cD0E1a3F52D14efD930479EF86787CD4a1d846',
    },
    subTokenAddresses2: {
      56: '0x79cD0E1a3F52D14efD930479EF86787CD4a1d846',
    },
    name: 'fryCake 0.5X',
    symbol: 'fryCake',
    icon: '🥞',
    separator: 6,
  },
  {
    pid: 27,
    lpAddresses: {
      56: '0xe4E2769eE3bE4f0bD98449Ac89274A11e187581e',
    },
    tokenAddresses: {
      56: '0xe4E2769eE3bE4f0bD98449Ac89274A11e187581e',
    },
    subTokenSymbol1: 'fryBake',
    subTokenSymbol2: 'fryBake',
    subTokenAddresses1: {
      56: '0xe4E2769eE3bE4f0bD98449Ac89274A11e187581e',
    },
    subTokenAddresses2: {
      56: '0xe4E2769eE3bE4f0bD98449Ac89274A11e187581e',
    },
    name: 'fryBake 0.1X',
    symbol: 'fryBake',
    icon: '🥞',
    separator: 0,
  },
  //====================CakeLP v2==============================
  {
    pid: 18,
    lpAddresses: {
      56: '0xe924cE375f9100E7657911BC09ffB7581396E7E3',
    },
    tokenAddresses: {
      56: '0xe924cE375f9100E7657911BC09ffB7581396E7E3',
    },
    subTokenSymbol1: 'fryVAI-BUSDv2',
    subTokenSymbol2: 'fryVAI-BUSDv2',
    subTokenAddresses1: {
      56: '0xe924cE375f9100E7657911BC09ffB7581396E7E3',
    },
    subTokenAddresses2: {
      56: '0xe924cE375f9100E7657911BC09ffB7581396E7E3',
    },
    name: 'fryVAI-BUSD LP 2X',
    symbol: 'fryVAI-BUSDv2',
    icon: '🥞',
    separator: 4,
  },
  {
    pid: 19,
    lpAddresses: {
      56: '0x666e727faB81bfC270AF516dB5d1154Ae7414D69',
    },
    tokenAddresses: {
      56: '0x666e727faB81bfC270AF516dB5d1154Ae7414D69',
    },
    subTokenSymbol1: 'fryBUSD-BNBv2',
    subTokenSymbol2: 'fryBUSD-BNBv2',
    subTokenAddresses1: {
      56: '0x666e727faB81bfC270AF516dB5d1154Ae7414D69',
    },
    subTokenAddresses2: {
      56: '0x666e727faB81bfC270AF516dB5d1154Ae7414D69',
    },
    name: 'fryBUSD-BNB LP 3X',
    symbol: 'fryBUSD-BNB LPv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 20,
    lpAddresses: {
      56: '0x41e8a14C4383aA96D4ADbFafFf5fE86CA6A9dD8a',
    },
    tokenAddresses: {
      56: '0x41e8a14C4383aA96D4ADbFafFf5fE86CA6A9dD8a',
    },
    subTokenSymbol1: 'fryUSDT-BUSDv2',
    subTokenSymbol2: 'fryUSDT-BUSDv2',
    subTokenAddresses1: {
      56: '0x41e8a14C4383aA96D4ADbFafFf5fE86CA6A9dD8a',
    },
    subTokenAddresses2: {
      56: '0x41e8a14C4383aA96D4ADbFafFf5fE86CA6A9dD8a',
    },
    name: 'fryUSDT-BUSD LP 1X',
    symbol: 'fryUSDT-BUSDv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 21,
    lpAddresses: {
      56: '0xE7513C22278e948494d90Fb912aabA03fad1927c',
    },
    tokenAddresses: {
      56: '0xE7513C22278e948494d90Fb912aabA03fad1927c',
    },
    subTokenSymbol1: 'fryBTCB-BNBv2',
    subTokenSymbol2: 'fryBTCB-BNBv2',
    subTokenAddresses1: {
      56: '0xE7513C22278e948494d90Fb912aabA03fad1927c',
    },
    subTokenAddresses2: {
      56: '0xE7513C22278e948494d90Fb912aabA03fad1927c',
    },
    name: 'fryBTCB-BNB LP 3X',
    symbol: 'fryBTCB-BNB LPv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 22,
    lpAddresses: {
      56: '0x3ef69e18F1c7D4756920a818cc62D05d11430C02',
    },
    tokenAddresses: {
      56: '0x3ef69e18F1c7D4756920a818cc62D05d11430C02',
    },
    subTokenSymbol1: 'fryETH-BNBv2',
    subTokenSymbol2: 'fryETH-BNBv2',
    subTokenAddresses1: {
      56: '0x3ef69e18F1c7D4756920a818cc62D05d11430C02',
    },
    subTokenAddresses2: {
      56: '0x3ef69e18F1c7D4756920a818cc62D05d11430C02',
    },
    name: 'fryETH-BNB LP 1X',
    symbol: 'fryETH-BNB LPv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 23,
    lpAddresses: {
      56: '0x2023bcC3e5767Fd051FD7e45171B35265518dd88',
    },
    tokenAddresses: {
      56: '0x2023bcC3e5767Fd051FD7e45171B35265518dd88',
    },
    subTokenSymbol1: 'fryCAKE-BNBv2',
    subTokenSymbol2: 'fryCAKE-BNBv2',
    subTokenAddresses1: {
      56: '0x2023bcC3e5767Fd051FD7e45171B35265518dd88',
    },
    subTokenAddresses2: {
      56: '0x2023bcC3e5767Fd051FD7e45171B35265518dd88',
    },
    name: 'fryCAKE-BNB LP 1X',
    symbol: 'fryCAKE-BNB LPv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 25,
    lpAddresses: {
      56: '0xdBd808EE79BeA0823ea8871051Ec344cD782e94E',
    },
    tokenAddresses: {
      56: '0xdBd808EE79BeA0823ea8871051Ec344cD782e94E',
    },
    subTokenSymbol1: 'fryUNI-BNBv2',
    subTokenSymbol2: 'fryUNI-BNBv2',
    subTokenAddresses1: {
      56: '0xdBd808EE79BeA0823ea8871051Ec344cD782e94E',
    },
    subTokenAddresses2: {
      56: '0xdBd808EE79BeA0823ea8871051Ec344cD782e94E',
    },
    name: 'fryUNI-BNB LP 0.5X',
    symbol: 'fryUNI-BNB LPv2',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 24,
    lpAddresses: {
      56: '0x64b0CD0F304fF4ef0a8d896618131cfa84512268',
    },
    tokenAddresses: {
      56: '0x64b0CD0F304fF4ef0a8d896618131cfa84512268',
    },
    subTokenSymbol1: 'frySTAX-CAKE LPv2',
    subTokenSymbol2: 'frySTAX-CAKE LPv2',
    subTokenAddresses1: {
      56: '0x64b0CD0F304fF4ef0a8d896618131cfa84512268',
    },
    subTokenAddresses2: {
      56: '0x64b0CD0F304fF4ef0a8d896618131cfa84512268',
    },
    name: 'frySTAX-CAKE LP 0.1X',
    symbol: 'frySTAX-CAKE LPv2',
    icon: '🥞',
    separator: 0,
  },  
  //=========================Expired==========================
  {
    pid: 1,
    lpAddresses: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    tokenAddresses: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    subTokenSymbol1: '',
    subTokenSymbol2: '',
    subTokenAddresses1: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    subTokenAddresses2: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    name: 'Salty BUSD 0X',
    symbol: 'BUSD',
    icon: '🧂',
    separator: 5,
  },
  {
    pid: 2,
    lpAddresses: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    tokenAddresses: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    subTokenSymbol1: '',
    subTokenSymbol2: '',
    subTokenAddresses1: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    subTokenAddresses2: {
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    name: 'HOT wBNB 0X',
    symbol: 'wBNB',
    icon: '🌶️',
    separator: 0,
  },
  {
    pid: 9,
    lpAddresses: {
      56: '0x76c73B5D8DDe3C21790a4f077AdD19e0a78Be85E',
    },
    tokenAddresses: {
      56: '0x76c73B5D8DDe3C21790a4f077AdD19e0a78Be85E',
    },
    subTokenSymbol1: 'fryBUSD-BNB',
    subTokenSymbol2: 'fryBUSD-BNB',
    subTokenAddresses1: {
      56: '0x76c73B5D8DDe3C21790a4f077AdD19e0a78Be85E',
    },
    subTokenAddresses2: {
      56: '0x76c73B5D8DDe3C21790a4f077AdD19e0a78Be85E',
    },
    name: 'fryBUSD-BNB LP 0X',
    symbol: 'fryBUSD-BNB LP',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 10,
    lpAddresses: {
      56: '0xfB9c87aD6f5eCBe7Ae4Ef2B9bb5A56507583E784',
    },
    tokenAddresses: {
      56: '0xfB9c87aD6f5eCBe7Ae4Ef2B9bb5A56507583E784',
    },
    subTokenSymbol1: 'fryUSDT-BUSD',
    subTokenSymbol2: 'fryUSDT-BUSD',
    subTokenAddresses1: {
      56: '0xfB9c87aD6f5eCBe7Ae4Ef2B9bb5A56507583E784',
    },
    subTokenAddresses2: {
      56: '0xfB9c87aD6f5eCBe7Ae4Ef2B9bb5A56507583E784',
    },
    name: 'fryUSDT-BUSD LP 0X',
    symbol: 'fryUSDT-BUSD',
    icon: '🥞',
    separator: 0,
  },
  // {
  //   pid: 13,
  //   lpAddresses: {
  //     56: '0xc37076B98428F5bCc807a1822048d9e96bEAD382',
  //   },
  //   tokenAddresses: {
  //     56: '0xc37076B98428F5bCc807a1822048d9e96bEAD382',
  //   },
  //   subTokenSymbol1: 'fryBTCB-BNB',
  //   subTokenSymbol2: 'fryBTCB-BNB',
  //   subTokenAddresses1: {
  //     56: '0xc37076B98428F5bCc807a1822048d9e96bEAD382',
  //   },
  //   subTokenAddresses2: {
  //     56: '0xc37076B98428F5bCc807a1822048d9e96bEAD382',
  //   },
  //   name: 'fryBTCB-BNB LP 0X',
  //   symbol: 'fryBTCB-BNB LP',
  //   icon: '🥞',
  //   separator: 0,
  // },
  // {
  //   pid: 16,
  //   lpAddresses: {
  //     56: '0xb82Deec7256EC747243Ca315A3D8D332dbFD9815',
  //   },
  //   tokenAddresses: {
  //     56: '0xb82Deec7256EC747243Ca315A3D8D332dbFD9815',
  //   },
  //   subTokenSymbol1: 'fryETH-BNB',
  //   subTokenSymbol2: 'fryETH-BNB',
  //   subTokenAddresses1: {
  //     56: '0xb82Deec7256EC747243Ca315A3D8D332dbFD9815',
  //   },
  //   subTokenAddresses2: {
  //     56: '0xb82Deec7256EC747243Ca315A3D8D332dbFD9815',
  //   },
  //   name: 'fryETH-BNB LP 0X',
  //   symbol: 'fryETH-BNB LP',
  //   icon: '🥞',
  //   separator: 0,
  // },
  {
    pid: 11,
    lpAddresses: {
      56: '0x40dfd29049272C4FD8021d16feAE0c2cbd4b4b03',
    },
    tokenAddresses: {
      56: '0x40dfd29049272C4FD8021d16feAE0c2cbd4b4b03',
    },
    subTokenSymbol1: 'fryCAKE-BNB',
    subTokenSymbol2: 'fryCAKE-BNB',
    subTokenAddresses1: {
      56: '0x40dfd29049272C4FD8021d16feAE0c2cbd4b4b03',
    },
    subTokenAddresses2: {
      56: '0x40dfd29049272C4FD8021d16feAE0c2cbd4b4b03',
    },
    name: 'fryCAKE-BNB LP 0X',
    symbol: 'fryCAKE-BNB LP',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 15,
    lpAddresses: {
      56: '0x207A0b3Dd7871b1fB29698AED38391114837225B',
    },
    tokenAddresses: {
      56: '0x207A0b3Dd7871b1fB29698AED38391114837225B',
    },
    subTokenSymbol1: 'frySTAX-CAKE LP',
    subTokenSymbol2: 'frySTAX-CAKE LP',
    subTokenAddresses1: {
      56: '0x207A0b3Dd7871b1fB29698AED38391114837225B',
    },
    subTokenAddresses2: {
      56: '0x207A0b3Dd7871b1fB29698AED38391114837225B',
    },
    name: 'frySTAX-CAKE LP 0X',
    symbol: 'frySTAX-CAKE LP',
    icon: '🥞',
    separator: 0,
  },
  {
    pid: 17,
    lpAddresses: {
      56: '0x673b20511d57Fa19c1C9Fc9Dc69eCA3457842C71',
    },
    tokenAddresses: {
      56: '0x673b20511d57Fa19c1C9Fc9Dc69eCA3457842C71',
    },
    subTokenSymbol1: 'fryUNI-BNB',
    subTokenSymbol2: 'fryUNI-BNB',
    subTokenAddresses1: {
      56: '0x673b20511d57Fa19c1C9Fc9Dc69eCA3457842C71',
    },
    subTokenAddresses2: {
      56: '0x673b20511d57Fa19c1C9Fc9Dc69eCA3457842C71',
    },
    name: 'fryUNI-BNB LP 0X',
    symbol: 'fryUNI-BNB LP',
    icon: '🥞',
    separator: 0,
  },
]

export const supportedVaults = [
  {
    pid: 2,
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    vaultAddresses: {
      56: '0x76c73B5D8DDe3C21790a4f077AdD19e0a78Be85E',
    },
    strategyAddresses: {
      56: '0x753ecbf8ca86d89db91a1ed9e1f34221182dc986',
    },
    symbol0: 'BNB',
    symbol1: 'BUSD',
    title: 'BUSD-BNB LP',
    lpSymbol: 'BUSD-BNB LP',
    tokenSymbol: 'fryBUSD-BNB',
    portion: 10,
    enabled: 1,
    pooledOrder: true,
    logo: iconBUSDBNB,
  },
  {
    pid: 11,
    lpAddresses: {
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
    },
    vaultAddresses: {
      56: '0xfB9c87aD6f5eCBe7Ae4Ef2B9bb5A56507583E784',
    },
    strategyAddresses: {
      56: '0x8f871473c45bd1c04a0720cd90150c2990e42da4',
    },
    symbol0: 'USDT',
    symbol1: 'BUSD',
    title: 'USDT-BUSD LP',
    lpSymbol: 'USDT-BUSD LP',
    tokenSymbol: 'fryUSDT-BUSD',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconUSDTBUSD,
  },
  // {
  //   pid: 15,
  //   lpAddresses: {
  //     56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
  //   },
  //   vaultAddresses: {
  //     56: '0xc37076B98428F5bCc807a1822048d9e96bEAD382',
  //   },
  //   strategyAddresses: {
  //     56: '0x7F5A164B654d825cCe9ba26af1010FC07e161C1F',
  //   },
  //   symbol0: 'BTCB',
  //   symbol1: 'BNB',
  //   title: 'BTCB-BNB LP',
  //   lpSymbol: 'BTCB-BNB LP',
  //   tokenSymbol: 'fryBTCB-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconBTCBBNB,
  // },
  // {
  //   pid: 14,
  //   lpAddresses: {
  //     56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
  //   },
  //   vaultAddresses: {
  //     56: '0xb82Deec7256EC747243Ca315A3D8D332dbFD9815',
  //   },
  //   strategyAddresses: {
  //     56: '0xd36084C2DBf420F69553D83cB4898Aa9fAb2A4cE',
  //   },
  //   symbol0: 'ETH',
  //   symbol1: 'BNB',
  //   title: 'ETH-BNB LP',
  //   lpSymbol: 'ETH-BNB LP',
  //   tokenSymbol: 'fryETH-BNB',
  //   portion: 1.125,
  //   enabled: 0,
  //   pooledOrder: true,
  //   logo: iconETHBNB,
  // },
  {
    pid: 1,
    lpAddresses: {
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    vaultAddresses: {
      56: '0x40dfd29049272C4FD8021d16feAE0c2cbd4b4b03',
    },
    strategyAddresses: {
      56: '0x91F8F6afebE9bdb3680D7cc68b7ED6d732517D9f',
    },
    symbol0: 'CAKE',
    symbol1: 'BNB',
    title: 'CAKE-BNB LP',
    lpSymbol: 'CAKE-BNB LP',
    tokenSymbol: 'fryCAKE-BNB',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconCAKEBNB,
  },
  {
    pid: 34,
    lpAddresses: {
      56: '0x7cd05f8b960ba071fdf69c750c0e5a57c8366500',
    },
    vaultAddresses: {
      56: '0x207A0b3Dd7871b1fB29698AED38391114837225B',
    },
    strategyAddresses: {
      56: '0x1920e293F36F199DDaa77dA0aeEf60d778a427f4',
    },
    symbol0: 'STAX',
    symbol1: 'CAKE',
    title: 'STAX-CAKE LP',
    lpSymbol: 'STAX-CAKE LP',
    tokenSymbol: 'frySTAX-CAKE',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconSTAXCAKE,
  },
  // {
  //   pid: 25,
  //   lpAddresses: {
  //     56: '0x4269e7f43a63cea1ad7707be565a94a9189967e9',
  //   },
  //   vaultAddresses: {
  //     56: '0x673b20511d57Fa19c1C9Fc9Dc69eCA3457842C71',
  //   },
  //   strategyAddresses: {
  //     56: '0x4DA81E2EE2FEAE1f4e10898CD6c682979654e928',
  //   },
  //   symbol0: 'BNB',
  //   symbol1: 'UNI',
  //   title: 'UNI-BNB LP',
  //   lpSymbol: 'UNI-BNB LP',
  //   tokenSymbol: 'fryUNI-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: false,
  //   logo: iconUNIBNB,
  // },
  // {
  //   pid: 30,
  //   lpAddresses: {
  //     56: '0x752E713fB70E3FA1Ac08bCF34485F14A986956c4',
  //   },
  //   vaultAddresses: {
  //     56: '0x7e69156f1bE6A5B1995A8c3AAaf7d8e1101235B8',
  //   },
  //   strategyAddresses: {
  //     56: '0x16A0a07187Cb5BC32eA907eaa1F48D7b5422d30F',
  //   },
  //   symbol0: 'SXP',
  //   symbol1: 'BNB',
  //   title: 'SXP-BNB LP',
  //   lpSymbol: 'SXP-BNB LP',
  //   tokenSymbol: 'frySXP-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconSXPBNB,
  // },
  // {
  //   pid: 18,
  //   lpAddresses: {
  //     56: '0xC7b4B32A3be2cB6572a1c9959401F832Ce47a6d2',
  //   },
  //   vaultAddresses: {
  //     56: '0xe59375612FeF731a26B40843304E71e16B465A6A',
  //   },
  //   strategyAddresses: {
  //     56: '0x42872fC89A6d2FbdB6bce72EADFFfbDd407891c1',
  //   },
  //   symbol0: 'XRP',
  //   symbol1: 'BNB',
  //   title: 'XRP-BNB LP',
  //   lpSymbol: 'XRP-BNB LP',
  //   tokenSymbol: 'fryXRP-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconXRPBNB,
  // },
  // {
  //   pid: 26,
  //   lpAddresses: {
  //     56: '0x35fe9787f0ebf2a200bac413d3030cf62d312774',
  //   },
  //   vaultAddresses: {
  //     56: '0xe63bac743186Ba2A4CD6FAef333bd0864aa71278',
  //   },
  //   strategyAddresses: {
  //     56: '0x49ba944c1808b00bab7daf3c944ab56f3a7fc50a',
  //   },
  //   symbol0: 'FIL',
  //   symbol1: 'BNB',
  //   title: 'FIL-BNB LP',
  //   lpSymbol: 'FIL-BNB LP',
  //   tokenSymbol: 'fryFIL-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconFILBNB,
  // },
  {
    pid: 12,
    lpAddresses: {
      56: '0x610e7a287c27dffcac0f0a94f547cc1b770cf483',
    },
    vaultAddresses: {
      56: '0x6b1776A27893f0a7Ac10B8Ec0A65f03e77075d36',
    },
    strategyAddresses: {
      56: '0xDb8194DAe292FCe67ed99CAD4167E282376293AD',
    },
    symbol0: 'TWT',
    symbol1: 'BNB',
    title: 'TWT-BNB LP',
    lpSymbol: 'TWT-BNB LP',
    tokenSymbol: 'fryTWT-BNB',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconTWTBNB,
  },
  // {
  //   pid: 27,
  //   lpAddresses: {
  //     56: '0x7a34bd64d18e44CfdE3ef4B81b87BAf3EB3315B6',
  //   },
  //   vaultAddresses: {
  //     56: '0x96daB0d3B12Ff3024C6B525F27A48CAfc1baBFaA',
  //   },
  //   strategyAddresses: {
  //     56: '0xdc2273CdbEF5Ce8d90a6e349d8Fee481cC01a803',
  //   },
  //   symbol0: 'INJ',
  //   symbol1: 'BNB',
  //   title: 'INJ-BNB LP',
  //   lpSymbol: 'INJ-BNB LP',
  //   tokenSymbol: 'fryINJ-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconINJBNB,
  // },
  // {
  //   pid: 16,
  //   lpAddresses: {
  //     56: '0x4e0f3385d932f7179dee045369286ffa6b03d887',
  //   },
  //   vaultAddresses: {
  //     56: '0x6E4dFA42c73eBcEFFF62C78D587F470E190B444b',
  //   },
  //   strategyAddresses: {
  //     56: '0x32A3fDc738f1F89E2ada2E75ee5Ed8a5645E7a52',
  //   },
  //   symbol0: 'ALPHA',
  //   symbol1: 'BNB',
  //   title: 'ALPHA-BNB LP',
  //   lpSymbol: 'ALPHA-BNB LP',
  //   tokenSymbol: 'fryALPHA-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconALPHABNB,
  // },
  // {
  //   pid: 23,
  //   lpAddresses: {
  //     56: '0x54EdD846dB17f43b6e43296134ECD96284671E81',
  //   },
  //   vaultAddresses: {
  //     56: '0x23A74eAA918a96FA2E9741e05c45eC8FDe1a0a7E',
  //   },
  //   strategyAddresses: {
  //     56: '0xED6646a065294A973a3ECbDE5C9876958Cb973F6',
  //   },
  //   symbol0: 'BCH',
  //   symbol1: 'BNB',
  //   title: 'BCH-BNB LP',
  //   lpSymbol: 'BCH-BNB LP',
  //   tokenSymbol: 'fryBCH-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconBCHBNB,
  // },
  // {
  //   pid: 17,
  //   lpAddresses: {
  //     56: '0x20bcc3b8a0091ddac2d0bc30f68e6cbb97de59cd',
  //   },
  //   vaultAddresses: {
  //     56: '0x0ED90E411C63770a1F8e1Fa90e57cB3b3F8fB06D',
  //   },
  //   strategyAddresses: {
  //     56: '0x3c7995432be9e9c6e11d968096f0cbfe4e8eaa43',
  //   },
  //   symbol0: 'USDT',
  //   symbol1: 'BNB',
  //   title: 'USDT-BNB LP',
  //   lpSymbol: 'USDT-BNB LP',
  //   tokenSymbol: 'fryUSDT-BNB',
  //   portion: 2.25,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconUSDTBNB,
  // },
  // {
  //   pid: 13,
  //   lpAddresses: {
  //     56: '0x41182c32F854dd97bA0e0B1816022e0aCB2fc0bb',
  //   },
  //   vaultAddresses: {
  //     56: '0xE679ebCc5E1ca3beAAF1eFEB154edC75364c5312',
  //   },
  //   strategyAddresses: {
  //     56: '0xF154e0D66643C2dE01753118463A134b8844bBE5',
  //   },
  //   symbol0: 'BNB',
  //   symbol1: 'XVS',
  //   title: 'XVS-BNB LP',
  //   lpSymbol: 'XVS-BNB LP',
  //   tokenSymbol: 'fryXVS-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: false,
  //   logo: iconXVSBNB,
  // },
  // {
  //   pid: 3,
  //   lpAddresses: {
  //     56: '0xBA51D1AB95756ca4eaB8737eCD450cd8F05384cF',
  //   },
  //   vaultAddresses: {
  //     56: '0x486729C47864d3B61Cb241E34f3544B2C3a14230',
  //   },
  //   strategyAddresses: {
  //     56: '0xfFB8844D092ffB8e26FB3b1346AD610042Afc184',
  //   },
  //   symbol0: 'ADA',
  //   symbol1: 'BNB',
  //   title: 'ADA-BNB LP',
  //   lpSymbol: 'ADA-BNB LP',
  //   tokenSymbol: 'fryADA-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconADABNB,
  // },
  // {
  //   pid: 32,
  //   lpAddresses: {
  //     56: '0x7793870484647a7278907498ec504879d6971eab',
  //   },
  //   vaultAddresses: {
  //     56: '0x66947b2532Fb91E08826e568e6bA5Dc61980243b',
  //   },
  //   strategyAddresses: {
  //     56: '0xeF1d88485A2Cd7ad443a9ac66fD540FBeB55aaB4',
  //   },
  //   symbol0: 'CTK',
  //   symbol1: 'BNB',
  //   title: 'CTK-BNB LP',
  //   lpSymbol: 'CTK-BNB LP',
  //   tokenSymbol: 'fryCTK-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconCTKBNB,
  // },
  // {
  //   pid: 21,
  //   lpAddresses: {
  //     56: '0x56c77d59e82f33c712f919d09fceddf49660a829',
  //   },
  //   vaultAddresses: {
  //     56: '0xC7C4778301dD51Fd659B26327D3E434f383DFBaa',
  //   },
  //   strategyAddresses: {
  //     56: '0xb737ad161523e188286b1ff83e4a2457b12665a6',
  //   },
  //   symbol0: 'DAI',
  //   symbol1: 'BNB',
  //   title: 'DAI-BNB LP',
  //   lpSymbol: 'DAI-BNB LP',
  //   tokenSymbol: 'fryDAI-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconDAIBNB,
  // },
  // {
  //   pid: 5,
  //   lpAddresses: {
  //     56: '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c',
  //   },
  //   vaultAddresses: {
  //     56: '0xdB9A75Eed18D2c4C43B059127fC183A5E97f3468',
  //   },
  //   strategyAddresses: {
  //     56: '0x2850f677a97a5722A30Ed1CD8d721Ccd736CF89a',
  //   },
  //   symbol0: 'DOT',
  //   symbol1: 'BNB',
  //   title: 'DOT-BNB LP',
  //   lpSymbol: 'DOT-BNB LP',
  //   tokenSymbol: 'fryDOT-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconDOTBNB,
  // },
  // {
  //   pid: 29,
  //   lpAddresses: {
  //     56: '0x30479874f9320a62bce3bc0e315c920e1d73e278',
  //   },
  //   vaultAddresses: {
  //     56: '0x36B3b83DaaF58A6A5F6aEBb9367b58ad771022bB',
  //   },
  //   strategyAddresses: {
  //     56: '0x4fc1d4a1a60b1e96b1f0c7d907e3de57c0e0af8c',
  //   },
  //   symbol0: 'USDC',
  //   symbol1: 'BNB',
  //   title: 'USDC-BNB LP',
  //   lpSymbol: 'USDC-BNB LP',
  //   tokenSymbol: 'fryUSDC-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconUSDCBNB,
  // },
  // {
  //   pid: 20,
  //   lpAddresses: {
  //     56: '0x574a978c2D0d36D707a05E459466C7A1054F1210',
  //   },
  //   vaultAddresses: {
  //     56: '0x673791e4cCe05804c538137B78e0716b9098F773',
  //   },
  //   strategyAddresses: {
  //     56: '0x65F6a21f7fE27BCD4732A75edaCA2DFCEF82C1ff',
  //   },
  //   symbol0: 'YFII',
  //   symbol1: 'BNB',
  //   title: 'YFII-BNB LP',
  //   lpSymbol: 'YFII-BNB LP',
  //   tokenSymbol: 'fryYFII-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconYFIIBNB,
  // },
  // {
  //   pid: 24,
  //   lpAddresses: {
  //     56: '0x68Ff2ca47D27db5Ac0b5c46587645835dD51D3C1',
  //   },
  //   vaultAddresses: {
  //     56: '0x11f7E79333B61Ba6Eed820fE4410FFd6cD7F0B31',
  //   },
  //   strategyAddresses: {
  //     56: '0x55B8219487610915ce5ADb82082b621300e06358',
  //   },
  //   symbol0: 'YFI',
  //   symbol1: 'BNB',
  //   title: 'YFI-BNB LP',
  //   lpSymbol: 'YFI-BNB LP',
  //   tokenSymbol: 'fryYFI-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconYFIBNB,
  // },
  // {
  //   pid: 19,
  //   lpAddresses: {
  //     56: '0x2333c77FC0B2875c11409cdCD3C75D42D402E834',
  //   },
  //   vaultAddresses: {
  //     56: '0x089a3052DBef7Ec750EBc5cCac139f33dE35ff99',
  //   },
  //   strategyAddresses: {
  //     56: '0x7670eE967377c541B02d0B6A8F915721663ae416',
  //   },
  //   symbol0: 'ATOM',
  //   symbol1: 'BNB',
  //   title: 'ATOM-BNB LP',
  //   lpSymbol: 'ATOM-BNB LP',
  //   tokenSymbol: 'fryATOM-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconATOMBNB,
  // },
  // {
  //   pid: 4,
  //   lpAddresses: {
  //     56: '0xc639187ef82271D8f517de6FEAE4FaF5b517533c',
  //   },
  //   vaultAddresses: {
  //     56: '0x514e59A2c906664035870c6DBA0a4d5E9988a42D',
  //   },
  //   strategyAddresses: {
  //     56: '0x4C13D9E67b2E0e8f490b706578233f76FCC729eA',
  //   },
  //   symbol0: 'BAND',
  //   symbol1: 'BNB',
  //   title: 'BAND-BNB LP',
  //   lpSymbol: 'BAND-BNB LP',
  //   tokenSymbol: 'fryBAND-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconBANDBNB,
  // },
  // {
  //   pid: 7,
  //   lpAddresses: {
  //     56: '0xaeBE45E3a03B734c68e5557AE04BFC76917B4686',
  //   },
  //   vaultAddresses: {
  //     56: '0xCFcCBEdE079876bb520B4407Ea6A9DEf1C3b457C',
  //   },
  //   strategyAddresses: {
  //     56: '0xdFffF7254d098929E4012ebbE2eFaEd3A448D672',
  //   },
  //   symbol0: 'BNB',
  //   symbol1: 'LINK',
  //   title: 'LINK-BNB LP',
  //   lpSymbol: 'LINK-BNB LP',
  //   tokenSymbol: 'fryLINK-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: false,
  //   logo: iconLINKBNB,
  // },
  // {
  //   pid: 22,
  //   lpAddresses: {
  //     56: '0x5acaC332F0F49c8bAdC7aFd0134aD19D3DB972e6',
  //   },
  //   vaultAddresses: {
  //     56: '0x4e3a9b72945FA3C89EA49a20ba94162721177420',
  //   },
  //   strategyAddresses: {
  //     56: '0x12cCd045854475c8E42a88b43e80AC96a295Ed78',
  //   },
  //   symbol0: 'XTZ',
  //   symbol1: 'BNB',
  //   title: 'XTZ-BNB LP',
  //   lpSymbol: 'XTZ-BNB LP',
  //   tokenSymbol: 'fryXTZ-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconXTZBNB,
  // },
  // {
  //   pid: 6,
  //   lpAddresses: {
  //     56: '0x981d2Ba1b298888408d342C39c2Ab92e8991691e',
  //   },
  //   vaultAddresses: {
  //     56: '0xE321f3D9d35e59bae8BB4E2e1C7C3778a25BA20f',
  //   },
  //   strategyAddresses: {
  //     56: '0x9A0E38F7fA65c1CDA20521286014e1D3303432d1',
  //   },
  //   symbol0: 'EOS',
  //   symbol1: 'BNB',
  //   title: 'EOS-BNB LP',
  //   lpSymbol: 'EOS-BNB LP',
  //   tokenSymbol: 'fryEOS-BNB',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconEOSBNB,
  // },
]

export const supportedReapers = [
  {
    pid: 0,
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    reaperAddresses: {
      56: '0xB3cBabD624D66F73dfdc3C78A5e4e8033937a422',
    },
    pairAddresses: {
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    reaperSymbol: 'fryReaperCAKE',
    title: 'CAKE',
    enabled: 1,
    pooledOrder: true,
    logo: iconReaperCAKE,
  },
  // {
  //   pid: 1,
  //   tokenAddresses: {
  //     56: '0xe02df9e3e622debdd69fb838bb799e3f168902c5',
  //   },
  //   reaperAddresses: {
  //     56: '0xC7EAcEB0A5d23F7D60F9b7715aF2Ebcd5C855EE1',
  //   },
  //   pairAddresses: {
  //     56: '0xc2eed0f5a0dc28cfa895084bc0a9b8b8279ae492',
  //   },
  //   tokenSymbol: 'BAKE',
  //   reaperSymbol: 'fryReaperBAKE',
  //   title: 'BAKE',
  //   enabled: 1,
  //   pooledOrder: false,
  //   logo: iconReaperBake,
  // },
]

// portions is not used
export const supportedVaultsv2 = [
  {
    pid: 41,
    lpAddresses: {
      56: '0xfF17ff314925Dff772b71AbdFF2782bC913B3575',
    },
    vaultAddresses: {
      56: '0xe924cE375f9100E7657911BC09ffB7581396E7E3',
    },
    strategyAddresses: {
      56: '0xF2BfBA41B99E383fa79107261C930F97b2E8B9AF',
    },
    symbol0: 'VAI',
    symbol1: 'BUSD',
    title: 'VAI-BUSD LP',
    lpSymbol: 'VAI-BUSD LP',
    tokenSymbol: 'fryVAI-BUSDv2',
    portion: 10,
    enabled: 1,
    pooledOrder: true,
    logo: iconVAIBUSDv2,
  },
  {
    pid: 2,
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    vaultAddresses: {
      56: '0x666e727faB81bfC270AF516dB5d1154Ae7414D69',
    },
    strategyAddresses: {
      56: '0x4155bD8D5776b6D7cf87E938A97A27CD924AcaE1',
    },
    symbol0: 'BNB',
    symbol1: 'BUSD',
    title: 'BUSD-BNB LP',
    lpSymbol: 'BUSD-BNB LP',
    tokenSymbol: 'fryBUSD-BNBv2',
    portion: 10,
    enabled: 1,
    pooledOrder: true,
    logo: iconBUSDBNBv2,
  },
  {
    pid: 11,
    lpAddresses: {
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
    },
    vaultAddresses: {
      56: '0x41e8a14C4383aA96D4ADbFafFf5fE86CA6A9dD8a',
    },
    strategyAddresses: {
      56: '0xb158E4BE0358de7Ac9d41d5dB94dC9D550B072C2',
    },
    symbol0: 'USDT',
    symbol1: 'BUSD',
    title: 'USDT-BUSD LP',
    lpSymbol: 'USDT-BUSD LP',
    tokenSymbol: 'fryUSDT-BUSDv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconUSDTBUSDv2,
  },
  {
    pid: 15,
    lpAddresses: {
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    vaultAddresses: {
      56: '0xE7513C22278e948494d90Fb912aabA03fad1927c',
    },
    strategyAddresses: {
      56: '0xce316D46397E661Cc30e664C4C4961EE7ba09d28',
    },
    symbol0: 'BTCB',
    symbol1: 'BNB',
    title: 'BTCB-BNB LP',
    lpSymbol: 'BTCB-BNB LP',
    tokenSymbol: 'fryBTCB-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconBTCBBNBv2,
  },
  {
    pid: 14,
    lpAddresses: {
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    vaultAddresses: {
      56: '0x3ef69e18F1c7D4756920a818cc62D05d11430C02',
    },
    strategyAddresses: {
      56: '0xa967b51d2F4Dab9dd5aFbEbF08Fe4C7046a643E4',
    },
    symbol0: 'ETH',
    symbol1: 'BNB',
    title: 'ETH-BNB LP',
    lpSymbol: 'ETH-BNB LP',
    tokenSymbol: 'fryETH-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconETHBNBv2,
  },
  {
    pid: 1,
    lpAddresses: {
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    vaultAddresses: {
      56: '0x2023bcC3e5767Fd051FD7e45171B35265518dd88',
    },
    strategyAddresses: {
      56: '0xBf72cAC8Fd8B7197fc4E4B10fa99cEC6cAC591BB',
    },
    symbol0: 'CAKE',
    symbol1: 'BNB',
    title: 'CAKE-BNB LP',
    lpSymbol: 'CAKE-BNB LP',
    tokenSymbol: 'fryCAKE-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconCAKEBNBv2,
  },
  {
    pid: 34,
    lpAddresses: {
      56: '0x7cd05f8b960ba071fdf69c750c0e5a57c8366500',
    },
    vaultAddresses: {
      56: '0x64b0CD0F304fF4ef0a8d896618131cfa84512268',
    },
    strategyAddresses: {
      56: '0x0B308e52440C8BA436453944d3e95600Ff5c9ec7',
    },
    symbol0: 'STAX',
    symbol1: 'CAKE',
    title: 'STAX-CAKE LP',
    lpSymbol: 'STAX-CAKE LP',
    tokenSymbol: 'frySTAX-CAKEv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconSTAXCAKEv2,
  },
  {
    pid: 25,
    lpAddresses: {
      56: '0x4269e7f43a63cea1ad7707be565a94a9189967e9',
    },
    vaultAddresses: {
      56: '0xdBd808EE79BeA0823ea8871051Ec344cD782e94E',
    },
    strategyAddresses: {
      56: '0x2EC35Ee2ad5C2b819E7CF6702D111A39eDC80352',
    },
    symbol0: 'BNB',
    symbol1: 'UNI',
    title: 'UNI-BNB LP',
    lpSymbol: 'UNI-BNB LP',
    tokenSymbol: 'fryUNI-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: false,
    logo: iconUNIBNBv2,
  },
  {
    pid: 30,
    lpAddresses: {
      56: '0x752E713fB70E3FA1Ac08bCF34485F14A986956c4',
    },
    vaultAddresses: {
      56: '0x32d4F4718B64cA983742ad78081e994C7aE4a0d2',
    },
    strategyAddresses: {
      56: '0xA9751168019a8da1E5545438Ee355c6B95BA7053',
    },
    symbol0: 'SXP',
    symbol1: 'BNB',
    title: 'SXP-BNB LP',
    lpSymbol: 'SXP-BNB LP',
    tokenSymbol: 'frySXP-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconSXPBNBv2,
  },
  {
    pid: 18,
    lpAddresses: {
      56: '0xC7b4B32A3be2cB6572a1c9959401F832Ce47a6d2',
    },
    vaultAddresses: {
      56: '0x204F522892Be3Fb1BdEE262FA7CfDd49f71c1AC9',
    },
    strategyAddresses: {
      56: '0xcA8dCb0dD940445134CAfADdB79ADB4721fC3cb8',
    },
    symbol0: 'XRP',
    symbol1: 'BNB',
    title: 'XRP-BNB LP',
    lpSymbol: 'XRP-BNB LP',
    tokenSymbol: 'fryXRP-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconXRPBNBv2,
  },
  {
    pid: 26,
    lpAddresses: {
      56: '0x35fe9787f0ebf2a200bac413d3030cf62d312774',
    },
    vaultAddresses: {
      56: '0x4D78944a055D6A900C79436eb135d29ffE53896c',
    },
    strategyAddresses: {
      56: '0x12Ce085baDAD65CA340ee978373F6D45c94C2595',
    },
    symbol0: 'FIL',
    symbol1: 'BNB',
    title: 'FIL-BNB LP',
    lpSymbol: 'FIL-BNB LP',
    tokenSymbol: 'fryFIL-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconFILBNBv2,
  },
  {
    pid: 12,
    lpAddresses: {
      56: '0x610e7a287c27dffcac0f0a94f547cc1b770cf483',
    },
    vaultAddresses: {
      56: '0xcB0E6fEd56b802D1c7BaA6cD43A9a1a7fEc1C62F',
    },
    strategyAddresses: {
      56: '0xAF96aD911c511dCb347F5a4B903771D3aDA239c2',
    },
    symbol0: 'TWT',
    symbol1: 'BNB',
    title: 'TWT-BNB LP',
    lpSymbol: 'TWT-BNB LP',
    tokenSymbol: 'fryTWT-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconTWTBNBv2,
  },
  {
    pid: 27,
    lpAddresses: {
      56: '0x7a34bd64d18e44CfdE3ef4B81b87BAf3EB3315B6',
    },
    vaultAddresses: {
      56: '0x9A50812ae9d43161f6e1d8A535692983E59DD071',
    },
    strategyAddresses: {
      56: '0x108b11f02Fbc904B8C080C6c6c317b0A01198B3A',
    },
    symbol0: 'INJ',
    symbol1: 'BNB',
    title: 'INJ-BNB LP',
    lpSymbol: 'INJ-BNB LP',
    tokenSymbol: 'fryINJ-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconINJBNBv2,
  },
  {
    pid: 16,
    lpAddresses: {
      56: '0x4e0f3385d932f7179dee045369286ffa6b03d887',
    },
    vaultAddresses: {
      56: '0x47543beB5dCcf27A3f36f0f99e3D22e20f6A4816',
    },
    strategyAddresses: {
      56: '0xd145a091df909b7F8ac515Ad27A53dC2bb9dbE4a',
    },
    symbol0: 'ALPHA',
    symbol1: 'BNB',
    title: 'ALPHA-BNB LP',
    lpSymbol: 'ALPHA-BNB LP',
    tokenSymbol: 'fryALPHA-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconALPHABNBv2,
  },
  {
    pid: 23,
    lpAddresses: {
      56: '0x54EdD846dB17f43b6e43296134ECD96284671E81',
    },
    vaultAddresses: {
      56: '0xE8B09583e82BAbB33aee11988a36e7a8a105bC65',
    },
    strategyAddresses: {
      56: '0x74080AD3E686023CF7e4fADFf473De19edD7F2e5',
    },
    symbol0: 'BCH',
    symbol1: 'BNB',
    title: 'BCH-BNB LP',
    lpSymbol: 'BCH-BNB LP',
    tokenSymbol: 'fryBCH-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconBCHBNBv2,
  },
  {
    pid: 17,
    lpAddresses: {
      56: '0x20bcc3b8a0091ddac2d0bc30f68e6cbb97de59cd',
    },
    vaultAddresses: {
      56: '0x87cfb4d5AB3acD8CD3d6d4dbf1bAFDd0ec1e2D4F',
    },
    strategyAddresses: {
      56: '0x14dB9244aDd6066B24b34d53b254405Ffd7a36CC',
    },
    symbol0: 'USDT',
    symbol1: 'BNB',
    title: 'USDT-BNB LP',
    lpSymbol: 'USDT-BNB LP',
    tokenSymbol: 'fryUSDT-BNBv2',
    portion: 2.25,
    enabled: 1,
    pooledOrder: true,
    logo: iconUSDTBNBv2,
  },
  {
    pid: 13,
    lpAddresses: {
      56: '0x41182c32F854dd97bA0e0B1816022e0aCB2fc0bb',
    },
    vaultAddresses: {
      56: '0xBB0872F9Ea81154b424c2a96A23Fe664d7baD492',
    },
    strategyAddresses: {
      56: '0xe14D8452BE00F6Fa931eD9a2388F4d4E45e82447',
    },
    symbol0: 'BNB',
    symbol1: 'XVS',
    title: 'XVS-BNB LP',
    lpSymbol: 'XVS-BNB LP',
    tokenSymbol: 'fryXVS-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: false,
    logo: iconXVSBNBv2,
  },
  {
    pid: 3,
    lpAddresses: {
      56: '0xBA51D1AB95756ca4eaB8737eCD450cd8F05384cF',
    },
    vaultAddresses: {
      56: '0xC88AdA0B1E745e4A07b8654403A1c209D67a4255',
    },
    strategyAddresses: {
      56: '0xC59685261C2b8b9D2f3ff37D8F3820aD7Cf2C9Ae',
    },
    symbol0: 'ADA',
    symbol1: 'BNB',
    title: 'ADA-BNB LP',
    lpSymbol: 'ADA-BNB LP',
    tokenSymbol: 'fryADA-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconADABNBv2,
  },
  // {
  //   pid: 32,
  //   lpAddresses: {
  //     56: '0x7793870484647a7278907498ec504879d6971eab',
  //   },
  //   vaultAddresses: {
  //     56: '0x717924cEab3d30D79E1438f70E13a30CCfce4F04',
  //   },
  //   strategyAddresses: {
  //     56: '0xb4B99162e282F23366B95d591fC977eEc1e3e726',
  //   },
  //   symbol0: 'CTK',
  //   symbol1: 'BNB',
  //   title: 'CTK-BNB LP',
  //   lpSymbol: 'CTK-BNB LP',
  //   tokenSymbol: 'fryCTK-BNBv2',
  //   portion: 1.125,
  //   enabled: 1,
  //   pooledOrder: true,
  //   logo: iconCTKBNBv2,
  // },
  {
    pid: 21,
    lpAddresses: {
      56: '0x56c77d59e82f33c712f919d09fceddf49660a829',
    },
    vaultAddresses: {
      56: '0x6c0DFD95b2745CF31512a1aaFd0288f7a16B4a5C',
    },
    strategyAddresses: {
      56: '0x01100B64A2aEB7B06aC46eF9D1262eEFEA824f1e',
    },
    symbol0: 'DAI',
    symbol1: 'BNB',
    title: 'DAI-BNB LP',
    lpSymbol: 'DAI-BNB LP',
    tokenSymbol: 'fryDAI-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconDAIBNBv2,
  },
  {
    pid: 5,
    lpAddresses: {
      56: '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c',
    },
    vaultAddresses: {
      56: '0xA39f8a021Dc0B7a01DC79263e70E0F4f09A378F0',
    },
    strategyAddresses: {
      56: '0xF0D4129CBd892C307301C29B2ADf6210b5fd5261',
    },
    symbol0: 'DOT',
    symbol1: 'BNB',
    title: 'DOT-BNB LP',
    lpSymbol: 'DOT-BNB LP',
    tokenSymbol: 'fryDOT-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconDOTBNBv2,
  },
  {
    pid: 29,
    lpAddresses: {
      56: '0x30479874f9320a62bce3bc0e315c920e1d73e278',
    },
    vaultAddresses: {
      56: '0xE1e4C6B34D3247C1953eBC626cda441959B5Cd66',
    },
    strategyAddresses: {
      56: '0x1d8AB35187DA4b8038F90805516317F80C635C30',
    },
    symbol0: 'USDC',
    symbol1: 'BNB',
    title: 'USDC-BNB LP',
    lpSymbol: 'USDC-BNB LP',
    tokenSymbol: 'fryUSDC-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconUSDCBNBv2,
  },
  {
    pid: 20,
    lpAddresses: {
      56: '0x574a978c2D0d36D707a05E459466C7A1054F1210',
    },
    vaultAddresses: {
      56: '0xDd45D48E500C5d18859a815C42d70AA40dB33903',
    },
    strategyAddresses: {
      56: '0x2500aaFBD646E3e4A54ADeb6a3b2C84d79b61615',
    },
    symbol0: 'YFII',
    symbol1: 'BNB',
    title: 'YFII-BNB LP',
    lpSymbol: 'YFII-BNB LP',
    tokenSymbol: 'fryYFII-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconYFIIBNBv2,
  },
  {
    pid: 24,
    lpAddresses: {
      56: '0x68Ff2ca47D27db5Ac0b5c46587645835dD51D3C1',
    },
    vaultAddresses: {
      56: '0x259C62Ea63C6A57681Ae5342Bb77Fbd03f19643c',
    },
    strategyAddresses: {
      56: '0x7E1A7b3c30758b6911615a939c4B2dD92e01de38',
    },
    symbol0: 'YFI',
    symbol1: 'BNB',
    title: 'YFI-BNB LP',
    lpSymbol: 'YFI-BNB LP',
    tokenSymbol: 'fryYFI-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconYFIBNBv2,
  },
  {
    pid: 19,
    lpAddresses: {
      56: '0x2333c77FC0B2875c11409cdCD3C75D42D402E834',
    },
    vaultAddresses: {
      56: '0xFb86CB27dBE996c0A9Dd19457546cbc00322c1bf',
    },
    strategyAddresses: {
      56: '0xaE820088F0984FD8309D94064902D18FF7a70ef5',
    },
    symbol0: 'ATOM',
    symbol1: 'BNB',
    title: 'ATOM-BNB LP',
    lpSymbol: 'ATOM-BNB LP',
    tokenSymbol: 'fryATOM-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconATOMBNBv2,
  },
  {
    pid: 4,
    lpAddresses: {
      56: '0xc639187ef82271D8f517de6FEAE4FaF5b517533c',
    },
    vaultAddresses: {
      56: '0x9d1D79EA47F8D3D01B720f1F4b6c7110D66ef1A4',
    },
    strategyAddresses: {
      56: '0x7eB7c4a9397Ae6892E8F1330ac4B2d2E97d59af9',
    },
    symbol0: 'BAND',
    symbol1: 'BNB',
    title: 'BAND-BNB LP',
    lpSymbol: 'BAND-BNB LP',
    tokenSymbol: 'fryBAND-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconBANDBNBv2,
  },
  {
    pid: 7,
    lpAddresses: {
      56: '0xaeBE45E3a03B734c68e5557AE04BFC76917B4686',
    },
    vaultAddresses: {
      56: '0xb707F6165EE6B0927DfBa25e9EF5B1E737f4a0cD',
    },
    strategyAddresses: {
      56: '0x62194E8B4ee21D274C5A168cF962b66fd3A44b35',
    },
    symbol0: 'BNB',
    symbol1: 'LINK',
    title: 'LINK-BNB LP',
    lpSymbol: 'LINK-BNB LP',
    tokenSymbol: 'fryLINK-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: false,
    logo: iconLINKBNBv2,
  },
  {
    pid: 22,
    lpAddresses: {
      56: '0x5acaC332F0F49c8bAdC7aFd0134aD19D3DB972e6',
    },
    vaultAddresses: {
      56: '0xDBbDd5C565aa51AC4a38F9153A12c9f9D1EAE75E',
    },
    strategyAddresses: {
      56: '0xf9780b8D07BD86Be631cc94fD46C3a1500002569',
    },
    symbol0: 'XTZ',
    symbol1: 'BNB',
    title: 'XTZ-BNB LP',
    lpSymbol: 'XTZ-BNB LP',
    tokenSymbol: 'fryXTZ-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconXTZBNBv2,
  },
  {
    pid: 6,
    lpAddresses: {
      56: '0x981d2Ba1b298888408d342C39c2Ab92e8991691e',
    },
    vaultAddresses: {
      56: '0x7edc8C553320E9f1E270d6d768A6E3FFAF23DA49',
    },
    strategyAddresses: {
      56: '0x45390f6CD6BfE744e13E7E52264e4B7A8873cBd2',
    },
    symbol0: 'EOS',
    symbol1: 'BNB',
    title: 'EOS-BNB LP',
    lpSymbol: 'EOS-BNB LP',
    tokenSymbol: 'fryEOS-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconEOSBNBv2,
  },
  {
    pid: 40,
    lpAddresses: {
      56: '0xC743Dc05F03D25E1aF8eC5F8228f4BD25513c8d0',
    },
    vaultAddresses: {
      56: '0xd08EFB5e64C85A337c0ef72662eb9135627A048E',
    },
    strategyAddresses: {
      56: '0x335d128212d18620BC4022700b179bF2Ac3ED28A',
    },
    symbol0: 'BLINK',
    symbol1: 'BNB',
    title: 'BLINK-BNB LP',
    lpSymbol: 'BLINK-BNB LP',
    tokenSymbol: 'fryBLINK-BNBv2',
    portion: 1.125,
    enabled: 1,
    pooledOrder: true,
    logo: iconBLKBNB,
  },
]

export const supportedSingleVaults = [  
  {
    pid: 0,
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    reaperAddresses: {
      56: '0x79cD0E1a3F52D14efD930479EF86787CD4a1d846',
    },
    pairAddresses: {
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    reaperSymbol: 'fryCAKE',
    title: 'CAKE',
    enabled: 1,
    pooledOrder: true,
    logo: iconReaperCAKE,
    platform: 'pancake',
  },
  {
    pid: 1,
    tokenAddresses: {
      56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    reaperAddresses: {
      56: '0xe4E2769eE3bE4f0bD98449Ac89274A11e187581e',
    },
    pairAddresses: {
      56: '0xc2Eed0F5a0dc28cfa895084bC0a9B8B8279aE492',
    },
    tokenSymbol: 'BAKE',
    reaperSymbol: 'frybAKE',
    title: 'BAKE',
    enabled: 1,
    pooledOrder: false,
    logo: iconReaperBake,
    platform: 'bakery',
  },
  {
    pid: 2,
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    reaperAddresses: {
      56: '0xB3cBabD624D66F73dfdc3C78A5e4e8033937a422',
    },
    pairAddresses: {
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'FRIES',
    reaperSymbol: 'fryFRIES',
    title: 'FRIES',
    enabled: 0,
    pooledOrder: true,
    logo: iconFRIES,
    platform: '',
  },
  {
    pid: 3,
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    reaperAddresses: {
      56: '0xB3cBabD624D66F73dfdc3C78A5e4e8033937a422',
    },
    pairAddresses: {
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'WBNB',
    reaperSymbol: 'fryWBNB',
    title: 'WBNB',
    enabled: 0,
    pooledOrder: true,
    logo: iconWBNB,
    platform: '',
  },
]
