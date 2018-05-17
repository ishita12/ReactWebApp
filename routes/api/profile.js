const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const Users = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

router.get('/test', (req,res) => {

res.json({success: true, message: 'yayyyy'});

});

// @route GET api/profile
// @desc Get current users Profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

const errors = {};

Profile.findOne({ user: req.user.id })
.populate('user', ['name', 'avatar'])
.then(profile => {
if(!profile) {
  console.log('line 23  ');
  errors.noprofile = 'There is no profile for the user';
  return res.status(404).json(errors);
}
res.json(profile);


}).catch(err => {
  res.status(404).json(err);
});


});

// @route POST api/profile
// @desc Create or edit User's Profile
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

// Get fields

const { errors, isValid } = validateProfileInput(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}

const profileFields = {};
profileFields.user = req.user.id;
if(req.body.handle) {
  profileFields.handle = req.body.handle;
}
if(req.body.department) {
  profileFields.department = req.body.department;
}
if(req.body.location) {
  profileFields.location = req.body.location;
}
if(req.body.status) {
  profileFields.status = req.body.status;
}


Profile.findOne({user: req.user.id})
.then(profile => {
  if(profile) {
    // update profile
Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
.then(profile => {
  res.json(profile);
});

  } else {
    //create Profile

   // check if the handle exists
   Profile.findOne({handle: profileFields.handle})
   .then(profile => {
     if(profile) {
       errors.handle = 'This handle already exists';
       res.status(404).json(errors);
     } else {
       // save profile database
       new Profile(profileFields).save().then(profile => {
         res.json(profile);
       })
     }
   });




  }
})



});



module.exports = router;
