import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as profileActions from '../../actions/profileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import TextFieldGroup from '../commons/TextFielddGroup';
class EditProfile extends Component {

constructor(props) {
  super(props);
  this.state = {
   handle: '',
   department: '',
   status: '',
   location: '',
   errors: {},
   profileForm: {
     handle: {
   elementType: 'input',
   elementConfig: {
      type: 'text',
      placeholder: 'handle',

   },
   value: '',
   validation: {
     required: true
   },
   valid: false,
   touched: false
 },
 location: {
   elementType: 'input',
   elementConfig: {
      type: 'text',
      placeholder: 'location',
      error: ''
   },
   value: '',
   validation: {
     required: true
   },
   valid: false,
   touched: false
 },
 department: {
   elementType: 'select',
   elementConfig: {
     options: [{value: 'coe', displayValue: 'coe'},
                {value: 'ccis', displayValue: 'ccis'},
                {value: 'pm', displayValue: 'pm'}
              ],
     placeholder: ''
   },
   value: 'coe',
   validation: {},
   valid: true
 },

     status: {
       elementType: 'select',
       elementConfig: {
         options: [{value: 'underGrad', displayValue: 'underGrad'},
                    {value: 'graduate', displayValue: 'graduate'},
                    {value: 'phd', displayValue: 'phd'}
                  ],
         placeholder: ''
       },
       value: 'graduate',
       validation: {},
       valid: true
     }
}



  }
  this.inputChangedHandler = this.inputChangedHandler.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

}


  componentWillReceiveProps = (nextProps) => {

  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});

  }
if(nextProps.profile.profile) {
  const profile = nextProps.profile.profile;
 profile.location = !isEmpty(profile.location) ? profile.location: '';
 profile.handle = !isEmpty(profile.handle) ? profile.handle: '';
profile.status = !isEmpty(profile.status) ? profile.status: '';
profile.department = !isEmpty(profile.department) ? profile.department: '';


let loc = this.state.profileForm.location.value;
let han = this.state.profileForm.handle.value;
let sta = this.state.profileForm.status.value;
let dep = this.state.profileForm.department.value;

loc = profile.location;

const updatedprofileForm = {
  ...this.state.profileForm
};
let updatedFormElement = {};
if(this.state.profileForm.location){
   updatedFormElement = {
    ...updatedprofileForm['location']
  };
  updatedFormElement.value = profile.location;
  updatedprofileForm['location'] = updatedFormElement;

}

if(this.state.profileForm.handle){
   updatedFormElement = {
    ...updatedprofileForm['handle']
  };
  updatedFormElement.value = profile.handle;
  updatedprofileForm['handle'] = updatedFormElement;

}
if(this.state.profileForm.status){
   updatedFormElement = {
    ...updatedprofileForm['status']
  };
  updatedFormElement.value = profile.status;
  updatedprofileForm['status'] = updatedFormElement;

}
if(this.state.profileForm.department){
   updatedFormElement = {
    ...updatedprofileForm['department']
  };
  updatedFormElement.value = profile.department;
  updatedprofileForm['department'] = updatedFormElement;

}
this.setState({profileForm: updatedprofileForm});

}

  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }


  checkValidity(value, rules) {

let isValid = true;
if(!rules) {
  return true;
}
if(rules.required) {
  isValid = value.trim() !== '' && isValid;
}


return isValid;

}

  inputChangedHandler =(event, inputIdentifier) => {

  const updatedprofileForm = {
    ...this.state.profileForm
  };
  const updatedFormElement = {
    ...updatedprofileForm[inputIdentifier]
  };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
  updatedFormElement.touched = true;
  updatedprofileForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;

  for(let inputIdentifier in updatedprofileForm) {
    formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
  }

  this.setState({profileForm: updatedprofileForm});

  }

  onSubmit(event) {
    event.preventDefault();
    const profileData = {

    handle: this.state.profileForm.handle.value,
location: this.state.profileForm.location.value,
status: this.state.profileForm.status.value,
department: this.state.profileForm.department.value

    }
this.props.createProfile(profileData, this.props.history);
  }

  render () {
    const errors = this.state.errors;

    const formElementArray = [];

    for(let key in this.state.profileForm) {
    console.log('line 147  '+key);
      formElementArray.push({
        id: key,
        config: this.state.profileForm[key]
      });
    }

    let form = formElementArray.map(formElement => (


    <TextFieldGroup
    key={formElement.id}
    elementType={formElement.config.elementType}
    elementConfig={formElement.config.elementConfig}
    value={formElement.config.value}
    changed={(event) => this.inputChangedHandler(event, formElement.id)}
    placeholder={formElement.config.elementConfig.placeholder}
    error={this.state.errors}
    inValid={!formElement.config.valid}

    touched={formElement.config.touched}
    />

    ));

   return (

    <div className="create-profile">

    <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>

{form}


<input type="submit" value="Submit"  className="btn btn-info btn-block mt-4" />
</form>
          </div>
          </div>
          </div>


    </div>

  );



  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors:  PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
   auth: state.auth,
   profile: state.profReducer,
  errors: state.errReducer
  }
}

const mapDispatchToProps = dispatch => {

return {
  createProfile:  (profileData, history) => dispatch(profileActions.createProfile(profileData, history)),
  getCurrentProfile: () => dispatch(profileActions.getCurrentProfile())

}

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
