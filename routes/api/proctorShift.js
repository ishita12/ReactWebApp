const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const PostShift = require('../../models/PostShift');
const Users = require('../../models/User');
const Message = require('../../models/Message');
const DroppedShifts = require('../../models/DroppedShifts');
const validatePostShiftInput = require('../../validation/PostShift');
const ProctorClaimShift = require('../../models/ProctorShift');
const validateClaimShift = require('../../validation/validateClaimShift');
const nodemailer = require('nodemailer');
// @route Get api/proctor
// @desc Get all posted shifts
// @access Private

router.get('/all/:ids', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('loggedin user id is  in all route 1'+req.user.id);

const ids = req.params.ids.split(",");
console.log('ids are   '+req.params.ids);
//console.log('test the ids      '+Object.values(req.body.ids)[0]);



for(var i in ids){
  console.log('in all route   '+ids[i]);
}


PostShift.find({_id: {$nin: ids}})
.then(postedShifts => {
  if(!postedShifts) {
    errors.noPostedShifts = 'There are no shifts posted or that have not been claimed';
    res.status(404).json();
  } else {
    console.log(' The shifts that have not been claimed     '+postedShifts);
    res.json(postedShifts);
  }
}).catch(err => {
  res.status(404).json({postedShift: 'There are no shifts that have been posted'});
});



});








// @route Get api/proctor
// @desc claim shift
// @access Private

router.post('/reclaimShift/:user', passport.authenticate('jwt', { session: false }), (req, res) => {




  const userEmail = req.user.email;
  console.log('user email is    '+userEmail);



  const output =
  `
  <h2>You have Re- claimed your shift </h2>
  <h2>Shift Details </h2>

  <ul>
  <li>Shift Date: ${req.body.shiftDate}</li>
  <li>Station: ${req.body.hall}</li>
  <li>Type: ${req.body.shiftType}</li>
  <li>Time In: ${req.body.timeIn}</li>
  <li>Time Out: ${req.body.timeOut}</li>
  <li>Hours: ${req.body.hours}</li>



  </ul>
  `;

  // create transporter
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'residentialsafetyoffice@gmail.com',
    pass: 'Rso@2018'
  }
  });



  // setup email data with unicode symbols
    let mailOptions = {
        from: 'residentialsafetyoffice@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Shift Re-Claimed ✔', // Subject line

        html: output // html body
    };









const user = req.params.user;

console.log('inside route  claim shift   '+'        ' + '    '+req.params.user+'       '+Object.values(req.body)[2]);
const { errors, isValid } = validateClaimShift(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}


const dateToday = new Date(Date.now());
console.log('todays date is   '+dateToday);

const dateSelected = new Date(req.body.shiftDate);
console.log('date selected    '+dateSelected);

console.log('line 75 in route    '+new Date(dateSelected) >= new Date(dateToday));
if(dateToday > dateSelected) {
  console.log('the date has paased   ');
  errors.passedDate='This date has already passed. You cannot claim this shift now';
  res.status(404).json(errors);
}


