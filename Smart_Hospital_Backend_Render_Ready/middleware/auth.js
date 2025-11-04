const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET || 'please_change_secret';

module.exports = async function(req,res,next){
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({error:'No token'});
  const token = authHeader.split(' ')[1];
  try{
    const payload = jwt.verify(token, secret);
    req.user = await User.findById(payload.id).select('-password');
    next();
  }catch(err){
    return res.status(401).json({error:'Invalid token'});
  }
}
