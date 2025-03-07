const express = require('express');
const router = express.Router();

module.exports = (healthRecordFactory, provider) => {
  // POST /healthrecord - Create new health record
  router.post('/', async (req, res) => {
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

  // GET /healthrecord/audit - Get health record audit logs
  router.get('/audit', async (req, res) => {
    try {
      const logs = await provider.getLogs({
        fromBlock: 0,
        toBlock: "latest",
        address: healthRecordFactory.address,
        topics: [healthRecordFactory.interface.getEventTopic('RecordCreated')]
      });
      const decodedLogs = logs.map(log => healthRecordFactory.interface.parseLog(log));
      res.status(200).json(decodedLogs);
    } catch (error) {
      console.error("Audit trail error (record):", error);
      res.status(500).json({ error: error.message });
    }
  });

  // GET /healthrecord/deployed - Get all deployed records
  router.get('/deployed', async (req, res) => {
    try {
      const deployedRecords = await healthRecordFactory.getDeployedRecords();
      res.status(200).json(deployedRecords);
    } catch (error) {
      console.error("Error fetching deployed records:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
