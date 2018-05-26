import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as actions from '../../actions/profileActions';
import Spinner from '../commons/Spinner';
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';
class Profiles extends Component {

componentDidMount() {
  this.props.getProfiles();
}

  render () {

const { profiles, loading } = this.props.profile;
let profileItems;
if(profiles === null || loading) {
  profileItems = <Spinner />;
} else {
   if(profiles.length > 0) {


profileItems = profiles.map(profile => (
  <ProfileItem key={profile._id} profile={profile} />
))

   } else {
       profileItems = <h4>No Profiles found... </h4>
   }
}
  return (
<div className="profiles">
<div className="container">
<div className="row">
<div className="col-md-12">
<h1 className="display-4 text-center">Proctor Profiles</h1>
<p className="lead text-center">

{profileItems}
</p>
<Link to="/dashboard" className="btn btn-light mb-3 float-left">
Back
</Link>
</div>
</div>
</div>
</div>



    )

  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
  profile: state.profReducer
  }
}
const mapDispatchToProps = dispatch => {

return {
getProfiles: () => dispatch(actions.getProfiles())

}

}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
