const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'please_change_secret';

// register
router.post('/register', async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    if(!name || !email || !password) return res.status(400).json({error:'missing fields'});
    const exist = await User.findOne({email});
    if(exist) return res.status(400).json({error:'email exists'});
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({name,email,password:hashed, role});
    await user.save();
    res.json({message:'registered'});
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

// login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:'invalid credentials'});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({error:'invalid credentials'});
    const token = jwt.sign({id:user._id, role:user.role}, secret, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(err){ console.error(err); res.status(500).json({error:'server error'}); }
});

module.exports = router;
