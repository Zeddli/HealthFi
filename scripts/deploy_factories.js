const hre = require("hardhat");

async function main() {
  // Deploy UserFactory contract
  const UserFactory = await hre.ethers.getContractFactory("UserFactory");
  const userFactory = await UserFactory.deploy();
  await userFactory.waitForDeployment();
  const userFactoryAddress = await userFactory.getAddress();
  console.log("UserFactory deployed to:", userFactoryAddress);

  // Deploy HealthRecordFactory contract
  const HealthRecordFactory = await hre.ethers.getContractFactory("HealthRecordFactory");
  const healthRecordFactory = await HealthRecordFactory.deploy();
  await healthRecordFactory.waitForDeployment();
  const healthRecordFactoryAddress = await healthRecordFactory.getAddress();
  console.log("HealthRecordFactory deployed to:", healthRecordFactoryAddress);

  // Wait for a few block confirmations
  await hre.ethers.provider.waitForTransaction(
    userFactory.deploymentTransaction().hash,
    5
  );
  await hre.ethers.provider.waitForTransaction(
    healthRecordFactory.deploymentTransaction().hash,
    5
  );

  // Automated Verification for UserFactory
  try {
    await hre.run("verify:verify", {
      address: userFactoryAddress,
      constructorArguments: [],
    });
    console.log("UserFactory verified successfully");
  } catch (error) {
    console.error("Verification failed for UserFactory:", error);
  }

  // Automated Verification for HealthRecordFactory
  try {
    await hre.run("verify:verify", {
      address: healthRecordFactoryAddress,
      constructorArguments: [],
    });
    console.log("HealthRecordFactory verified successfully");
  } catch (error) {
    console.error("Verification failed for HealthRecordFactory:", error);
  }

  // Log addresses for easy access
  console.log("\nDeployed Addresses:");
  console.log("------------------");
  console.log("UserFactory:", userFactoryAddress);
  console.log("HealthRecordFactory:", healthRecordFactoryAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
