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

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

// Get fields

const { errors, isValid } = validatePostShiftInput(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}

const postShiftFields = {};
postShiftFields.user = req.user.id;
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


new PostShift(postShiftFields).save().then(postShift => {
  res.json(postShift);
}).catch(err => {
  res.status(404).json(err);
});




});



module.exports = router;
