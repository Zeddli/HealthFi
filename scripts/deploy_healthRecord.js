const hre = require("hardhat");

async function main() {
  const HealthRecordContract = await hre.ethers.getContractFactory("HealthRecordContract");
  const healthRecord = await HealthRecordContract.deploy();
//   await healthRecord.deployTransaction.wait();
  console.log("HealthRecordContract deployed to:", healthRecord.target); // use target if that's how it's returned in your setup
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
