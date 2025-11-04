const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vital = require('../models/Vital');
const Patient = require('../models/Patient');

// add vital
router.post('/', auth, async (req,res)=>{
  try{
    const {patientId, heartRate, spo2, temperature, bloodPressure, notes} = req.body;
    const patient = await Patient.findById(patientId);
    if(!patient) return res.status(404).json({error:'patient not found'});
    const vital = new Vital({patient:patientId, heartRate, spo2, temperature, bloodPressure, notes});
    await vital.save();
    res.json(vital);
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

// get vitals for patient
router.get('/patient/:patientId', auth, async (req,res)=>{
  try{
    const vitals = await Vital.find({patient: req.params.patientId}).sort({timestamp:-1});
    res.json(vitals);
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

module.exports = router;
