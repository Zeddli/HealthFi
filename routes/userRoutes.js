const express = require('express');
const router = express.Router();

module.exports = (userFactory, provider) => {
  // POST /user - Create new user
  router.post('/user', async (req, res) => {
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

  // GET /user/audit - Get user audit logs
  router.get('/audit', async (req, res) => {
    try {
      const logs = await provider.getLogs({
        fromBlock: 0,
        toBlock: "latest",
        address: userFactory.address,
        topics: [userFactory.interface.getEventTopic('UserCreated')]
      });
      const decodedLogs = logs.map(log => userFactory.interface.parseLog(log));
      res.status(200).json(decodedLogs);
    } catch (error) {
      console.error("Audit trail error (user):", error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
