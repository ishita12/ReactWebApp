import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import  Spinner  from '../commons/Spinner';
import classnames from 'classnames';
import Dashboard from '../dashboard/Dashboard';
import Moment from 'react-moment';
import * as actions from '../../actions/scheduleActions';
import { Route, Redirect, Link } from 'react-router-dom';


class MySchedule extends Component {

constructor(props) {
  super(props);
  this.state = {
    errors: '',
    redirect: false,
    shift: '',
    droppedArray: ''
  }
  const  user  = this.props.auth.user;
  console.log('mySchedule user is    '+user.id);
this.props.getMySchedule(user.id);

}
dropShift(shift) {
  const  userID  = this.props.auth.user;
console.log('drop shift  with id  '+'    '+shift._id+'    '+shift.hall+'      '+userID.id);
this.setState({redirect: true, shift: shift});

}

setArray(droppedShifts){
  console.log('In setArray method ')
  this.setState({droppedArray: droppedShifts});

  setTimeout(function() {this.test(); }.bind(this), 2000);


}
test() {
const dshift = Object.values(this.state.droppedArray);
console.log('************        '+dshift);
  const  user  = this.props.auth.user;
const shift = {
  user: user,
  sid: dshift[2],
  hall: dshift[3],
  shiftDate: dshift[4],
  shiftType: dshift[5],
  timeIn: dshift[6],
  timeOut: dshift[7],
  hours: dshift[8]
}
console.log('details    ->    '+shift.user.id+'   '+shift.sid+'   '+shift.hall+'   ');
if(shift.sid !== undefined){
  console.log('yes');

this.props.saveDroppedShift(shift, shift.user.id);



} else {
  console.log('no');
}




}

componentDidMount() {


  const {droppedShifts} = this.props.scheduleReducer;
  this.setArray(droppedShifts);

}


  render () {


    const {redirect} = this.state;
    const {shift} = this.state;
      const  user  = this.props.auth.user;
    if(redirect) {
      return (

        <Redirect to={{
                      pathname: '/individualShift',
                      state: { referrerShift: shift, referrerUser: user.id }
                  }} />

      )

    }

  const {myShifts} = this.props.scheduleReducer;
  const { errors } = this.state;





      const mySchedule = Object.values(myShifts).map(shift => (

      <tr key={shift._id}>
      <td> <Moment format="YYYY/MM/DD">{shift.shiftDate}</Moment></td>
      <td>{shift.hall}</td>
      <td>{shift.shiftType}</td>
      <td>{shift.timeIn}</td>
      <td>{shift.timeOut}</td>
      <td>{shift.hours}</td>
      <td><button onClick={this.dropShift.bind(this, shift)} className="btn btn-info">Drop Shift</button></td>


      </tr>

      ));


return (






  <div>
  <h1>My Schedule </h1>
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
  {mySchedule}

  </thead>
  </table>



  <Link to="/dashboard" className="btn btn-warning  mt-4">
  Back
  </Link>
  </div>



)



  }
}

const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  scheduleReducer: state.scheduleReducer,
    errors: state.errReducer
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getMySchedule: (uid) => dispatch(actions.getMySchedule(uid)),
    saveDroppedShift: (shift, id) => dispatch(actions.saveDroppedShift(shift, id))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MySchedule);
