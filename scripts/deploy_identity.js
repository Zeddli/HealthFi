const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const IdentityContract = await hre.ethers.getContractFactory("IdentityContract");
  // Deploy the contract
  const identity = await IdentityContract.deploy();
//   await identity.deployTransaction.wait();

  console.log("IdentityContract deployed to:", identity.target);
}

// We recommend this pattern to be able to use async/await everywhere
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