else {
console.log('sid is   '+Object.values(req.body.sid));
const newClaimShift = new ProctorClaimShift({
user: req.params.user,
sid: req.body.sid,
hall: req.body.hall,
shiftDate: req.body.shiftDate,
shiftType: req.body.shiftType,
timeIn: req.body.timeIn,
timeOut: req.body.timeOut,
hours: req.body.hours

});

ProctorClaimShift.findOne({user: req.params.user}, (err, newShifts) => {

console.log('the logged in user   '+req.user.name);
console.log('the shift to be added is   '+newClaimShift);
console.log('already present shifts are   '+newShifts);
if(!newShifts) {
console.log('first shift   ');



      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });




  newClaimShift.save().then(shifts => {
     console.log('shift claimed    ');
    res.json(shifts);
  }).catch(err => {
  errors.e1 = err;
    res.status(404).json(errors);
  });

}



if(newShifts) {
  console.log('this user has claimed some shifts !!!!  ');
ProctorClaimShift.findOne({user: req.params.userID, shiftDate: req.body.shiftDate, shiftType: req.body.shiftType}, (err, sh1) => {

if(sh1) {
console.log('cannot claim another shift on the same date and time');
errors.noclaim='You have already claimed a shift on the same date and time';
res.status(404).json(errors);

} else {

ProctorClaimShift.find({user: req.params.userID, shiftDate: req.body.shiftDate}, (err, sh2) => {
let totalHours = 0;


if(sh2) {

for(var i in sh2) {
  console.log('individual hours are   '+sh2[i].hours);
  totalHours = totalHours + sh2[i].hours;
}

console.log('sh2 ssssssss         '+sh2);
console.log('total hours are   '+totalHours);
if(totalHours === 4.00 && newClaimShift.hours === 4.00) {

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });




  newClaimShift.save().then(shifts => {
     console.log(' new shift added    ');
    res.json(shifts);
  }).catch(err => {
    errors.e3=err;
    console.log('There is some error   ');

    res.status(404).json(errors);
  });

} if(totalHours > 4.00 && newClaimShift.hours >4.00 ) {
  errors.cannotClaim="The hour limit is exceeding. Cannot claim this shift"
  res.status(404).json(errors);
}
if(totalHours > 4.00) {
  console.log('Todays hours limit has been met. You cannot claim any more shifts  ');
  errors.limit = 'Todays hours limit has been met. You cannot claim any more shifts';
   res.status(404).json(errors);
}


}

if(sh2.shiftDate === undefined && totalHours === 0) {
console.log('hello   ishita');

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});



  newClaimShift.save().then(shifts => {
     console.log('No other shift has been claimed for this user on this date    '+shifts.id);
    res.json(shifts);
  }).catch(err => {
    errors.e2=err;
    res.status(404).json(errors);
  });

}

})

}

})

}

});
}
});




















// @route Get api/proctor
// @desc claim shift
// @access Private

router.post('/claimShift/:user', passport.authenticate('jwt', { session: false }), (req, res) => {




  const userEmail = req.user.email;

    const sendTo = req.body.email;
    console.log('the first dropper user is     '+sendTo);


  console.log('user email is    '+userEmail);
const output =
   `
   <h2>You have claimed a shift </h2>
   <h2>Shift Details </h2>

   <ul>
   <li>Shift Date: ${req.body.shiftDate}</li>
   <li>Station: ${req.body.hall}</li>
   <li>Type: ${req.body.shiftType}</li>
   <li>Time In: ${req.body.timeIn}</li>
   <li>Time Out: ${req.body.timeOut}</li>
   <li>Hours: ${req.body.hours}</li>



   </ul>
   `;



  const  output2 =
   `
   <h2>Your shift has been claimed  </h2>
   <h2>Shift Details </h2>

   <ul>
   <li> By: ${req.user.name}</li>
   <li>Shift Date: ${req.body.shiftDate}</li>
   <li>Station: ${req.body.hall}</li>
   <li>Type: ${req.body.shiftType}</li>
   <li>Time In: ${req.body.timeIn}</li>
   <li>Time Out: ${req.body.timeOut}</li>
   <li>Hours: ${req.body.hours}</li>



   </ul>
   `;





  // create transporter
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'residentialsafetyoffice@gmail.com',
    pass: 'Rso@2018'
  }
  });



  // setup email data with unicode symbols
    let mailOptions = {
        from: 'residentialsafetyoffice@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Shift Claimed ✔', // Subject line

        html: output // html body
    };


        // setup email data with unicode symbols
          let mailOptions2 = {
              from: 'residentialsafetyoffice@gmail.com', // sender address
              to: sendTo, // list of receivers
              subject: 'Shift Claimed ✔', // Subject line

              html: output2 // html body
          };





