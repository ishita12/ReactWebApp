import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/proctorActions';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Input from '../commons/Input';

class IndividualShiftClaim extends Component {

constructor(props) {
  super(props);
  const individualShift = this.props.location.state.referrerShift;
  const user = this.props.location.state.referrerUser;
  const date = individualShift.shiftDate;
  console.log('the user for claimin the shift   '+user );
const date1 = new Date(date);

const dateToday = new Date(Date.now());
date1.setTime( date1.getTime() + date1.getTimezoneOffset()*60*1000 );
console.log('date today      '+ dateToday+ '            '+date1 +'            ');
console.log('lets compare the two dates    '+dateToday <= date1);

if(dateToday <= date1) {
  console.log('todays date is before the date selected   ');
} else {
  console.log('the selec date has already passed   ');
}

  this.state = {
  sid: individualShift._id,
  shiftDate: date1.toDateString(),
  hall: individualShift.hall,
  shiftType: individualShift.shiftType,
  timeIn: individualShift.timeIn,
  timeOut: individualShift.timeOut,
  hours: individualShift.hours,
  user: user,
  errors: {},
  disabled: true



  };
this.onSubmit = this.onSubmit.bind(this);
  console.log('in constructor   '+individualShift.hall+'     '+individualShift.sid+'   '+this.state.user);

}

componentDidMount() {
 const individualShift = this.props.location.state.referrerShift;
 const user = this.props.location.state.referrerUser;
console.log('Individual shift hall is   '+individualShift.hall + '   '+user);
}



componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
  }

}


onSubmit(e) {
e.preventDefault();

const shiftData = {

user: this.state.user,
sid: this.state.sid,
shiftDate: this.state.shiftDate,
hall: this.state.hall,
shiftType: this.state.shiftType,
timeIn: this.state.timeIn,
timeOut: this.state.timeOut,
hours: this.state.hours

}

this.props.claimUserShift(shiftData, this.state.user, this.props.history);



}



render () {

const {errors} = this.state;

return (

<div className="individualShiftClaimn">
<div className="container">
<div className="col-md-8 m-auto">
<Link to="/viewPostedShifts" className="btn btn-light">

Go Back
</Link>
<h1 className="display-4 text-center"> Claim Shift</h1>

<form onSubmit={this.onSubmit}>
<h6>Date </h6>
<Input
placeholder="shiftDate"
name="shiftDate"
value={this.state.shiftDate}
disabled={this.state.disabled}

error={errors.shiftDate}
/>
<h6>Hall </h6>
<Input
placeholder="hall"
name="hall"
value={this.state.hall}

error={errors.hall}
disabled={this.state.disabled}

/>
<h6>Shift Type </h6>
<Input
placeholder="shiftType"
name="shiftType"
value={this.state.shiftType}

error={errors.shiftType}
disabled= {this.state.disabled}
/>
<h6>From </h6>
<Input
placeholder="timeIn"
name="timeIn"
value={this.state.timeIn}

error={errors.timeIn}
disabled= {this.state.disabled}

/>

<h6>To </h6>
<Input
placeholder="timeOut"
name="timeOut"
value={this.state.timeOut}

error={errors.timeOut}

disabled= {this.state.disabled}
/>
<h6>Hours </h6>
<Input

placeholder="hours"
name="hours"
value={this.state.hours}
errors={errors.hours}
disabled= {this.state.disabled}
/>
<input type="submit" className="btn btn-info btn-block mt-4" />

</form>
<h3 style={{color:'red'}}>{this.state.errors.noclaim ? this.state.errors.noclaim : null} {this.state.errors.limit ? this.state.errors.limit : null}

   {this.state.errors.cannotClaim ? this.state.errors.cannotClaim : null} {this.state.errors.passedDate ? this.state.errors.passedDate : null}</h3>
</div>
</div>
</div>


)


  }
}




const mapStateToProps = (state) => {
  return {
  shiftsView: state.viewPostedShifts,
  errors: state.errReducer,
    auth: state.auth,
  }
}


const mapDispatchToProps = dispatch => {

  return {

    claimUserShift: (shift, userID, history) => dispatch(actions.claimUserShift(shift, userID, history))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualShiftClaim);
