const express = require('express');
const router = express.Router();
const { getDBStatus } = require('../config/db');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Lenskart Franchise & Landlord Portal API',
    database: getDBStatus(),
  });
});

module.exports = router;
