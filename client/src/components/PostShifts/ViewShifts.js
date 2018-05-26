import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ViewShift from './ViewShift';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/postShiftActions';

class ViewShifts  extends Component {
componentDidMount () {
  const  user  = this.props.auth.user;

  console.log('line 11    '+this.props.postShift.user);
  this.props.getPostedShifts(user.id);
}



  render () {
    const { shifts, loading } = this.props.postShift;
    let postShiftItems;
    if(shifts === null || loading) {
      postShiftItems = <Spinner />;
    } else {
       if(shifts.length > 0) {



      postShiftItems = (<ViewShift  indShift={shifts} />);


       } else {
           postShiftItems = <h4>No Shifts found... </h4>
       }
    }
      return (
    <div className="viewShifts">
    <div className="container">
    <div className="row">
    <div className="col-md-12">
    <h1 className="display-4 text-center">Shifts Posted</h1>
    <p className="lead text-center">

    {postShiftItems}
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
const mapStateToProps = (state) => {
  return {
  postShift: state.postShiftReducer,
  auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {

return {
getPostedShifts: (id) => dispatch(actions.getPostedShifts(id))

}

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewShifts);
