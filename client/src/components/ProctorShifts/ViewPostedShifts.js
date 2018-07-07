import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import SelectListGroup from '../commons/SelectListGroup';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import * as actions from '../../actions/proctorActions';


class ViewPostedShifts  extends React.Component {


constructor(props) {
super(props);

this.state = {
  errors: '',
  redirect: false,
  shift: '',
  idArray: [],
  droppedIdArray: [],
  test: false,
  redirectVal: false,
  show: false,
  filterHall: 'all stations',
  filterType: 'all types',
  val1: false,
  val2: false,
  val3: false,
  val4: false,
  filteredShifts: []
}
console.log('inside viewPostedShifts component');
this.props.getDroppedShiftIdsByLoggedInUser(this.props.auth.user.id);

console.log('inside update state method   '+this.props.auth.user.id);
setTimeout(function() {this.props.getClaimedShiftIds(); }.bind(this), 3000);





setTimeout(function() {this.testing(); }.bind(this), 2000);

this.onSubmit = this.onSubmit.bind(this);
this.onChange = this.onChange.bind(this);
  this.toggle = this.toggle.bind(this);

}

updateState(ids, dropids) {
console.log('inside update state method   ');
 this.setState({test: true});
console.log('1');
setTimeout(function() {this.set(ids); }.bind(this), 1000);


}


toggle(e) {
  const val= this.state.show;
  this.setState({show: !val});
  console.log('the value of show is     '+this.state.show);
}

testing(){
  console.log('2');
  const claimedIds = this.props.viewPostedShifts.claimedIds;

  console.log('dropped id --------------->         '+this.props.auth.user.id);

  let arr1 = [];
  for(var i in Object.values(claimedIds)) {
    this.setState({test: true});
    console.log('in for loop  for claimed ids  ');
    if (claimedIds.hasOwnProperty(i)) {

       arr1.push(Object.values(claimedIds[i]));
      //  console.log('test' + " -> " + Object.values(this.arr1[i]));
   }

  }
  console.log('claim !!!!!!!!!!!!    '+arr1);
 this.setState({idArray: arr1});
 setTimeout(function() {this.testing2(); }.bind(this), 2000);

}


testing2(){
  console.log('2');

  const droppedIds = this.props.viewPostedShifts.droppedIds;
  console.log('dropped id --------------->         '+this.props.auth.user.id);

  let arr2 = [];
  for(var i in Object.values(droppedIds)) {
    this.setState({test: true});
    console.log('in for loop for dropped ids   ');
    if (droppedIds.hasOwnProperty(i)) {

       arr2.push(Object.values(droppedIds[i]));
  //      console.log('test1' + " -> " + this.arr2[i]);
   }

  }

  console.log('drop !!!!!!!!!!!!    '+arr2);
 this.setState({droppedIdArray: arr2});


/*

  */
}


updateState2(ids) {
console.log('inside update state method   2');
 this.setState({test: true});

setTimeout(function() {this.set(ids); }.bind(this), 1000);


}


set(ids){
  console.log('ishita !!!!!!!!!   '+this.state.test);
  if(this.state.test) {
      this.props.getAllShifts(ids);
  }
  if(!this.state.test) {

    this.props.allShifts();
  }
}

componentDidMount() {
  console.log('3');
  const  user  = this.props.auth.user;
  console.log('the proctor is   '+user.name);

this.props.getClaimedShiftIds();


setTimeout(function() {this.props.getDroppedShiftIdsByLoggedInUser(this.props.auth.user.id); }.bind(this), 2000);




setTimeout(function() {this.getIds(); }.bind(this), 1000);



}


onChange(e) {
  this.setState({[e.target.name]: e.target.value});

}


checkVal2(hall, type) {
  console.log('val2 value is     '+this.state.val2);
   const { shifts } = this.props.shiftsView;

   const filteredShifts = [];

let count=0;
let testttt=   shifts.map(function(shift) {
     if(shift.hall === hall && shift.shiftType === type) {
      count++;
       console.log('halllllllllll                    '+count);
       filteredShifts.push(shift);
     }

   });
this.setFilteredList(filteredShifts);

}

checkVal3(type) {
  console.log('val2 value is     '+this.state.val2);
   const { shifts } = this.props.shiftsView;

   const filteredShifts = [];

let count=0;
let testttt=   shifts.map(function(shift) {
     if(shift.shiftType === type) {
      count++;
       console.log('halllllllllll                    '+count);
       filteredShifts.push(shift);
     }

   });
this.setFilteredList3(filteredShifts);

}

checkVal4(hall) {
  console.log('val2 value is     '+this.state.val2);
   const { shifts } = this.props.shiftsView;

   const filteredShifts = [];

let count=0;
let testttt=   shifts.map(function(shift) {
     if(shift.hall === hall) {
      count++;
       console.log('halllllllllll                    '+count);
       filteredShifts.push(shift);
     }

   });
this.setFilteredList4(filteredShifts);

}

setFilteredList(filteredShifts) {
  this.setState({filteredShifts: filteredShifts, val2: true, val1: false, val3: false, val4: false});

}
setFilteredList3(filteredShifts) {
  this.setState({filteredShifts: filteredShifts, val3: true, val1: false, val2: false, val4: false});

}
setFilteredList4(filteredShifts) {
  this.setState({filteredShifts: filteredShifts, val4: true, val1: false, val2: false, val3: false});

}
setVal1() {
  this.setState({val1: true, val2: false, val3: false, val4: false});
}

setVal2(hall, type) {


  this.checkVal2(hall, type);
}

setVal3(type) {



  this.checkVal3(type);
}

setVal4(hall) {

  this.checkVal4(hall);
}




onSubmit(e) {
  e.preventDefault();

const filterParam = {

hall: this.state.filterHall,
shiftType: this.state.filterType
}


console.log('the filter params are    '+this.state.filterHall+'      '+this.state.filterType);

if(filterParam.hall==='all stations' && filterParam.shiftType==='all types') {
  console.log('the filter params are    '+filterParam.hall+'      '+filterParam.shiftType);

   this.setVal1();


}

if(filterParam.hall !== 'all stations' && filterParam.shiftType !== 'all types') {

  console.log('the filter params are    '+filterParam.hall+'      '+filterParam.shiftType);

   this.setVal2(filterParam.hall, filterParam.shiftType);

}



if(filterParam.hall !== 'all stations' && filterParam.shiftType === 'all types') {
  console.log('the filter params are    '+filterParam.hall+'      '+filterParam.shiftType);

this.setVal4(filterParam.hall);

}


if(filterParam.hall === 'all stations' && filterParam.shiftType !== 'all types') {
  console.log('the filter params are    '+filterParam.hall+'      '+filterParam.shiftType);


  this.setVal3(filterParam.shiftType);

}





}

componentWillMount() {

console.log('4');
  this.props.getClaimedShiftIds();


  setTimeout(function() {this.props.getDroppedShiftIdsByLoggedInUser(this.props.auth.user.id); }.bind(this), 1000);

/*
  const claimedIds = this.props.viewPostedShifts.claimedIds;
  const droppedIds = this.props.viewPostedShifts.droppedIds;
  const result = this.props.viewPostedShifts.droppedIds.success;
  console.log('success value   '+result);
  for(var i in Object.values(claimedIds)) {
    this.setState({test: true});
    console.log('in for loop  for claimed ids  ');
    if (claimedIds.hasOwnProperty(i)) {

       this.state.idArray.push(Object.values(claimedIds[i]));
        console.log('test' + " -> " + this.state.idArray[i]);
   }

  }

  for(var i in Object.values(droppedIds)) {
    this.setState({test: true});
    console.log('in for loop for dropped ids   ');
    if (droppedIds.hasOwnProperty(i)) {

       this.state.droppedIdArray.push(Object.values(droppedIds[i]));
        console.log('test1' + " -> " + this.state.droppedIdArray[i]);
   }

  }
*/
setTimeout(function() {this.testing(); }.bind(this), 2000);

}



getIds() {
  const claimedIds = this.props.viewPostedShifts.claimedIds;
  const droppedIds = this.props.viewPostedShifts.droppedIds;


  for(var i in Object.values(claimedIds)) {
    this.setState({test: true});

    if (claimedIds.hasOwnProperty(i)) {

       this.state.idArray.push(Object.values(claimedIds[i]));
        console.log('test' + " -> " + this.state.idArray[i]);
   }

  }


  for(var i in Object.values(droppedIds)) {

    if (droppedIds.hasOwnProperty(i)) {

       this.state.droppedIdArray.push(Object.values(droppedIds[i]));
        console.log('test for dropped id ' + " -> " + this.state.droppedIdArray[i]);
   }

  }



  const ids=Object.values(this.state.idArray);
  const dropids = Object.values(this.state.droppedIdArray);
  let verify = false;
  for(var i in this.state.droppedIdArray) {
    verify=true;
    console.log('^^^^^^^^^^^^   drop '+ this.state.droppedIdArray[i]);
  }
for(var i in this.state.idArray) {
  console.log('***************    '+i);

   if(verify) {

     this.updateState(ids, dropids);

   }
  if(!verify) {
    this.updateState2(ids);
  }



}

  console.log('in did mount method value of test is  '+this.state.test);

  if(!this.state.test) {
    this.noClaimedShifts();
  }
  console.log('!!!!!!!!!!!!!!     ' + '        '+ids);
  if(!ids){
    console.log('no claimed shifts    yayyyy');
  }

}


noClaimedShifts() {
  this.props.allShifts();
}


componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
  }
  if(this.state.errors) {
  console.log('there are errors   '+this.state.errors.err1);
  }
  else {
    console.log('no errors');
  }
}

  claimShift(shift) {
    const  userID  = this.props.auth.user;
  console.log('claim shift  with id  '+'    '+shift._id+'    '+shift.hall+'      '+userID.id);
this.setState({redirect: true, shift: shift});

   //this.props.claimUserShift(shift, userID.id, this.props.history);



}

