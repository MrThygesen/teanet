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
    polygon: {
      url: process.env.POLYGON_RPC,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 35000000000, // 35 Gwei
    },
  },

  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
    },
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
}