const userId = req.params.user;

console.log('inside route  claim shift   '+'        ' + '    '+req.params.user+'       '+Object.values(req.body)[2]);
const { errors, isValid } = validateClaimShift(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}


const dateToday = new Date(Date.now());
console.log('todays date is   '+dateToday);

const dateSelected = new Date(req.body.shiftDate);
console.log('date selected    '+dateSelected);

console.log('line 75 in route    '+new Date(dateSelected) >= new Date(dateToday));
if(dateToday > dateSelected) {
  console.log('the date has paased   ');
  errors.passedDate='This date has already passed. You cannot claim this shift now';
  res.status(404).json(errors);
}


else {
console.log('sid is   '+Object.values(req.body.sid));
const newClaimShift = new ProctorClaimShift({
user: req.params.user,
sid: req.body.sid,
hall: req.body.hall,
shiftDate: req.body.shiftDate,
shiftType: req.body.shiftType,
timeIn: req.body.timeIn,
timeOut: req.body.timeOut,
hours: req.body.hours,
status: req.body.status

});

ProctorClaimShift.findOne({user: req.params.user}, (err, newShifts) => {

console.log('the logged in user   '+req.user.name);
console.log('the shift to be added is   '+newClaimShift);
console.log('already present shifts are   '+newShifts);
if(!newShifts) {
console.log('first shift   ');


      // send mail with defined transport object
      transporter.sendMail(mailOptions2, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });







  newClaimShift.save().then(shifts => {
     console.log('shift claimed    ');
    res.json(shifts);
  }).catch(err => {
  errors.e1 = err;
    res.status(404).json(errors);
  });

}



if(newShifts) {
  console.log('this user has claimed some shifts !!!!  ');
ProctorClaimShift.findOne({user: req.params.user, shiftDate: req.body.shiftDate, shiftType: req.body.shiftType}, (err, sh1) => {

if(sh1) {
console.log('cannot claim another shift on the same date and time');
errors.noclaim='You have already claimed a shift on the same date and time';
res.status(404).json(errors);

} else {

ProctorClaimShift.find({user: req.params.user, shiftDate: req.body.shiftDate}, (err, sh2) => {
let totalHours = 0;


if(sh2) {

for(var i in sh2) {
  console.log('individual hours are   '+sh2[i].hours);
  totalHours = totalHours + sh2[i].hours;
}

console.log('sh2 ssssssss         '+sh2);
console.log('total hours are   '+totalHours);
if(totalHours === 4.00 && newClaimShift.hours === 4.00) {

  // send mail with defined transport object
  transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });




  newClaimShift.save().then(shifts => {
     console.log(' new shift added    ');
    res.json(shifts);
  }).catch(err => {
    errors.e3=err;
    console.log('There is some error   ');

    res.status(404).json(errors);
  });

} if(totalHours > 4.00 && newClaimShift.hours >4.00 ) {
  errors.cannotClaim="The hour limit is exceeding. Cannot claim this shift"
  res.status(404).json(errors);
}
if(totalHours > 4.00) {
  console.log('Todays hours limit has been met. You cannot claim any more shifts  ');
  errors.limit = 'Todays hours limit has been met. You cannot claim any more shifts';
   res.status(404).json(errors);
}


}

if(sh2.shiftDate === undefined && totalHours === 0) {
console.log('hello   ishita');

// send mail with defined transport object
transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});



  newClaimShift.save().then(shifts => {
     console.log('No other shift has been claimed for this user on this date    '+shifts.id);
    res.json(shifts);
  }).catch(err => {
    errors.e2=err;
    res.status(404).json(errors);
  });

}

})

}

})

}

});
}
});
















// @route Get api/proctor
// @desc claim shift
// @access Private

