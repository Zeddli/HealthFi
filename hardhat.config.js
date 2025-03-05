require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    vanguard: {
      url: process.env.VANGUARD_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  }
};
