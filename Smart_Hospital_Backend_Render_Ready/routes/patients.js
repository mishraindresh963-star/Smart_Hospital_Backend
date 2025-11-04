const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Patient = require('../models/Patient');
const User = require('../models/User');

// create patient profile (for admin/doctor or patient registering)
router.post('/', auth, async (req,res)=>{
  try{
    const data = req.body;
    // if role is patient and no user id, attach to req.user
    if(req.user.role === 'patient') data.user = req.user._id;
    const patient = new Patient(data);
    await patient.save();
    res.json(patient);
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

// list patients (doctors/admin)
router.get('/', auth, async (req,res)=>{
  try{
    const patients = await Patient.find().populate('user','name email');
    res.json(patients);
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

// get single patient
router.get('/:id', auth, async (req,res)=>{
  try{
    const p = await Patient.findById(req.params.id).populate('user','name email');
    if(!p) return res.status(404).json({error:'not found'});
    res.json(p);
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

module.exports = router;
