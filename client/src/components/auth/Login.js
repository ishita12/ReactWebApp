import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as loginActions from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../commons/TextFielddGroup';

class Login extends Component {

  constructor() {
    super();
    this.state = {

      email: '',
      password: '',
      role: '',
      errors: {},
      loginForm: {
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


    role: {
      elementType: 'select',
      elementConfig: {
        options: [{value: 'supervisor', displayValue: 'supervisor'},
                   {value: 'proctor', displayValue: 'proctor'}
                 ],
        placeholder: 'role',
        error: ''
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
/*    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } */
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

  const updatedLoginForm = {
    ...this.state.loginForm
  };
  const updatedFormElement = {
    ...updatedLoginForm[inputIdentifier]
  };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
  updatedFormElement.touched = true;
  updatedLoginForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;

  for(let inputIdentifier in updatedLoginForm) {
    formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
  }

  this.setState({loginForm: updatedLoginForm});

  }

  onSubmit(event) {
    event.preventDefault();

    const loginUser = {

        email: this.state.loginForm.email.value,
          password: this.state.loginForm.password.value,
          role: this.state.loginForm.role.value
    }
  this.props.loginUser(loginUser);
  }
  onChange(event) {
  this.setState({[event.target.name]: event.target.value})
  console.log('line 122   '+this.state.email+'   '+this.state.password);
  }


  componentWillReceiveProps = (nextProps) => {
if(nextProps.auth.isAuthenticated) {
  this.props.history.push('/dashboard');
}

  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
    console.log('line 133 '+this.state.errors);
  }
  }


  render () {

const errors = this.state.errors;

const formElementArray = [];

for(let key in this.state.loginForm) {
console.log('line 147  '+key);
  formElementArray.push({
    id: key,
    config: this.state.loginForm[key]
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

     <div className="login">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">Log In</h1>
               <p className="lead text-center">Sign in to your Proctor account</p>
               <form onSubmit={this.onSubmit}>

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

Login.propTypes = {

loginUser: PropTypes.func.isRequired,
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
loginUser:  (loginUser) => dispatch(loginActions.loginUser(loginUser))
}

}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
