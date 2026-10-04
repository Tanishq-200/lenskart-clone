const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.post('/', partnerController.createLead);
router.get('/', partnerController.getLeads);
router.get('/:id', partnerController.getLeadById);
router.patch('/:id', partnerController.updateLead);
router.delete('/:id', partnerController.deleteLead);

module.exports = router;
