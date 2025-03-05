// index.js
require('dotenv').config();
const { ethers } = require('ethers');
const express = require('express');
const app = express();

app.use(express.json());

// Set up the provider using Vanar's RPC URL
const provider = new ethers.JsonRpcProvider(process.env.VANGUARD_RPC_URL);

// Create a wallet instance using your private key
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load the IdentityContract ABI (ensure the path matches your artifact location)
const identityArtifact = require('./artifacts/contracts/IdentityContract.sol/IdentityContract.json');
const identityAbi = identityArtifact.abi;

// Use identity.target since that's what contains the contract address in your setup
const identityAddress = process.env.IDENTITY_CONTRACT_ADDRESS;
const identityContract = new ethers.Contract(identityAddress, identityAbi, wallet);

const healthRecordArtifact = require('./artifacts/contracts/HealthRecordContract.sol/HealthRecordContract.json');
const healthRecordAbi = healthRecordArtifact.abi;
const healthRecordAddress = process.env.HEALTH_RECORD_CONTRACT_ADDRESS;
const healthRecordContract = new ethers.Contract(healthRecordAddress, healthRecordAbi, wallet);

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  try {
    const { nric, fullName, phone, department } = req.body;
    
    // Call registerUser on the contract
    const tx = await identityContract.registerUser(nric, fullName, phone, department);
    
    // Wait for the transaction to be mined
    await tx.wait();
    
    res.status(200).json({ message: 'User registered successfully', txHash: tx.hash });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a new health record
app.post('/record', async (req, res) => {
    try {
      const { nric, recordHash } = req.body;
      const tx = await healthRecordContract.addRecord(nric, recordHash);
      await tx.wait();
      res.status(200).json({ message: 'Record added successfully', txHash: tx.hash });
    } catch (error) {
      console.error("Record addition error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Endpoint to get records for a patient
  app.get('/record/:nric', async (req, res) => {
    try {
      const nric = req.params.nric;
      const records = await healthRecordContract.getRecords(nric);
      res.status(200).json(records);
    } catch (error) {
      console.error("Record retrieval error:", error);
      res.status(500).json({ error: error.message });
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
