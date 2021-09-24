//const Joi = require('Joi'); 
const createError = require('http-errors'); 
const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50
  },
  lastName: {
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50
  }, 
  emailAddress: {
    type: String, 
    required: true, 
    minlength: 5, 
    maxlength: 100
  }, 
  password: {
    type: String, 
    required: true, 
    minlength: 8,
  },  
}); 

const User = mongoose.model('user', userSchema); 

// function validateUser(user) {
//   const schema = {
//     firstName: Joi.string().min(3).max(50).required(),
//     lastName: Joi.string().min(3).max(50).required(),
//     emailAddress: Joi.string().min(5).max(100).required(),
//     password: Joi.string().min(8).max(50).required()
//   };

//   return schema; 
// }

//exports.validate = validateUser; 



exports.User = User;
exports.userSchema = userSchema;