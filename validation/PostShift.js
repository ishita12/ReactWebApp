const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostShiftInput(data) {
  let errors = {};

  data.hall = !isEmpty(data.hall) ? data.hall : '';
  data.shiftType = !isEmpty(data.shiftType) ? data.shiftType : '';
console.log('inside validator    '+typeof data.hall);


  if(validator.isEmpty(data.hall)) {
    console.log('hall is empty  ');
    errors.hall = 'Hall is required';
  }
  if(validator.isEmpty(data.shiftType)) {

    errors.shiftType = 'shiftType is required';
  }
  if(validator.isEmpty(data.shiftDate)) {

    errors.shiftDate = 'shiftDate is required';
  }

  if(validator.isEmpty(data.timeIn)) {

    errors.timeIn = 'Time In is required';
  }
  if(validator.isEmpty(data.timeOut)) {

    errors.timeOut = 'Time Out is required';
  }



  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
