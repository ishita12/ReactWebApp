const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';

  if(validator.isEmpty(data.handle)) {
    console.log('handleeeee' + data.handle);
    errors.handle = 'Handle is required';
  }

if(!validator.isLength(data.handle, { min: 2, max: 40 })) {

  errors.handle = 'Handle needs to be between 2 and 40 characters';
}


if(validator.isEmpty(data.status)) {
  console.log('statusss'+ data.status);
  errors.status = 'status is required';
}



  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
