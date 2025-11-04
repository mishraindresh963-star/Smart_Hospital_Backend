const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  timestamp: {type: Date, default: Date.now},
  heartRate: Number,
  spo2: Number,
  temperature: Number,
  bloodPressure: String,
  notes: String
});

module.exports = mongoose.model('Vital', vitalSchema);
