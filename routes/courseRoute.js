const {Course} = require('../models/courseModel'); 
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User} = require('../models/userModel'); 
const createError = require('http-errors'); 
// api/courses

//get
router.get('/', async (req, res) => {
  const courses = await Course
    .find()
    .sort('title')
    .select('user title');
  res.send(courses); 
});

router.get('/:id', async (req, res) => {
  //returns a course; including the user that owns the course for the provided course id
  const course = await Course.findById(req.params.id);
  
  res.send(course); 
});

//post
router.post('/', async (req, res, next) => {
  try {
    let course = new Course({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      materialsNeeded: req.body.materialsNeeded
    });

    course = await course.save(); 

  }catch (err) {
    next(createError(400, `there was a problem with ${err}`));
  }
  
  const user = await Course.findById(req.body.user); 
  //set location header to uri for the course  
  res.location(`/${req.params.id}`);
  res.send({}); 
});

//put
router.put('/:id', async (req, res, next) => {
  //VALIDATION
  
  try {
     let course = await Course.findByIdAndUpdate(req.params.id, {
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      materialsNeeded: req.body.materialsNeeded    
    }, {new: true, runValidators: true}); 
   
  }catch (err) {
    return next(createError(400, `PLEASE FILL OUT REQUIRED INFORMATION ${err} OR CHECK THE ID`));
  }
  res.send({}); 
});  

//delete
router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id); 
  res.send({}); 
});  

module.exports = router; 