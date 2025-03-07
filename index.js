// server/index.js
require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Set up provider using Vanar's RPC URL from .env
const provider = new ethers.providers.JsonRpcProvider(process.env.VANGUARD_RPC_URL);

// Create a wallet instance using your private key from .env
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load UserFactory contract artifact and create an instance
const userFactoryArtifact = require('../artifacts/contracts/UserFactory.sol/UserFactory.json');
const userFactoryAbi = userFactoryArtifact.abi;
const userFactoryAddress = process.env.USER_FACTORY_ADDRESS;
const userFactory = new ethers.Contract(userFactoryAddress, userFactoryAbi, wallet);

// Load HealthRecordFactory contract artifact and create an instance
const hrFactoryArtifact = require('../artifacts/contracts/HealthRecordFactory.sol/HealthRecordFactory.json');
const hrFactoryAbi = hrFactoryArtifact.abi;
const hrFactoryAddress = process.env.HEALTH_RECORD_FACTORY_ADDRESS;
const healthRecordFactory = new ethers.Contract(hrFactoryAddress, hrFactoryAbi, wallet);

/**
 * Endpoint to auto-deploy a new User contract.
 * Expects a JSON payload with:
 *   - nric: string
 *   - fullName: string
 *   - phone: string
 *   - department: string
 */
app.post('/user', async (req, res) => {
  try {
    const { nric, fullName, phone, department } = req.body;
    const tx = await userFactory.createUser(nric, fullName, phone, department);
    await tx.wait();
    res.status(200).json({ message: 'User contract deployed successfully', txHash: tx.hash });
  } catch (error) {
    console.error("User deployment error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to auto-deploy a new HealthRecord contract.
 * Expects a JSON payload with:
 *   - patientNric: string
 *   - recordHash: string (a pointer or hash of the actual record)
 */
app.post('/healthrecord', async (req, res) => {
  try {
    const { patientNric, recordHash } = req.body;
    const tx = await healthRecordFactory.createRecord(patientNric, recordHash);
    await tx.wait();
    res.status(200).json({ message: 'HealthRecord contract deployed successfully', txHash: tx.hash });
  } catch (error) {
    console.error("HealthRecord deployment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Optionally, add additional endpoints for retrieving audit logs or deployed contract addresses

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
