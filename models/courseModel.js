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
    trim: true, 
    minlength: 3, 
    maxlength: 75
    }, 
  description: {
    type: String, 
    required: true,
    maxlength: 200
    },
  estimatedTime: {
    type: String, 
    },
  materialsNeeded: {
    type: String
    }
}); 
//responseschema
function validateCourse(course) {
  const schema = {
    title: Joi.string().min(3).max(75).required(),
    description: Joi.string().max(200).required(),
  };

  return Joi.validate(user, schema);
}

const Course = mongoose.model('course', courseSchema); 
exports.Course = Course; 