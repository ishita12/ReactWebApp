import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { connect } from 'react-redux';
import  Spinner  from '../commons/Spinner';
import  Profile from './Profile';
import * as dashboardActions from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Education from './Education';
import PostShifts from '../PostShifts/PostShifts';
class Dashboard extends Component {

componentDidMount() {
  this.props.getCurrentProfile();

}

onDelete(event) {
  this.props.deleteAccount();
}

  render () {

const { user } = this.props.auth;
const { profile, loading } = this.props.profile;
const role = user.role;
console.log('role is  '+role);
let post = null;
if(role === 'supervisor') {
  post=<Link to="/postShifts" component={PostShifts} className="btn btn-warning mb-3 float-left">Post Shifts Here</Link>
  console.log('post shift');
} else {
  post = null;
}
let dash = null;
if(profile === null || loading) {
  dash = <Spinner />
} else {

// to check if the loggedin user has created the profile
console.log('line 26  '+user.name);
if (Object.keys(profile).length > 0) {
  // display profile
  dash = (

<div>

<p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
<Profile />
<Education education={profile.education}/>

<div style={{ marginBottom: '60px' }}></div>
<button onClick={this.onDelete.bind(this)} className="btn btn-danger">Delete My Account</button>
  <div style={{ marginBottom: '60px' }}></div><Link to="/profiles" className="btn btn-success mb-3 float-left">
  View Proctor profiles
  </Link>
</div>


  );
} else {
// profile is not present so create one.

dash = (
  <div>
<p className="lead text-muted"> Welcome { user.name } </p>


<h3> You do not have a profile. Please create one </h3>
<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
  <div style={{ marginBottom: '60px' }}></div><Link to="/profiles" className="btn btn-success mb-3 float-left">
  View Proctor profiles
  </Link>
  </div>
);


}

}

   return (
     <div className="dashboard">

  <div className="container">
  <div className="row">
 <div className="col-md-12">
<h1 className="display-4"> Welcome to your dashboard</h1>

{dash}
{post}

</div>
  </div>
   </div>
     </div>

   );


  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  profile: state.profReducer,
  auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {

return {
getCurrentProfile:  (newUser, history) => dispatch(dashboardActions.getCurrentProfile(newUser, history)),
deleteAccount: () => dispatch(dashboardActions.deleteAccount())

}

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
