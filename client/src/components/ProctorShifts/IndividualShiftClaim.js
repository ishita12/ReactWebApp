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



//  setTimeout(function() {this.checkShift(individualShift.shiftDate, individualShift.shiftType);}.bind(this), 1000);

this.onSubmit = this.onSubmit.bind(this);
  console.log('in constructor   '+individualShift.hall+'     '+individualShift.sid+'   '+this.state.user+'           '+date1);

}

componentDidMount() {
 const individualShift = this.props.location.state.referrerShift;
 const user = this.props.location.state.referrerUser;




console.log('Individual shift hall is   '+individualShift.hall + '   '+user);
}



checkShift(shiftDate, shiftType) {


}


componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
  }

}


onSubmit(e) {
e.preventDefault();
 const user = this.props.location.state.referrerUser;
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


const {checkDroppedShift} =this.props.shiftsView;
//const {checkStatus} = this.props.shiftsView;

this.props.checkForSelectedDateAndType(shiftData.shiftDate, shiftData.shiftType);




  setTimeout(function() {   this.props.checkStatus(shiftData.sid); }.bind(this), 1000);




  setTimeout(function() {this.checkres(); }.bind(this), 2000);




}



checkres() {
  console.log('inside checkres function           ');
 const userid = this.props.location.state.referrerUser;
  const {successVal} = this.props.shiftsView;
  const {user}=this.props.shiftsView;
  const {successDropOrNot} = this.props.shiftsView;
let shiftData = {};
console.log('THE VALUE OF SUCCESS AND successVal  IS    success    '+Object.values(successDropOrNot)+'        successVal        '+Object.values(successVal));

const val = Object.values(successDropOrNot);
console.log('the values of val is       =>      '+val);
if(val === true) {
  const test = true;
  console.log('yes');
} else {
  console.log('no');
  const test = false;
}
 if(val) {
    console.log('the status is    '+ val+ '           '+this.state.user);
      shiftData = {

     user: this.state.user,
     sid: this.state.sid,
     shiftDate: this.state.shiftDate,
     hall: this.state.hall,
     shiftType: this.state.shiftType,
     timeIn: this.state.timeIn,
     timeOut: this.state.timeOut,
     hours: this.state.hours,
     status: 'reclaim'

     }

   }
   else {
     console.log('the status is    '+ val);
      shiftData = {

     user: this.state.user,
     sid: this.state.sid,
     shiftDate: this.state.shiftDate,
     hall: this.state.hall,
     shiftType: this.state.shiftType,
     timeIn: this.state.timeIn,
     timeOut: this.state.timeOut,
     hours: this.state.hours,
     status: 'claim'

     }
   }


  console.log('the value of success is    '+successVal.success+'        '+shiftData.user);


if(successVal){

  if(val){
    console.log('the shift was dropped by    '+Object.values(user));
    const droppedbyid = Object.values(user);


  this.props.getIdForUser(shiftData.sid);


      setTimeout(function() {this.getUserId(shiftData);}.bind(this), 1000);

  }

else {
  console.log('The shift was not dropped by anyone right now              '+shiftData.hall+'     '+shiftData.status);

    setTimeout(function() {this.props.claimTheShift(shiftData, userid, this.props.history);}.bind(this), 1000);

}


}



  else {
    const errors = {};
    errors.notToClaim = 'LOL. Try later';
  }

}



getUserId(shiftData){
const {userid} = this.props.shiftsView;
console.log('the user who dropped this shift earlier is   ->       '+Object.values(userid.user));

  this.props.getUserName(Object.values(userid.user));


    setTimeout(function() {this.getResult(shiftData);}.bind(this), 1000);



}


getResult(shiftData) {
   const user = this.props.location.state.referrerUser;
   console.log('user !!!!   '+user);
  const {name} = this.props.shiftsView;
  const {email} = this.props.shiftsView;
  const em = email.email;
  const nm = name.name;
  console.log('The sento name and email are    '+name.name+'        '+email.email+'          '+user);
  setTimeout(function() {this.props.claimUserShift(shiftData, nm,em,user,  this.props.history);}.bind(this), 1000);


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

   {this.state.errors.cannotClaim ? this.state.errors.cannotClaim : null} {this.state.errors.passedDate ? this.state.errors.passedDate : null}

   {this.state.errors.cannotClaimShift ? this.state.errors.cannotClaimShift : null}
 </h3>
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

    claimUserShift: (shift,nm,em, user, history) => dispatch(actions.claimUserShift(shift, nm, em, user, history)),
    checkForSelectedDateAndType: (shiftDate, shiftType) => dispatch(actions.checkForSelectedDateAndType(shiftDate, shiftType)),
    checkStatus: (sid) => dispatch(actions.checkStatus(sid)),
    getUserName: (user) => dispatch(actions.getUserName(user)),
    claimTheShift: (shift, user, history) => dispatch(actions.claimTheShift(shift, user, history)),
    getIdForUser: (sid) => dispatch(actions.getIdForUser(sid))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(IndividualShiftClaim);