reclaimShift(shift) {
  const userID = this.props.auth.user;
  console.log('Inside reclaim method    '+shift._id+'        '+shift.hall+'        '+userID.id);
  this.setState({redirectVal: true, shift: shift});
}





  render () {
    let showForm = null;
    const shiftTypeOptions = [
          {label: 'all types', value: 'all types'},
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C1', value: 'C1' },
          { label: 'C2', value: 'C2' },
          { label: 'D', value: 'D' }
        ];

        const shiftHallOptions =    [{label: 'all stations', value: 'all stations'},
                      {label: '337 Huntington', value: '337 Huntington'},
                       {label: 'Northwest', value: 'Northwest'},
                       {label: 'Melvin Hall', value: 'Melvin Hall'},
                       {label: 'Kerr Hall', value: 'Kerr Hall'},
                       {label: 'Light Hall', value: 'Light Hall'},
                       {label: 'Rubenstein Hall', value: 'Rubenstein Hall'},
                       {label: 'Burstein Hall', value: 'Burstein Hall'},
                       {label: 'Stetson Hall', value: 'Stetson Hall'}
                     ];

                     if(this.state.show) {

showForm = (

<div>
  <h2>Station:</h2><SelectListGroup
                   placeholder="Hall"
                   name="filterHall"
                   value={this.state.filterHall}
                   onChange={this.onChange}
                   options={shiftHallOptions}
                 />
  <h2>Shift Type</h2>               <SelectListGroup
                                  placeholder="shiftType"
                                  name="filterType"
                                  value={this.state.filterType}
                                  onChange={this.onChange}
                                  options={shiftTypeOptions}
                                />
    <input type="submit" value="Apply changes"  className="btn btn-info btn-block mt-4"    />
</div>
);

                     }

console.log('5');
console.log('the value of val1 is    '+this.state.val1);

 const { shifts } = this.props.shiftsView;
const {redirect} = this.state;
const {redirectVal} = this.state;
const {shift} = this.state;
  const  user  = this.props.auth.user;
if(redirect) {
  return (

    <Redirect to={{
                  pathname: '/individualShiftClaim',
                  state: { referrerShift: shift, referrerUser: user.id }
              }} />

  )

}

if(redirectVal) {
  return (

    <Redirect to={{
                  pathname: '/individualShiftReClaim',
                  state: { referrerShift: shift, referrerUser: user.id }
              }} />


  )
}



  const { errors } = this.state;
  console.log('line 42   '+typeof shifts);

    if(this.props.shiftsView.shifts === undefined || this.props.shiftsView.shifts) {
      console.log('null');
    } else {
      console.log('not null');
    }



    const dropids = Object.values(this.state.droppedIdArray);

const aa = Object.entries(this.state.droppedIdArray);
console.log('ffff    '+ this.state.droppedIdArray+ '         '+typeof this.state.droppedIdArray);

console.log('lets seee   ');
for(var i in aa){
 console.log('$$$$      '+Object.values(Object.values(this.state.droppedIdArray[i])).indexOf('5b0ac7ef091f5c372047c34d'));
}

  let shiftsPosted = null;
if(!this.state.show || (this.state.show && this.state.val1)) {
 shiftsPosted = Object.values(shifts).map(shift => (

  <tr key={shift._id}>
  <td> <Moment format="YYYY/MM/DD">{shift.shiftDate}</Moment></td>
  <td>{shift.hall}</td>
  <td>{shift.shiftType}</td>
  <td>{shift.timeIn}</td>
  <td>{shift.timeOut}</td>
  <td>{shift.hours}</td>
   {  JSON.stringify(this.state.droppedIdArray).indexOf(shift._id) > -1 ? (<td><button onClick={this.reclaimShift.bind(this, shift)} className="btn btn-warning">Reclaim   </button></td>) : (<td><button onClick={this.claimShift.bind(this, shift)} className="btn btn-info">Claim Shift</button></td>)}

  </tr>

  ));
}

if(this.state.show && this.state.val2 || this.state.val3 || this.state.val4) {


shiftsPosted = Object.values(this.state.filteredShifts).map(shift => (

 <tr key={shift._id}>
 <td> <Moment format="YYYY/MM/DD">{shift.shiftDate}</Moment></td>
 <td>{shift.hall}</td>
 <td>{shift.shiftType}</td>
 <td>{shift.timeIn}</td>
 <td>{shift.timeOut}</td>
 <td>{shift.hours}</td>
  {  JSON.stringify(this.state.droppedIdArray).indexOf(shift._id) > -1 ? (<td><button onClick={this.reclaimShift.bind(this, shift)} className="btn btn-warning">Reclaim   </button></td>) : (<td><button onClick={this.claimShift.bind(this, shift)} className="btn btn-info">Claim Shift</button></td>)}

 </tr>

 ));


}






  return (





<div>
<h1>View All the shifts posted </h1>
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



<button type="button" className="btn btn-info  mt-4" onClick={this.toggle}>Apply Shifts Filters</button>
  <form onSubmit={this.onSubmit}>

  {showForm}


  </form>



<Link to="/dashboard" className="btn btn-warning  mt-4">
Back
</Link>
</div>

  );

  }

}




const mapStateToProps = (state) => {
  return {
  shiftsView: state.viewPostedShifts,
  errors: state.errReducer,
    auth: state.auth,
    viewPostedShifts: state.viewPostedShifts
  }
}




const mapDispatchToProps = dispatch => {

  return {
    getAllShifts: (ids) => dispatch(actions.getAllShifts(ids)),
    claimUserShift: (shift, userID, history) => dispatch(actions.claimUserShift(shift, userID, history)),
    getClaimedShiftIds: () => dispatch(actions.getClaimedShiftIds()),
    allShifts: () => dispatch(actions.allShifts()),
    getDroppedShiftIdsByLoggedInUser: (uid) => dispatch(actions.getDroppedShiftIdsByLoggedInUser(uid)),
    getVal2: (hall, type, shifts) => dispatch(actions.getVal2(hall, type, shifts))
    }

}

ViewPostedShifts.propTypes = {
  getAllShifts: PropTypes.func.isRequired
}






export default connect(mapStateToProps, mapDispatchToProps)(ViewPostedShifts);
