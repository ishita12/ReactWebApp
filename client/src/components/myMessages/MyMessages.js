import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Spinner  from '../commons/Spinner';
import * as actions from '../../actions/message';

class MyMessages extends Component {



constructor(props) {
super(props);
const {user} = this.props.auth;
const userID= user.id;
console.log('The logged in user is   '+userID);




this.props.checkIfUserHasDroppedShifts(userID);
  setTimeout(function() {this.test(); }.bind(this), 2000);

}


test() {
  this.findDroppedShifts();
}

componentDidMount() {

  const {user} = this.props.auth;
  const userID= user.id;


}


findDroppedShifts() {

console.log('Inside findDroppedShifts function ');

const {droppedShiftsByloggeduser} = this.props.scheduleReducer;

const {user} = this.props.auth;
const userID= user.id;


for(var i in droppedShiftsByloggeduser) {
  console.log('in for loop   droppedShiftsByloggeduser');
  if (droppedShiftsByloggeduser.hasOwnProperty(i)) {

      console.log('droppedShiftsByloggeduser test' + " -> " + droppedShiftsByloggeduser[i]);
 }

}

console.log('The droppedShiftsByloggeduser   ->     '+Object.values(droppedShiftsByloggeduser));

if(droppedShiftsByloggeduser === undefined) {
  console.log('test1');
} else {
  console.log('test2');
}


let result = null;


if(droppedShiftsByloggeduser !== null) {
  console.log('There are some dropped shifts by this user   '+Object.values(droppedShiftsByloggeduser));

const arrayShift = [];

const date1 = new Date(Date.now());
console.log('Todays date is   ->  '+date1);




  for(var i in droppedShiftsByloggeduser) {

    console.log('in for loop  ');
    if (Object.values(droppedShiftsByloggeduser).hasOwnProperty(i)) {

  if(Object.keys(droppedShiftsByloggeduser[i]).indexOf('shiftDate') > -1) {
const dd1 = Object.values(droppedShiftsByloggeduser[i]['shiftDate']);
const dd2 = String(dd1);
const dd3 = dd2.split(',').join('');
const dd4 = new Date(dd3);
console.log('shift date is  ->   '+ new Date(dd3));




const dateToday = new Date(Date.now());



if(dd4 < date1) {
  console.log('The date for this dropped shift has passed   ');
  // id,user,sid,hall,shiftType,shiftDate,timeIn,timeOut,hours
  console.log('The shift details are  ->   '+Object.values(droppedShiftsByloggeduser[i])[4]);

const datesave1 = new Date(Object.values(droppedShiftsByloggeduser[i])[5]);

const shiftData = {

user: userID,
sid: Object.values(droppedShiftsByloggeduser[i])[2],
hall: Object.values(droppedShiftsByloggeduser[i])[3],
shiftType: Object.values(droppedShiftsByloggeduser[i])[4],
shiftDate: datesave1.toDateString(),
timeIn: Object.values(droppedShiftsByloggeduser[i])[6],
timeOut: Object.values(droppedShiftsByloggeduser[i])[7],
hours: Object.values(droppedShiftsByloggeduser[i])[8]

}

console.log('The detail of teh shift to be saved are ->         '+shiftData.hall+'      '+ shiftData.shiftType+'         '+shiftData.shiftDate);

this.props.sendMessage(shiftData);


}



if(dd4.getDate() === date1.getDate() && dd4.getMonth() === date1.getMonth() && dd4.getFullYear() === date1.getFullYear()) {

const timeStartShift = Object.values(droppedShiftsByloggeduser[i]['timeIn']);
console.log('The timein is   ->   '+timeStartShift);

let startTime = null;
const tr = String(timeStartShift);
const timeStartShiftSplit = tr.split(',').join('');
console.log('The timeStartShiftSplit    ->    '+timeStartShiftSplit);
const index = timeStartShiftSplit.indexOf(":");
  console.log('The index is   ->    '+timeStartShiftSplit.indexOf('AM'));
  if(timeStartShiftSplit.indexOf('AM') > -1) {
    console.log('The index is   ->    '+timeStartShiftSplit.indexOf('AM'));
      startTime = timeStartShiftSplit.slice(0,index);
  } else {
    const s = timeStartShiftSplit.slice(0,index);
    const s2  = parseInt(s);
    console.log('value of s is   '+parseInt(s));
    startTime = s2+12;
  }
console.log('The start time is   ->   '+startTime+'         '+typeof date1.getHours() +'        '+ typeof parseInt(startTime));
if(parseInt(startTime) > date1.getHours() || parseInt(startTime) === date1.getHours()) {

console.log('The start time is    ->   '+startTime+'       '+'The current time hours is    ->      '+date1.getHours());

  const datesave1 = new Date(Object.values(droppedShiftsByloggeduser[i])[5]);


  const shiftData = {

  user: userID,
  sid: Object.values(droppedShiftsByloggeduser[i])[2],
  hall: Object.values(droppedShiftsByloggeduser[i])[3],
  shiftType: Object.values(droppedShiftsByloggeduser[i])[4],
  shiftDate: datesave1.toDateString(),
  timeIn: Object.values(droppedShiftsByloggeduser[i])[6],
  timeOut: Object.values(droppedShiftsByloggeduser[i])[7],
  hours: Object.values(droppedShiftsByloggeduser[i])[8]

  }

  console.log('The detail of teh shift to be saved are ->         '+shiftData.hall+'      '+ shiftData.shiftType+'         '+shiftData.shiftDate);

  this.props.sendMessage(shiftData);


}




}

else {
  console.log('The date for this dropped shift has not passed yet  ');
}


  }

console.log('lets try    '+Object.keys(droppedShiftsByloggeduser[i]));


      // arrayShift.push(Object.values(message[i]));
      //  console.log('test' + " -> " + Object.values(this.arr1[i]));
   }

  }






setTimeout(function() {this.props.getMyMessages(userID); }.bind(this), 2000);


}
else {
    console.log('No dropped shifts      ');

}



}




  render () {

const {droppedShiftsByloggeduser} = this.props.scheduleReducer;
let messages = null;
const {myMessages}= this.props.scheduleReducer;

  console.log('the messages are   ->   '+Object.values(myMessages));

  messages = Object.values(myMessages).map(msg => (

   <tr key={msg._id}>
   <td>{msg.shiftDate}</td>
   <td>{msg.hall}</td>
   <td>{msg.shiftType}</td>
   <td>{msg.timeIn}</td>
   <td>{msg.timeOut}</td>
   <td>{msg.hours}</td>
   <td>{msg.message}</td>
  </tr>

   ));









  return (


<div className="my-Messages">
<h1>My Messages </h1>

<table className="table">

<thead>
<tr>
<th>Date</th>
<th>Hall</th>
<th>Type</th>
<th>Time In</th>
<th>Time Out</th>
<th>Hours</th>
<th>Message</th>
</tr>
{messages}

</thead>
</table>




<Link to="/dashboard" className="btn btn-light">

Go Back
</Link>

</div>





  )




  }
}

const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  scheduleReducer: state.scheduleReducer
  }
}

const mapDispatchToProps = dispatch => {

return {

checkIfUserHasDroppedShifts: (userID) => dispatch(actions.checkIfUserHasDroppedShifts(userID)),
sendMessage: (shiftData) => dispatch(actions.sendMessage(shiftData)),
getMyMessages: (userID) => dispatch(actions.getMyMessages(userID))
}

}



export default connect(mapStateToProps, mapDispatchToProps)(MyMessages);
