require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox")
require('@nomicfoundation/hardhat-chai-matchers')
require("@openzeppelin/hardhat-upgrades")
require("hardhat-contract-sizer")

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    amoy: {
      url: process.env.POLYGON_AMOY_RPC,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // Use EIP-1559 style gas fees instead of gasPrice:
      maxFeePerGas: 50_000_000_000,       // 50 gwei
      maxPriorityFeePerGas: 2_000_000_000 // 2 gwei
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
}

