const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const PostShift = require('../../models/PostShift');
const Users = require('../../models/User');
const validatePostShiftInput = require('../../validation/PostShift');

// @route POST api/postShift
// @desc Create a shift
// @access Private

router.post('/singleShift', passport.authenticate('jwt', { session: false }), (req, res) => {

// Get fields

console.log('inside route  ');
const { errors, isValid } = validatePostShiftInput(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}

PostShift.findOne({shiftDate: req.body.shiftDate, shiftType: req.body.shiftType, hall: req.body.hall}, (err, postShift) => {

  if(postShift) {
  console.log('This shift is already posted for this hall');

    return res.status(400).json(errors);
  } else {

  let d = req.body.shiftDate;
  let d1 = new Date(d).toISOString();
  console.log('date entered is   '+d1);
  const newShift = new PostShift({
  user: req.user.id,
  hall: req.body.hall,
  shiftType: req.body.shiftType,
  shiftDate: req.body.shiftDate,
  timeIn: req.body.timeIn,
  timeOut: req.body.timeOut,
  hours: req.body.hours

  });


  //let date3 = date1.toISOString();
  console.log('inside route new shift     '+'    '+req.body.hall+'     '+req.body.shiftType+ '   '+req.body.shiftDate);
  newShift.save().then(postShift => {
    res.json(postShift);
  }).catch(err => {
    console.log('its an error   ');
    res.status(404).json(err);
  });

  }



});
});



// @route POST api/postShift
// @desc update shift
// @access Private




router.post('/updateSingleShift', passport.authenticate('jwt', { session: false }), (req, res) => {

// Get fields

console.log('inside route  ');
const { errors, isValid } = validatePostShiftInput(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}
const date = new Date(req.body.shiftDate);

const date1 = new Date(date);
const ds = new Date(date).toISOString();
date1.setTime( date1.getTime() + date1.getTimezoneOffset()*60*1000 );
console.log('okkk        '+date1.toDateString());
console.log('date ->    '+ds)
const postShiftFields = {};
postShiftFields.user = req.user.id;
if(req.body.shiftDate) {
  postShiftFields.shiftDate = new Date(date1.toDateString());
}
if(req.body.hall) {
  postShiftFields.hall = req.body.hall;
}
if(req.body.shiftType) {
  postShiftFields.shiftType = req.body.shiftType;
}
if(req.body.timeIn) {
  postShiftFields.timeIn = req.body.timeIn;
}
if(req.body.timeOut) {
  postShiftFields.timeOut = req.body.timeOut;
}
if(req.body.hours) {
  postShiftFields.hours = req.body.hours;
}



//let date3 = date1.toISOString();
console.log('inside route details    '+'    '+postShiftFields.hall+'     '+postShiftFields.shiftType+ '   '+postShiftFields.shiftDate);
console.log('take 2   ');

PostShift.findOne({hall: req.body.hall, shiftDate: postShiftFields.shiftDate, shiftType: req.body.shiftType})
.then(postShift => {
  if(postShift) {
    // update profile
    console.log('1');
    console.log('This shift is already present :-)');
PostShift.findOneAndUpdate({hall: req.body.hall, shiftDate: req.body.shiftDate, shiftType: req.body.shiftType}, {$set: postShiftFields}, {new: true})
.then(postShift => {
  console.log('2');
  res.json(postShift);
});

  } else {
    //create shift
console.log('3');
    new PostShift(postShiftFields).save().then(postShift => {
      res.json(postShift);
    })




  }
})



});






// @route Get api/postShift
// @desc Get all posted shifts
// @access Private

router.get('/all/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('loggedin user id is   '+req.params.id);
PostShift.find({user: req.params.id})
.populate('shift', ['shiftDate', 'hall', 'shiftType', 'timeIn', 'timeOut', 'hours'])
.then(postedShifts => {
  if(!postedShifts) {
    errors.noPostedShifts = 'There are no shifts posted';
    res.status(404).json();
  } else {
    console.log('inside all shifts  '+postedShifts._id);
    res.json(postedShifts);
  }
}).catch(err => {
  res.status(404).json({postedShift: 'There are no shifts that have been posted'});
});



});



// @route Get api/postShift/shift
// @desc delete posted shift
// @access Private

router.delete('/shift/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
console.log('in route   '+req.params.id);
  PostShift.findOneAndRemove({_id: req.params.id})
  .then((shift) => {
   if(!shift) {
     errors.shiftNotFound = 'This shift is no longer available';
   } else {
   res.json({success: true});
   }


  });

});




// @route Get api/postShift
// @desc Get single shift
// @access Private

router.get('/shift/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('shift selected for editing is    '+req.params.id);


PostShift.findOne({_id: req.params.id}, (err, shift) => {
  if (err) {
        res.json({ success: false, message: 'Not a valid shift id' }); // Return error message
      } else {

        if (!shift) {
            res.json({ success: false, message: 'shift not found.' }); // Return error message
          } else {
              res.json(shift);
          }
      }
})


});



module.exports = router;
