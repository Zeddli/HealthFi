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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