router.post('/claimTheShift/:user', passport.authenticate('jwt', { session: false }), (req, res) => {




  const userEmail = req.user.email;


  console.log('user email is    '+userEmail);
const output  =
   `
   <h2>You have claimed a shift </h2>
   <h2>Shift Details </h2>

   <ul>
   <li>Shift Date: ${req.body.shiftDate}</li>
   <li>Station: ${req.body.hall}</li>
   <li>Type: ${req.body.shiftType}</li>
   <li>Time In: ${req.body.timeIn}</li>
   <li>Time Out: ${req.body.timeOut}</li>
   <li>Hours: ${req.body.hours}</li>



   </ul>
   `;




  // create transporter
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'residentialsafetyoffice@gmail.com',
    pass: 'Rso@2018'
  }
  });



  // setup email data with unicode symbols
    let mailOptions = {
        from: 'residentialsafetyoffice@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Shift Claimed ✔', // Subject line

        html: output // html body
    };









const userId = req.params.user;

console.log('inside route  claim shift   '+'        ' + '    '+req.params.user+'       '+Object.values(req.body)[2]);
const { errors, isValid } = validateClaimShift(req.body);
if(!isValid) {
  console.log('errors present');
  return res.status(400).json(errors);
}


const dateToday = new Date(Date.now());
console.log('todays date is   '+dateToday);

const dateSelected = new Date(req.body.shiftDate);
console.log('date selected    '+dateSelected);

console.log('line 75 in route    '+new Date(dateSelected) >= new Date(dateToday));
if(dateToday > dateSelected) {
  console.log('the date has paased   ');
  errors.passedDate='This date has already passed. You cannot claim this shift now';
  res.status(404).json(errors);
}


else {
console.log('sid is   '+Object.values(req.body.sid));
const newClaimShift = new ProctorClaimShift({
user: req.params.user,
sid: req.body.sid,
hall: req.body.hall,
shiftDate: req.body.shiftDate,
shiftType: req.body.shiftType,
timeIn: req.body.timeIn,
timeOut: req.body.timeOut,
hours: req.body.hours,
status: req.body.status

});

ProctorClaimShift.findOne({user: req.params.user}, (err, newShifts) => {

console.log('the logged in user   '+req.user.name);
console.log('the shift to be added is   '+newClaimShift);
console.log('already present shifts are   '+newShifts);
if(!newShifts) {
console.log('first shift   ');



      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });







  newClaimShift.save().then(shifts => {
     console.log('shift claimed    ');
    res.json(shifts);
  }).catch(err => {
  errors.e1 = err;
    res.status(404).json(errors);
  });

}



if(newShifts) {
  console.log('this user has claimed some shifts !!!!  ');
ProctorClaimShift.findOne({user: req.params.user, shiftDate: req.body.shiftDate, shiftType: req.body.shiftType}, (err, sh1) => {

if(sh1) {
console.log('cannot claim another shift on the same date and time');
errors.noclaim='You have already claimed a shift on the same date and time';
res.status(404).json(errors);

} else {

ProctorClaimShift.find({user: req.params.user, shiftDate: req.body.shiftDate}, (err, sh2) => {
let totalHours = 0;


if(sh2) {

for(var i in sh2) {
  console.log('individual hours are   '+sh2[i].hours);
  totalHours = totalHours + sh2[i].hours;
}

console.log('sh2 ssssssss         '+sh2);
console.log('total hours are   '+totalHours);
if(totalHours === 4.00 && newClaimShift.hours === 4.00) {

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });




  newClaimShift.save().then(shifts => {
     console.log(' new shift added    ');
    res.json(shifts);
  }).catch(err => {
    errors.e3=err;
    console.log('There is some error   ');

    res.status(404).json(errors);
  });

} if(totalHours > 4.00 && newClaimShift.hours >4.00 ) {
  errors.cannotClaim="The hour limit is exceeding. Cannot claim this shift"
  res.status(404).json(errors);
}
if(totalHours > 4.00) {
  console.log('Todays hours limit has been met. You cannot claim any more shifts  ');
  errors.limit = 'Todays hours limit has been met. You cannot claim any more shifts';
   res.status(404).json(errors);
}


}

if(sh2.shiftDate === undefined && totalHours === 0) {
console.log('hello   ishita');

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});



  newClaimShift.save().then(shifts => {
     console.log('No other shift has been claimed for this user on this date    '+shifts.id);
    res.json(shifts);
  }).catch(err => {
    errors.e2=err;
    res.status(404).json(errors);
  });

}

})

}

})

}

});
}
});










