const mongoose = require('mongoose'); 
const Joi = require('Joi'); 

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 75
    }, 
  description: {
    type: String, 
    required: true,
    minlength: 5,
    },
  estimatedTime: {
    type: String, 
    },
  materialsNeeded: {
    type: String
    }
}); 

const Course = mongoose.model('course', courseSchema); 
exports.Course = Course; 