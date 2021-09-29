const createError = require('http-errors'); 
const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true, 
    minLength: 3, 
    maxLength: 50
  },
  lastName: {
    type: String, 
    required: true, 
    minLength: 3, 
    maxLength: 50
  }, 
  emailAddress: {
    type: String, 
    required: true, 
    minLength: 5, 
    maxLength: 100
  }, 
  password: {
    type: String, 
    required: true, 
    minLength: 8,
    maxlength: 20
  },  
}); 

const User = mongoose.model('user', userSchema); 

exports.User = User;
exports.userSchema = userSchema;