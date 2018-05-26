import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import * as shiftActions from '../../actions/postShiftActions';
import { Route, Redirect, withRouter } from 'react-router-dom';

class  ViewShift extends Component {


constructor() {
  super();
  this.state = {
    redirect: false,
    shiftId: ''
  }
}

componentDidMount () {





}
  deleteShift(id) {
    const  user  = this.props.auth.user;

    this.props.deleteShift(id);
    this.props.getPostedShifts(user.id);
  }


editShift(id) {
const  user  = this.props.auth.user;

//this.props.editShift(id);
//this.props.getPostedShifts(user.id);
console.log('edited id is   '+id);

this.setState({shiftId: id, redirect: true});






}


  render () {

    const redirect = this.state.redirect;


    if(redirect) {
      return(
      <Redirect to={{
                    pathname: '/edit-postedShift',
                    state: { referrer: this.state.shiftId }
                }} />
            );

    }


    const shiftsPosted = this.props.indShift.map(shift => (
    <tr key={shift._id}>
    <td> <Moment format="YYYY/MM/DD">{shift.shiftDate}</Moment></td>
    <td>{shift.hall}</td>
    <td>{shift.shiftType}</td>
    <td>{shift.timeIn}</td>
    <td>{shift.timeOut}</td>
    <td>{shift.hours}</td>
    <td><button onClick={this.deleteShift.bind(this, shift._id)} className="btn btn-danger">Delete</button></td>

    <td><button onClick={this.editShift.bind(this, shift._id)} className="btn btn-warning">Edit</button></td>


    </tr>

    ));

  return (

<div>

<table className="table">
<thead>
<tr>
<th>Date</th>
<th>Hall</th>
<th>Type</th>
<th>Time In</th>
<th>Time Out</th>
<th>Hours</th>
</tr>

{shiftsPosted}

</thead>
</table>
</div>

  );
  }
}


const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  shift: state.postShiftReducer
  }
}


const mapDispatchToProps = dispatch => {

  return {
    deleteShift:  (id) => dispatch(shiftActions.deleteShift(id)),
    getPostedShifts: (id) => dispatch(shiftActions.getPostedShifts(id)),
    getSinglePostedShift: (id) => dispatch(shiftActions.getSinglePostedShift(id))
    }

}
ViewShift.propTypes = {
  deleteShift: PropTypes.func.isRequired,
  getPostedShifts:  PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewShift);
