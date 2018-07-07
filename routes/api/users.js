const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/database');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get('/test', (req,res) => {


res.json({success: true, message: 'yayyyy'});


});


router.post('/register', (req, res) => {

const { errors, isValid } = validateRegisterInput(req.body);
if(!isValid) {
  return res.status(400).json(errors);
}

User.findOne({email: req.body.email}, (err, user) => {

if(user) {
  errors.email = 'email already exists';
  return res.status(400).json(errors);
} else {

 const avatar = gravatar.url(req.body.email, {
s: '200',  //size
r: 'pg', //rating
d: 'mm' //default

 });

  const newUser = new User({

  name: req.body.name,
  email: req.body.email,
  avatar: avatar,
  password: req.body.password,
  role: req.body.role

  });

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) {
      throw err;
    }
    newUser.password = hash;
    newUser.save().then(user => {
      res.json(user)
    }).catch(err => {
      console.log(err);
    })
  })
})

}

});

});


router.post('/login', (req,res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
const password = req.body.password;
const role = req.body.role;
User.findOne({email: email}, (err, user) => {
if(!user) {
  errors.email = 'user not found';
  return res.status(404).json(errors);
}
if(user.role !== role) {
  errors.role = 'role does not match';
  return res.status(404).json(errors);
}

else {

bcrypt.compare(password, user.password).then(isMatch => {
  if(isMatch) {
    console.log('line 97   '+user.role);
const payload = { id: user.id, name: user.name, avatar: user.avatar, role: user.role };// creating jwt payload

  jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {

      res.json({success: true, token: 'Bearer ' + token });
  });

  } else {
    errors.password = 'password is incorrect';
    return res.status(400).json(errors);
  }
});

}


});

});


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {


  res.json(
    {
      id: req.user.id,
name: req.user.name,
email: req.user.email,
role: req.user.role
   }
 );
});








module.exports = router;
