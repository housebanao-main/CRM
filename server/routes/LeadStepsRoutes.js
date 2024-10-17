const express = require('express');
const LeadStep = require('../models/LeadSteps');
const router = express.Router();

// POST route to add or update lead step data
router.post('/', async (req, res) => {
  const { leadId, stepName, stepDetails } = req.body;

  if (!leadId || !stepName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let leadStep = await LeadStep.findOne({ leadId, stepName });

    if (leadStep) {
      // Update existing step
      leadStep.stepDetails = stepDetails;
      await leadStep.save();
    } else {
      // Create new step
      leadStep = new LeadStep({
        leadId,
        stepName,
        stepDetails,
      });
      await leadStep.save();
    }

    res.status(201).json({ message: 'Step data saved successfully', leadStep });
  } catch (error) {
    console.error('Error saving step data:', error);
    res.status(500).json({ message: 'Error saving step data', error });
  }
});

// GET route to fetch all steps for a lead
router.get('/:leadId', async (req, res) => {
  const { leadId } = req.params;

  try {
    const leadSteps = await LeadStep.find({ leadId });
    res.status(200).json({ leadSteps });
  } catch (error) {
    console.error('Error fetching step data:', error);
    res.status(500).json({ message: 'Error fetching step data', error });
  }
});

module.exports = router;