// @route Get api/proctor/deleteShiftFromDroppedList
// @desc delete posted shift
// @access Private

router.delete('/deleteShiftFromDroppedList/:sd', passport.authenticate('jwt', { session: false }), (req, res) => {
console.log('in route   deleteShiftFromDroppedList            shift id ->  '+req.params.sd+'            '+req.user.id);
  DroppedShifts.findOneAndRemove({sid: req.params.sd})
  .then((shift) => {
   if(!shift) {
     res.json({success: true})
   } else {

   res.json({success: true});
   }


  });

});








// @route Get api/proctor
// @desc drop shift
// @access Private


router.post('/dropShift/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {

  const userEmail = req.user.email;
  console.log('user email is    '+userEmail);

  const output =
  `
  <h2>You have dropped a shift </h2>
  <h2>Shift Details </h2>

  <ul>
  <li>Shift Date: ${req.body.shiftDate}</li>
  <li>Station: ${req.body.hall}</li>
  <li>Type: ${req.body.shiftType}</li>
  <li>Time In: ${req.body.timeIn}</li>
  <li>Time Out: ${req.body.timeOut}</li>
  <li>Hours: ${req.body.hours}</li>



  </ul>
  `;

  // create transporter
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'residentialsafetyoffice@gmail.com',
    pass: 'Rso@2018'
  }
  });



  // setup email data with unicode symbols
    let mailOptions = {
        from: 'residentialsafetyoffice@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Shift Dropped ', // Subject line

        html: output // html body
    };




const userId = req.params.userID;

console.log('inside route  drop shift   '+'        ' + '    '+req.body.sid+'       '+req.params.userID);
const errors = {};
const t1 = req.body.timeIn.indexOf(":");
const startTime = req.body.timeIn.slice(0,2);
console.log('start time is    '+startTime);
const dropShift = new ProctorClaimShift({
user: req.params.userID,
sid: req.body.sid,
hall: req.body.hall,
shiftDate: req.body.shiftDate,
shiftType: req.body.shiftType,
timeIn: req.body.timeIn,
timeOut: req.body.timeOut,
hours: req.body.hours

});

ProctorClaimShift.findOne({user: req.params.userID, sid: req.body.sid}, (err, dShift) => {

console.log('the logged in user   '+req.user.name);
console.log('the shift to be dropped is   '+dropShift);

if(!dShift) {

  errors.notAvailable = 'Shift Not available';
  res.status(404).json(errors);

}



if(dShift) {


console.log('lets compare dates    '+dShift.shiftDate+'       '+new Date(Date.now()));


  const index = dShift.timeIn.indexOf(":");
  let start=null;
  if(dShift.timeIn.indexOf('AM') > -1) {
      start = dShift.timeIn.slice(0,index);
  } else {
    const s = dShift.timeIn.slice(0,index);
    const s2  = parseInt(s);
    console.log('value of s is   '+parseInt(s));
    start = s2+12;
  }
console.log('the shift start time is  '+start);
  const currentDate = new Date(Date.now());
  if(dShift.shiftDate.getDate() === currentDate.getDate()) {
    console.log('yes its equal');

   console.log('current time is    '+currentDate.getHours());
   if(currentDate.getHours()+3 < start) {
     console.log('The selected shift starts more than 3 hours from now so you can drop it');



     ProctorClaimShift.deleteOne({sid: req.body.sid}, (err, dshift1) => {
       if(err) {
         res.status(err).json(errors);
       }
       else {
          if(!dshift1) {
            errors.notFound = "Shift not found";
            res.status(404).json(errors);
          } else {

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });




            res.json(dropShift);


          }



       }
     })



   }
else {
  errors.cannotDrop='The shift is less than 3 hour to start. You cannot drop it now.';
  res.status(404).json(errors);
}

  } else {
    console.log('not equal');
   // can drop





   ProctorClaimShift.deleteOne({sid: req.body.sid}, (err, dshift1) => {
     if(err) {
       res.status(err).json(errors);
     }
     else {
        if(!dshift1) {
          errors.notFound = "Shift not found";
          res.status(404).json(errors);
        } else {

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          });



          res.json(dropShift);


        }



     }
   })




  }



}

});
});



