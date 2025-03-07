// scripts/deploy_factories.js (located in your /scripts folder)
const hre = require("hardhat");

async function main() {
  // Deploy UserFactory contract
  const UserFactory = await hre.ethers.getContractFactory("UserFactory");
  const userFactory = await UserFactory.deploy();
//   await userFactory.deployTransaction.wait();
  console.log("UserFactory deployed to:", userFactory.address);

  // Deploy HealthRecordFactory contract
  const HealthRecordFactory = await hre.ethers.getContractFactory("HealthRecordFactory");
  const healthRecordFactory = await HealthRecordFactory.deploy();
  await healthRecordFactory.deployTransaction.wait();
  console.log("HealthRecordFactory deployed to:", healthRecordFactory.address);

  // Automated Verification for UserFactory
  try {
    await hre.run("verify:verify", {
      address: userFactory.address,
      constructorArguments: [],
    });
    console.log("UserFactory verified successfully.");
  } catch (error) {
    console.error("Verification failed for UserFactory:", error);
  }

  // Automated Verification for HealthRecordFactory
  try {
    await hre.run("verify:verify", {
      address: healthRecordFactory.address,
      constructorArguments: [],
    });
    console.log("HealthRecordFactory verified successfully.");
  } catch (error) {
    console.error("Verification failed for HealthRecordFactory:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
