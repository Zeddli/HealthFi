require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    vanguard: {
        url: "https://rpc-vanguard.vanarchain.com",  // Replace with actual endpoint if different
        chainId: 78600,
        accounts: [ "0xdca09f11788e7954a8982f421ec3617f7fc9901a51af2dc6cc612a90c15c1b6f" ] // Use environment variables for security
      }
  }
};
