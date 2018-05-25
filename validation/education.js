const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if(validator.isEmpty(data.school)) {

    errors.school = 'School is required';
  }



if(validator.isEmpty(data.degree)) {

  errors.degree = 'degree is required';
}





if(validator.isEmpty(data.from)) {

  errors.from = 'from field is required';
}



  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
