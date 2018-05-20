import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as loginActions from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

class Login extends Component {

  constructor() {
    super();
    this.state = {

      email: '',
      password: '',
      title: '',
      errors: {}
      }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const loginUser = {

        email: this.state.email,
          password: this.state.password,
          title: this.state.title
    }
  this.props.loginUser(loginUser);
  }
  onChange(event) {
  this.setState({[event.target.name]: event.target.value})
  }


  componentWillReceiveProps = (nextProps) => {
if(nextProps.auth.isAuthenticated) {
  this.props.history.push('/dashboard');
}

  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
    console.log(this.state.errors);
  }
  }


  render () {

const errors = this.state.errors;

   return (

     <div className="login">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">Log In</h1>
               <p className="lead text-center">Sign in to your Proctor account</p>
               <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                   <select className="form-control form-control-lg" value={this.state.title}>
                    <option value="supervisor" value={this.state.title}>supervisor</option>
                      <option value="proctor" value={this.state.title}>proctor</option>
                    </select>
                  </div>
                   <div className="form-group">
                   <input type="email"
                     className={classnames('form-control form-control-lg', {
                       'is-invalid': errors.email
                     })}
                     value={this.state.email}
                     onChange={this.onChange}
                      placeholder="Email Address" name="email" />
                   {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

               </div>
                 <div className="form-group">
                   <input type="password"
                     className={classnames('form-control form-control-lg', {
                       'is-invalid': errors.password
                     })}
                     value={this.state.password}
                      onChange={this.onChange}
                  
                      placeholder="Password" name="password" />
                   {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

               </div>
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
