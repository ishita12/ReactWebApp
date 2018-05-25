import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProfileHeader from './ProfileHeader';
import ProfileCred from './ProfileCred';
import ProfileAbout from './ProfileAbout';
import Spinner from '../commons/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/profileActions';

class Profile extends Component {

componentDidMount() {
if(this.props.match.params.handle) {
  this.props.getProfileByHandle(this.props.match.params.handle);
}


}

componentWillReceiveProps(nextProps) {
  if(nextProps.profile.profile === null && this.props.profile.loading) {
    this.props.history.push('/not-found');
  }
}

render () {

const { profile, loading } = this.props.profile;
let profileContent;

if(profile === null || loading) {
  profileContent = <Spinner />
} else {
  profileContent = (
    <div>
    <div className="row">
   <div className="col-md-6">
<Link to="/profiles" className="btn btn-light mb-3 float-left">
Back to profiles
</Link>
</div>
<div className="col-md-6" />
</div>


<ProfileHeader profile={profile}>



</ProfileHeader>

<ProfileAbout profile={profile}>



</ProfileAbout>

<ProfileCred education={profile.education}>



</ProfileCred>

</div>
  )
}


return (
<div className="profile">
<div className="container">
<div className="row">
<div className="col-md-12">
{profileContent}

</div>
</div>
</div>
</div>

)
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
   profile: state.profReducer
  }
}


const mapDispatchToProps = dispatch => {

return {
    getProfileByHandle: (handle) => dispatch(actions.getProfileByHandle(handle))

}

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
