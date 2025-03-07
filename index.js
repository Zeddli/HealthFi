// server/index.js (located in the /server folder)
require('dotenv').config();
const express = require('express');
const ethers = require('ethers'); // Changed: import ethers without destructuring
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
const provider = new ethers.JsonRpcProvider(process.env.VANGUARD_RPC_URL);

// Create a wallet instance using your private key from .env
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load UserFactory contract artifact and create an instance
const userFactoryArtifact = require('./artifacts/contracts/UserFactory.sol/UserFactory.json');
const userFactoryAbi = userFactoryArtifact.abi;
const userFactoryAddress = process.env.USER_FACTORY_ADDRESS;

if (!ethers.isAddress(userFactoryAddress)) {
  throw new Error('Invalid USER_FACTORY_ADDRESS');
}

const userFactory = new ethers.Contract(userFactoryAddress, userFactoryAbi, wallet);

// Load HealthRecordFactory contract artifact and create an instance
const hrFactoryArtifact = require('./artifacts/contracts/HealthRecordFactory.sol/HealthRecordFactory.json');
const hrFactoryAbi = hrFactoryArtifact.abi;
const hrFactoryAddress = process.env.HEALTH_RECORD_FACTORY_ADDRESS;

if (!ethers.isAddress(hrFactoryAddress)) {
  throw new Error('Invalid HEALTH_RECORD_FACTORY_ADDRESS');
}

const healthRecordFactory = new ethers.Contract(hrFactoryAddress, hrFactoryAbi, wallet);

/**
 * POST /user
 * Auto-deploy a new User contract.
 * Expected JSON payload: { nric, fullName, phone, department }
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
 * POST /healthrecord
 * Auto-deploy a new HealthRecord contract.
 * Expected JSON payload: { patientNric, recordHash }
 */
app.post('/healthrecord', async (req, res) => {
  try {
    const { patientNric, diagnosis, description, date, treatment, hospitalisation } = req.body;
    const tx = await healthRecordFactory.createRecord(patientNric, diagnosis, description, date, treatment, hospitalisation);
    await tx.wait();
    res.status(200).json({ message: 'HealthRecord contract deployed successfully', txHash: tx.hash });
  } catch (error) {
    console.error("HealthRecord deployment error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /audit/user
 * Fetch audit logs for user registrations by retrieving the UserCreated events.
 */
app.get('/audit/user', async (req, res) => {
  try {
    console.log("Fetching user audit logs...");
    console.log("UserFactory address:", userFactory.address);
    
    // Define event signature
    const eventSignature = "UserCreated(address,string)";
    const eventTopic = ethers.id(eventSignature);

    console.log("Event topic:", eventTopic);

    // Get logs from blockchain
    const logs = await provider.getLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: userFactory.address,
      topics: [eventTopic]
    });

    console.log("Found raw logs:", logs);

    // Parse logs using contract interface
    const decodedLogs = logs.map(log => {
      try {
        const parsedLog = userFactory.interface.parseLog({
          topics: log.topics,
          data: log.data
        });
        
        return {
          userAddress: parsedLog.args[0],
          nric: parsedLog.args[1],
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash
        };
      } catch (e) {
        console.error("Error parsing specific log:", e);
        console.log("Problematic log:", log);
        return null;
      }
    }).filter(Boolean);

    console.log("Decoded logs:", decodedLogs);
    res.status(200).json(decodedLogs);
  } catch (error) {
    console.error("Audit trail error (user):", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /audit/record
 * Fetch audit logs for health record submissions by retrieving the RecordCreated events.
 */
app.get('/audit/record', async (req, res) => {
  try {
    const logs = await provider.getLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: healthRecordFactory.address,
      topics: [healthRecordFactory.interface.getEvent("RecordCreated").topicHash]
    });
    const decodedLogs = logs.map(log => {
      try {
        return {
          ...healthRecordFactory.interface.parseLog({
            topics: log.topics,
            data: log.data
          }),
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash
        };
      } catch (e) {
        console.error("Error parsing log:", e);
        return null;
      }
    }).filter(Boolean);
    
    res.status(200).json(decodedLogs);
  } catch (error) {
    console.error("Audit trail error (record):", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /deployed-records
 * Retrieve all deployed HealthRecord contract addresses.
 */
app.get('/deployed-records', async (req, res) => {
  try {
    const deployedRecords = await healthRecordFactory.getDeployedRecords();
    res.status(200).json(deployedRecords);
  } catch (error) {
    console.error("Error fetching deployed records:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
