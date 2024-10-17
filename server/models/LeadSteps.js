const mongoose = require('mongoose');

const leadStepSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  stepName: { type: String, required: true },
  stepDetails: { type: String, default: '' }, // Make stepDetails optional by providing a default value
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeadStep', leadStepSchema);
