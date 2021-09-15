const {Course} = require('../models/courseModel'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {userSchema} = require('../models/userModel'); 

// api/courses

//get
router.get('/', async (req, res) => {
  //return a list of courses; includes user that owns each course
  const courses = await Course
    .find()
    .sort('title')
    .select('user title');
  res.send(courses); 
});

router.get('/:id', async (req, res) => {
  //returns a course; including the user that owns the course for the provided course id
  const course = await Course.findById(req.params.id);
 
   //PROBLEM//if(!course) return res.status(404).send('not found'); 
  res.send(course); 
});

//post
router.post('/', async (req, res) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  //creates a course
  let course = new Course({
    title: req.body.title,
    description: req.body.description,
    estimatedTime: req.body.estimatedTime,
    materialsNeeded: req.body.materialsNeeded
  });
  
  course = await course.save(); 
  //set location header to uri for the course  
  res.location(`/${req.params.id}`); 
});

//put
router.put('/:id', async (req, res) => {
  //VALIDATION
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  //update a course 
  const course = await Course.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    estimatedTime: req.body.estimatedTime,
    materialsNeeded: req.body.materialsNeeded    
  }); 

  //or use const course = await Course.update(req.params.id); 
});  

//delete
router.delete('/:id', async (req, res) => {
  //display an error if the course isn't found; needs validation, use Joi?

  const course = await Course.findByIdAndRemove(req.params.id); 
});  

module.exports = router; 