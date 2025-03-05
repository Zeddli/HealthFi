const hre = require("hardhat");

async function main() {
  const HealthRecordFactory = await hre.ethers.getContractFactory("HealthRecordFactory");
  const factory = await HealthRecordFactory.deploy();
//   await factory.deployTransaction.wait();
  // Depending on your setup, you might need to use factory.target if that’s what holds the address.
  console.log("HealthRecordFactory deployed to:", factory.target || factory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