// @route Get api/proctor
// @desc Get Claimed shift ids
// @access Private

router.get('/getClaimedShiftIds', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('inside getClaimedShiftIds route   ');

ProctorClaimShift.find()
.select({"sid":1, "_id": 0})
.then(ids => {
  if(!ids) {
    console.log('ids are   ');
  res.json(ids);
  } else {
   console.log('the cids of claimed shifts are    '+ids);
    res.json(ids);
  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});

});






// @route Get api/proctor
// @desc Get dropped shift status
// @access Private

router.get('/checkForSelectedDateAndType/:shiftDate/:shiftType', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('inside checkForSelectedDateAndType route      '+req.params.shiftDate+'         '+req.params.shiftType+'         '+req.user.id);

DroppedShifts.findOne({user: req.user.id, shiftDate: req.params.shiftDate, shiftType: req.params.shiftType})
.then(shifts => {
  if(!shifts) {
  console.log('yes you can claim this shift yayyyy   ');
  res.json({success: true});
} if(shifts) {
   console.log('You cannot claim any other shift on this date and time as you already have a shift scheduled for this timing that has not been picked up yet.     '+shifts);
    errors.cannotClaimShift = 'You have dropped a shift at this schedule which has not been claimed yet. Try later';
    res.status(404).json(errors);
  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});



});








// @route Get api/proctor
// @desc Get dropped shift status for other users
// @access Private

router.get('/getUserName/:user/', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
const str = req.params.user.split(',').join('');
const dropuserid = req.params.user;
console.log('inside getUserName route      '+str+'         ');
const user = req.user.is;

Users.findOne({_id: str})
.select({"name":1,"email":1, "_id": 0})
.then(user => {
  if(!user) {
  console.log('nooo  user present ');
} if(user) {
   console.log(' yess     '+user);
  res.json({name: user.name, email: user.email});
  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});



});











// @route Get api/proctor
// @desc Get dropped shift status for other users
// @access Private

router.get('/getIdForUser/:sid/', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};

console.log('inside getIdForUser route      '+req.params.sid+'         ');
const user = req.user.is;

DroppedShifts.findOne({sid: req.params.sid})
.select({"user":1, "_id": 0})
.then(user => {
  if(!user) {
  console.log('nooo  user present ');
} if(user) {
   console.log(' yess   line 1244  '+user);


  res.json({user});


  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});



});










// @route Get api/proctor
// @desc Get dropped shift status for other users
// @access Private

router.get('/checkStatus/:sid', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('inside checkStatus route      '+'         '+req.user.id);
const user = req.user.is;

DroppedShifts.findOne({sid: req.params.sid, user: {$ne: user}})
.then(shift => {
  if(!shift) {
  console.log('nooo   ');
res.json({successDropOrNot: 0});

} if(shift) {
   console.log(' yess     '+shift);
  res.json({ successDropOrNot: 1});
  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});



});











// @route Get api/proctor
// @desc Get all posted shifts
// @access Private

