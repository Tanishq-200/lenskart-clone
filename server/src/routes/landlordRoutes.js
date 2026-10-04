const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordController');

router.post('/', landlordController.createLead);
router.get('/', landlordController.getLeads);
router.get('/:id', landlordController.getLeadById);
router.patch('/:id', landlordController.updateLead);
router.delete('/:id', landlordController.deleteLead);

module.exports = router;
