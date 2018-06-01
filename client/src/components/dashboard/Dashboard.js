import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { connect } from 'react-redux';
import  Spinner  from '../commons/Spinner';
import  Profile from './Profile';
import ShiftOptions from './ShiftOptions';
import ProctorShiftOptions from './ProctorShiftOptions';
import * as dashboardActions from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Education from './Education';
import PostShifts from '../PostShifts/PostShifts';
import ViewShifts from '../PostShifts/ViewShifts';
import ViewPostedShifts from '../ProctorShifts/ViewPostedShifts';
import MySchedule from '../Schedule/MySchedule';
import * as proctorActions from '../../actions/proctorActions';


class Dashboard extends Component {
  constructor(props) {
  super(props);

this.state = {
  idArray: []
}

  this.props.getClaimedShiftIds();
  const claimedIds = this.props.viewPostedShifts.claimedIds;

  for(var i in Object.values(claimedIds)) {
    console.log('in for loop   ');
    if (claimedIds.hasOwnProperty(i)) {

       this.state.idArray.push(Object.values(claimedIds[i]));
        console.log('test' + " -> " + this.state.idArray[i]);
   }

  }


  }

componentDidMount() {
  this.props.getCurrentProfile();
  const {updatedShifts} = this.props.viewPostedShifts;
  const sd = updatedShifts.sid;
  console.log('the id of claimed shift is   '+ updatedShifts.sid);
//  this.props.deleteShiftFromDroppedList(sd);


}



componentWillMount() {
  this.props.getClaimedShiftIds();
  const claimedIds = this.props.viewPostedShifts.claimedIds;

  for(var i in Object.values(claimedIds)) {
    console.log('in for loop   ');
    if (claimedIds.hasOwnProperty(i)) {

       this.state.idArray.push(Object.values(claimedIds[i]));
        console.log('test' + " -> " + this.state.idArray[i]);
   }

  }

}

onDelete(event) {
  this.props.deleteAccount();
}

  render () {
const{updatedShifts} = this.props.viewPostedShifts;
console.log('in render      '+Object.values(Object.values(updatedShifts)));
const { user } = this.props.auth;
const { profile, loading } = this.props.profile;
const role = user.role;
console.log('role is  '+role);
let post = null;
let post1=null;

if(role === 'supervisor') {
  post= (

<ShiftOptions />

  )
  console.log('post shift');
} else if(role === 'proctor') {
  post=(
    <ProctorShiftOptions />
    );


  console.log('proctor shift');
} else {
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
  <div style={{ marginBottom: '60px' }}></div>
</div>


  );
} else {
// profile is not present so create one.

dash = (
  <div>
<p className="lead text-muted"> Welcome { user.name } </p>


<h3> You do not have a profile. Please create one </h3>
<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
  <div style={{ marginBottom: '60px' }}></div>
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
{post1}
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
  auth: state.auth,
  viewPostedShifts: state.viewPostedShifts
  }
}

const mapDispatchToProps = dispatch => {

return {
getCurrentProfile:  (newUser, history) => dispatch(dashboardActions.getCurrentProfile(newUser, history)),
deleteAccount: () => dispatch(dashboardActions.deleteAccount()),
//deleteClaimedShift: (sid) => dispatch(proctorActions.deleteClaimedShift(sid))
getClaimedShiftIds: () => dispatch(proctorActions.getClaimedShiftIds()),

deleteShiftFromDroppedList: (sd) => dispatch(proctorActions.deleteShiftFromDroppedList(sd))
}

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
