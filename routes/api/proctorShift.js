const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const PostShift = require('../../models/PostShift');
const Users = require('../../models/User');
const DroppedShifts = require('../../models/DroppedShifts');
const validatePostShiftInput = require('../../validation/PostShift');
const ProctorClaimShift = require('../../models/ProctorShift');
const validateClaimShift = require('../../validation/validateClaimShift');

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

router.post('/claimShift/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {


const userId = req.params.userID;

console.log('inside route  claim shift   '+'        ' + '    '+req.params.userID+'       '+Object.values(req.body)[2]);
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
user: req.params.userID,
sid: req.body.sid,
hall: req.body.hall,
shiftDate: req.body.shiftDate,
shiftType: req.body.shiftType,
timeIn: req.body.timeIn,
timeOut: req.body.timeOut,
hours: req.body.hours

});

ProctorClaimShift.findOne({user: req.params.userID}, (err, newShifts) => {

console.log('the logged in user   '+req.user.name);
console.log('the shift to be added is   '+newClaimShift);
console.log('already present shifts are   '+newShifts);
if(!newShifts) {
console.log('first shift   ');



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






// @route Get api/postShift
// @desc Get all posted shifts
// @access Private

router.get('/mySchedule/:uid', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
console.log('mySchedule user id is   '+req.params.uid);
ProctorClaimShift.find({user: req.params.uid})
.populate('shift', ['shiftDate', 'hall', 'shiftType', 'timeIn', 'timeOut', 'hours'])
.then(myShifts => {
  if(!myShifts) {
    errors.myShifts = 'There are no shifts posted';
    res.status(404).json();
  } else {
    console.log('inside all shifts  '+myShifts._id);
    res.json(myShifts);
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






module.exports = router;