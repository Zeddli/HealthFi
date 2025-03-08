require('dotenv').config();
const express = require('express');
const ethers = require('ethers');
const cors = require('cors');

// Validate required environment variables
const requiredEnvVars = [
  'VANGUARD_RPC_URL',
  'PRIVATE_KEY',
  'USER_FACTORY_ADDRESS',
  'HEALTH_RECORD_FACTORY_ADDRESS'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const app = express();
app.use(express.json());
app.use(cors());

// Set up provider using Vanar's RPC URL from .env
console.log("Connecting to RPC URL:", process.env.VANGUARD_RPC_URL);
const provider = new ethers.JsonRpcProvider(process.env.VANGUARD_RPC_URL);

// Create a wallet instance using your private key from .env
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log("Wallet address:", wallet.address);

// Load contract artifacts and create instances
const userFactoryArtifact = require('./artifacts/contracts/UserFactory.sol/UserFactory.json');
const hrFactoryArtifact = require('./artifacts/contracts/HealthRecordFactory.sol/HealthRecordFactory.json');

// Initialize contracts
const userFactory = new ethers.Contract(process.env.USER_FACTORY_ADDRESS, userFactoryArtifact.abi, wallet);
const healthRecordFactory = new ethers.Contract(process.env.HEALTH_RECORD_FACTORY_ADDRESS, hrFactoryArtifact.abi, wallet);

console.log("Contracts initialized:", {
  userFactory: process.env.USER_FACTORY_ADDRESS,
  healthRecordFactory: process.env.HEALTH_RECORD_FACTORY_ADDRESS
});

// API Routes
app.post('/user', async (req, res) => {
  try {
    const { nric, fullName, phone, department } = req.body;
    
    const nonce = await wallet.getNonce();
    console.log("Creating user with nonce:", nonce);
    
    const tx = await userFactory.createUser(nric, fullName, phone, department, {
      nonce,
      gasLimit: 500000
    });
    
    const receipt = await tx.wait();
    res.status(200).json({ 
      message: 'User contract deployed successfully', 
      txHash: tx.hash,
      receipt 
    });
  } catch (error) {
    console.error("User deployment error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/healthrecord', async (req, res) => {
  try {
    const { patientNric, diagnosis, description, date, treatment, hospitalisation } = req.body;
    console.log("Creating health record for:", patientNric);

    const nonce = await wallet.getNonce();
    const tx = await healthRecordFactory.createRecord(
      patientNric,
      diagnosis,
      description,
      date,
      treatment,
      hospitalisation,
      {
        nonce,
        gasLimit: 1000000
      }
    );

    const receipt = await tx.wait();
    const event = receipt.logs.find(log => 
      healthRecordFactory.interface.parseLog(log)?.name === 'RecordCreated'
    );

    res.status(200).json({
      message: 'Health record created successfully',
      txHash: tx.hash,
      receipt,
      event: event ? healthRecordFactory.interface.parseLog(event) : null
    });
  } catch (error) {
    console.error("Health record creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/audit/user', async (req, res) => {
  try {
    const filter = userFactory.filters.UserCreated();
    const logs = await provider.getLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: userFactory.address,
      topics: [filter.fragment.topicHash]
    });

    const events = await Promise.all(logs.map(async log => {
      const event = userFactory.interface.parseLog(log);
      const block = await provider.getBlock(log.blockNumber);
      return {
        ...event.args,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: block?.timestamp
      };
    }));

    res.status(200).json(events);
  } catch (error) {
    console.error("User audit error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/audit/record', async (req, res) => {
  try {
    const filter = healthRecordFactory.filters.RecordCreated();
    const logs = await provider.getLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: healthRecordFactory.address,
      topics: [filter.fragment.topicHash]
    });

    const events = await Promise.all(logs.map(async log => {
      const event = healthRecordFactory.interface.parseLog(log);
      const block = await provider.getBlock(log.blockNumber);
      return {
        ...event.args,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: block?.timestamp
      };
    }));

    res.status(200).json(events);
  } catch (error) {
    console.error("Record audit error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/deployed-records', async (req, res) => {
  try {
    const records = await healthRecordFactory.getDeployedRecords();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching deployed records:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/transaction/:txHash', async (req, res) => {
  try {
    const { txHash } = req.params;
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    
    const receipt = await provider.getTransactionReceipt(txHash);
    res.json({
      status: receipt ? (receipt.status === 1 ? 'success' : 'failed') : 'pending',
      transaction: tx,
      receipt: receipt
    });
  } catch (error) {
    console.error("Transaction status error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});