router.get('/allShifts', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('loggedin user id is  in all route '+req.user.id);



PostShift.find()
.then(postedShifts => {
  if(!postedShifts) {
    errors.noPostedShifts = 'There are no shifts posted or that have not been claimed';
    res.status(404).json();
  } else {
    console.log('inside all available shifts  '+postedShifts);
    res.json(postedShifts);
  }
}).catch(err => {
  res.status(404).json({postedShift: 'There are no shifts that have been posted'});
});
});






// @route Get api/proctor
// @desc Get Individual schedule
// @access Private

router.get('/mySchedule/:uid/:idarr', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('mySchedule user id is   '+req.params.uid);
const arr = req.params.idarr;
let arr2=[];

arr2=arr.split(',');

for(var i in arr2) {
  console.log('the array 2 elements are ->      '+arr2[i]);
}



console.log('The available ids are   ->             '+typeof req.params.idarr);
ProctorClaimShift.find({user: req.params.uid, sid: {$in:  arr2}  })
.populate('shift', ['shiftDate', 'hall', 'shiftType', 'timeIn', 'timeOut', 'hours'])
.then(myShifts => {
  if(!myShifts) {
    errors.myShifts = 'There are no shifts posted';
    res.status(404).json();
  } else {
    console.log('inside all shifts  '+myShifts);
    res.json(myShifts);
  }
}).catch(err => {
  res.status(404).json({myShifts: 'There are no shifts that have been posted'});
});



});



// @route Get api/proctor
// @desc Get ids of all available shifts
// @access Private

router.get('/getAvailableShiftIds', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('Inside getAvailableShiftIds route   ');
PostShift.find()
.select({"_id":1})
.then(shiftids => {
  if(!shiftids) {
    errors.shiftids = 'There are no shifts posted';
    res.status(404).json();
  } else {
    console.log('inside getAvailableShiftIds shifts  '+shiftids);
    res.json(shiftids);
  }
}).catch(err => {
  res.status(404).json({myShifts: 'There are no shifts that have been posted'});
});



});









// @route POST api/postShift
// @desc Create a shift
// @access Private

router.post('/saveDropShift/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

// Get fields

console.log('inside route  saveDropShift      '+req.params.id);
const errors = {};

DroppedShifts.findOne({sid: req.body.sid, user: req.params.id}, (err, newDroppedShifts) => {

  if(newDroppedShifts) {
  console.log('This shift has already been dropped  ');

    return res.status(400).json(errors);
  } else {


  const newDroppedShift = new DroppedShifts({
  user: req.params.id,
  sid: req.body.sid,
  hall: req.body.hall,
  shiftType: req.body.shiftType,
  shiftDate: req.body.shiftDate,
  timeIn: req.body.timeIn,
  timeOut: req.body.timeOut,
  hours: req.body.hours

  });


  //let date3 = date1.toISOString();
  console.log('inside route new shift     '+'    '+req.body.hall+'     '+req.body.shiftType+ '   '+req.body.shiftDate);
  newDroppedShift.save().then(newShift => {
    console.log('yes  it has been saved   ');
    res.json(newDroppedShift);
  }).catch(err => {
    console.log('its an error   ');
    res.status(404).json(err);
  });

  }



});
});




// @route Get api/proctor
// @desc Get dropped shift ids for logged in user
// @access Private

router.get('/getDroppedShiftIdsByLoggedInUser/:uid', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('loggedin user id in getDroppedShiftIdsByLoggedInUser route is   '+req.params.uid);


DroppedShifts.find({user: req.params.uid})
.select({"sid":1, "_id": 0})
.then(droppedIDS => {
  console.log('lie 502          '+droppedIDS.length);
  if(droppedIDS.length === 0) {
    console.log('No shifts have been dropped by this user so all available yayyy');
    res.json({success: true});
  } else {
  console.log('This user has dropped some of the shifts '+ Object.values(droppedIDS));
   res.json(droppedIDS);



  }
}).catch(err => {
  res.status(404).json({postedShift: 'There are no shifts that have been posted'});
});
});



