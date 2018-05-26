const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const Users = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateEducationInput = require('../../validation/education');

router.get('/test', (req,res) => {

res.json({success: true, message: 'yayyyy'});

});

// @route GET api/profile
// @desc Get current users Profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

const errors = {};

Profile.findOne({ user: req.user.id })
.populate('user', ['name', 'avatar', 'role'])
.then(profile => {
if(!profile) {
  console.log('line 23  ');
  errors.noprofile = 'There is no profile for the user';
  return res.status(404).json(errors);
}
console.log('inside current route  '+profile.status);
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


// @route Get api/profile/handle/:handle
// @desc Get profile by handle
// @access Private

router.get('/handle/:handle', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
Profile.findOne({handle: req.params.handle})
.populate('user', ['name', 'avatar'])
.then(profile => {
  if(!profile) {
    errors.noprofile = 'There is no profile for this user';
    res.status(404).json(errors);
  } else {
    res.json(profile);
  }
}).catch(err => {
  res.status(404).json(err);
});


});


// @route Get api/profile/user/:user_id
// @desc Get profile by id
// @access Private

router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
Profile.findOne({user: req.params.user_id})
.populate('user', ['name', 'avatar'])
.then(profile => {
  if(!profile) {
    errors.noprofile = 'There is no profile for this user';
    res.status(404).json(errors);
  } else {
    res.json(profile);
  }
}).catch(err => {
  res.status(404).json({profile: 'There is no profile for this user'});
});


});


// @route Get api/profile/all
// @desc Get all profiles
// @access Private

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
Profile.find()
.populate('user', ['name', 'avatar'])
.then(profiles => {
  if(!profiles) {
    errors.noprofile = 'There are no profiles';
    res.status(404).json();
  } else {
    res.json(profiles);
  }
}).catch(err => {
  res.status(404).json({profile: 'There is no profiles'});
});



});


// @route Get api/profile/experience
// @desc Add experience
// @access Private

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
Profile.findOne({user: req.user.id})
.then(profile => {
const newExp = {
  title: req.body.title,
  dept: req.body.dept,
  from: req.body.from,
  to: req.body.to,
  description: req.body.description
}

// add to experience

profile.experience.unshift(newExp);
profile.save().then(profile => {
  res.json(profile);
});

});


});


// @route Get api/profile/education
// @desc Add experience
// @access Private

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  if(!isValid) {

    return res.status(400).json(errors);
  }

Profile.findOne({user: req.user.id})
.then(profile => {
const newEdu = {
  school: req.body.school,
  degree: req.body.degree,
  fieldofstudy: req.body.fieldofstudy,
  from: req.body.from,
  to: req.body.to,
  current: req.body.current
}

// add to experience

profile.education.unshift(newEdu);
profile.save().then(profile => {
  res.json(profile);
});

});


});



// @route Get api/profile/experience
// @desc delete experience
// @access Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {

Profile.findOne({user: req.user.id}).then(profile => {

const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

profile.experience.splice(removeIndex, 1);
profile.save().then(profile => {
  res.json(profile);
}).catch(err => {
  res.status(404).json(err);
});


});



});


// @route Get api/profile/education
// @desc delete experience
// @access Private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {

Profile.findOne({user: req.user.id}).then(profile => {

const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

profile.education.splice(removeIndex, 1);
profile.save().then(profile => {
  res.json(profile);
}).catch(err => {
  res.status(404).json(err);
});


});

});


// @route Get api/profile
// @desc delete profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

Profile.findOneAndRemove({user: req.user.id})
.then(() => {

 Users.findOneAndRemove({_id: req.user.id})
 .then(() => {
   res.json({success: true});
 })

});


});




module.exports = router;
