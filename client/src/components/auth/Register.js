import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as registerActions from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../commons/TextFielddGroup';
class Register extends Component {

constructor() {
  super();
  this.state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    registerForm: {
      name: {
    elementType: 'input',
    elementConfig: {
       type: 'text',
       placeholder: 'name',

    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
      email: {
    elementType: 'input',
    elementConfig: {
       type: 'text',
       placeholder: 'email',

    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
       type: 'password',
       placeholder: 'password',
       error: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  password2: {
    elementType: 'input',
    elementConfig: {
       type: 'password',
       placeholder: 'password2',
       error: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },

  role: {
    elementType: 'select',
    elementConfig: {
      options: [{value: 'supervisor', displayValue: 'supervisor'},
                 {value: 'proctor', displayValue: 'proctor'}
               ],
      placeholder: ''
    },
    value: 'supervisor',
    validation: {},
    valid: true
  }
}
  }
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}
componentDidMount() {
  if(this.props.auth.isAuthenticated) {
    this.props.history.push('/dashboard');
  }
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

const updatedRegisterForm = {
  ...this.state.registerForm
};
const updatedFormElement = {
  ...updatedRegisterForm[inputIdentifier]
};
updatedFormElement.value = event.target.value;
updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
updatedFormElement.touched = true;
updatedRegisterForm[inputIdentifier] = updatedFormElement;

let formIsValid = true;

for(let inputIdentifier in updatedRegisterForm) {
  formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
}

this.setState({registerForm: updatedRegisterForm});

}

componentWillReceiveProps = (nextProps) => {

if(nextProps.errors) {
  this.setState({errors: nextProps.errors});
  console.log(this.state.errors);
}
}


onSubmit(event) {
  event.preventDefault();
  const newUser = {
    name: this.state.registerForm.name.value,
      email: this.state.registerForm.email.value,
        password: this.state.registerForm.password.value,
          password2: this.state.registerForm.password2.value
  }

this.props.registerUser(newUser, this.props.history);
}
onChange(event) {
this.setState({[event.target.name]: event.target.value})
}
  render () {

//const  user = this.props.auth.user;

const {errors} = this.state;


const formElementArray = [];

for(let key in this.state.registerForm) {
console.log('line 147  '+key);
  formElementArray.push({
    id: key,
    config: this.state.registerForm[key]
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

     <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your proctor account</p>
              <form noValidate onSubmit={this.onSubmit}>

                       {form}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>




   );
  }

}

Register.propTypes = {

registerUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
errors: PropTypes.object.isRequired

}


const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  errors: state.errReducer
  }
}

const mapDispatchToProps = dispatch => {

return {
registerUser:  (newUser, history) => dispatch(registerActions.registerUser(newUser, history))
}

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
