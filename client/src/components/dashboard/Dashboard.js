import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { connect } from 'react-redux';
import  Spinner  from '../commons/Spinner';
import * as dashboardActions from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

componentDidMount() {
  this.props.getCurrentProfile();
}

  render () {

const { user } = this.props.auth;
const { profile, loading } = this.props.profile;

let dash = null;
if(profile === null || loading) {
  dash = <Spinner />
} else {

// to check if the loggedin user has created the profile
console.log('line 26  '+user.name);
if (Object.keys(profile).length > 0) {
  // display profile
  dash = <h2> Your profile </h2>
} else {
// profile is not present so create one.

dash = (
  <div>
<p className="lead text-muted"> Welcome { user.name } </p>

<h3> You do not have a profile. Please create one </h3>
<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>

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
  profReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
  profile: state.profReducer,
  auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {

return {
getCurrentProfile:  (newUser, history) => dispatch(dashboardActions.getCurrentProfile(newUser, history))
}

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
