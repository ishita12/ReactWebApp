import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/scheduleActions';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Input from '../commons/Input';




class Individual extends Component {

   constructor(props) {
console.log('insie Individual component   ');
   super(props);
  const indShift = this.props.location.state.referrerShift;
  const user = this.props.location.state.referrerUser;
  const date = indShift.shiftDate;
  console.log('The user for dropping the shift    '+user);
  const date1 = new Date(date);
   this.state = {
   sid: indShift.sid,
   shiftDate: date1.toDateString(),
   hall: indShift.hall,
   shiftType: indShift.shiftType,
   timeIn: indShift.timeIn,
   timeOut: indShift.timeOut,
   hours: indShift.hours,
   user: user,
   errors: {},
   disabled: true

   };

   this.onSubmit = this.onSubmit.bind(this);
   const t1 = indShift.timeIn.indexOf(":");
   const startTime = indShift.timeIn.slice(0,2);
     console.log('in constructor   '+indShift.hall+'     '+indShift.sid+'   '+this.state.user+ '   '+indShift.timeIn+'       '+t1+'    '+startTime);


   }

   componentDidMount() {
    const indShift = this.props.location.state.referrerShift;
    const user = this.props.location.state.referrerUser;

   }


   componentWillReceiveProps(nextProps) {
     if(nextProps.errors) {
       this.setState({errors: nextProps.errors});
     }

   }


   onSubmit(e) {
   e.preventDefault();

   const shift = {

   user: this.state.user,
   sid: this.state.sid,
   shiftDate: this.state.shiftDate,
   hall: this.state.hall,
   shiftType: this.state.shiftType,
   timeIn: this.state.timeIn,
   timeOut: this.state.timeOut,
   hours: this.state.hours

   }
 console.log('inside submit    '+shift.user+'       '+shift.sid+'    '+shift.hall);
   this.props.dropShift(shift, this.state.user, this.props.history);



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
    <h1 className="display-4 text-center"> Drop Shift </h1>

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
    <h3 style={{color:'red'}}>{this.state.errors.cannotDrop ? this.state.errors.cannotDrop : null} </h3>
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

    dropShift: (shift, userID, history) => dispatch(actions.dropShift(shift, userID, history))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Individual);