// // @route Get api/proctor
// @desc Get filtered shifts for selected hall and type
// @access Private

router.get('/getVal2/:hall/:type', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('inside getVal2 route      '+req.params.hall+'         '+req.params.type+'         '+req.user.id);

console.log(' the shifts before filter are      '+req.body.shifts);


/*
PostShift.findOne({shiftDate: req.params.shiftDate, shiftType: req.params.shiftType})
.then(shifts => {
  if(!shifts) {
  console.log('yes you can claim this shift yayyyy   ');
  res.json({success: true});
} if(shifts) {
   console.log('You cannot claim any other shift on this date and time as you already have a shift scheduled for this timing that has not been picked up yet.     '+shifts);
    errors.cannotClaimShift = 'You have dropped a shift at this schedule which has not been claimed yet. Try later';
    res.status(404).json(errors);
  }
}).catch(err => {
  res.status(404).json({claimshift: 'There are no shifts that have been claimed'});
});

*/

});






// @route Get api/proctor
// @desc Get dropped shifts for logged In user
// @access Private

router.get('/checkIfUserHasDroppedShifts/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('Inside checkIfUserHasDroppedShifts route   logged In user   ->   '+req.params.userID);

DroppedShifts.find({user: req.params.userID})
.then(droppedShiftsByloggeduser => {
console.log('the details are    ->    '+Object.values(droppedShiftsByloggeduser));

  if(Object.keys(droppedShiftsByloggeduser).length === 0) {
console.log('This user has not dropped any shifts yet     ');
res.json({droppedShiftsByloggeduser: null});

  } else {
   console.log('The shifts dropped by loggedIn user are  ->    '+ Object.values(droppedShiftsByloggeduser));
    res.json(droppedShiftsByloggeduser);
  }
}).catch(err => {
  res.status(404).json(err);
});

});






// @route POST api/proctor
// @desc Create a shift
// @access Private

router.post('/sendMessage', passport.authenticate('jwt', { session: false }), (req, res) => {

  const errors = {};
 console.log('Inside send message route !!!!    ');
  Message.findOne({user: req.body.user, sid: req.body.sid}, (err, newMsg) => {


if(newMsg) {
console.log('There is already an entry for this shift for this user ');
res.json({msg: "No new message"});

}
else {

const ds1 = new Date(req.body.shiftDate);
console.log('Test value of date ->         '+ds1);

    const message = 'You have missed this shift';

      const newMessage = new Message({
      user: req.body.user,
      sid: req.body.sid,
      hall: req.body.hall,
      shiftType: req.body.shiftType,
      shiftDate: req.body.shiftDate,
      timeIn: req.body.timeIn,
      timeOut: req.body.timeOut,
      hours: req.body.hours,
      message: message

      });


      //let date3 = date1.toISOString();
      console.log('inside route send message     '+'    '+req.body.hall+'     '+req.body.shiftType+ '   '+newMessage.shiftDate);
      newMessage.save().then(msg => {
        console.log('yes  it has been saved   ');
        res.json(msg);
      }).catch(err => {
        console.log('its an error   ');
        res.status(404).json(err);
      });


}



  });




});






// @route Get api/proctor
// @desc Get messages
// @access Private

router.get('/getMyMessages/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
//console.log('loggedin user id is   '+req.user.id);
console.log('Inside getMyMessages route   logged In user   ->   '+req.params.userID);

Message.find({user: req.params.userID})
.then(myMessages => {


  if(!myMessages) {
console.log('This user has no messages yet     ');
res.json({myMessages: 'no new messages'});

  } else {
  console.log('Yes you have messages        ->   '+myMessages);
    res.json(myMessages);
  }
}).catch(err => {
  res.status(404).json(err);
});

});









module.exports = router;
