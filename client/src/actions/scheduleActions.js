import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const scheduleLoading = () => {
  return {
    type: actionTypes.VIEW_SCHEDULE_LOADING
  }
}


export const getMySchedule = (uid) => dispatch => {
  dispatch(scheduleLoading());
  console.log('mySchedule user id  is   '+uid);
  axios.get(`/api/proctor/mySchedule/${uid}`)
  .then(res => {
  dispatch({
    type: actionTypes.GET_MY_SCHEDULE,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_MY_SCHEDULE,
      payload: null
    })
  })
}




// Drp Shift
export const dropShift = (shift, userID, history) => dispatch => {

console.log('inside DropShift action   ');

const shiftData = {
sid: shift.sid,
hall: shift.hall,
shiftDate: shift.shiftDate,
shiftType: shift.shiftType,
 timeIn: shift.timeIn,
 timeOut: shift.timeOut,
 hours: shift.hours,
 user: shift.user

}
 console.log('inside action    '+shift.user+'       '+shift.sid+'    '+shift.hall);

axios.post('/api/proctor/dropShift/'+ userID, shiftData)
.then(res => {

console.log('yessss yessss ');
  dispatch({
  type: actionTypes.GET_NEW_SHIFTS,
  payload: res.data

  })


history.push('/mySchedule');

}).catch(err => {
console.log('inside error  ');
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data

})

})

}



// save details of dropped shift


export const saveDroppedShift = (shift, id) => dispatch => {
  console.log('inside saveDroppedShift action   ');

  const shiftData = {
  user: id,
  sid: shift.sid,
  hall: shift.hall,
  shiftDate: shift.shiftDate,
  shiftType: shift.shiftType,
   timeIn: shift.timeIn,
   timeOut: shift.timeOut,
   hours: shift.hours

  }
   console.log('inside saveDroppedShift    '+shiftData.user+'       '+shiftData.sid+'    '+shiftData.hall+'     '+shiftData.shiftType+'    '+shiftData.shiftDate+'   '+shiftData.timeIn+'     '+shiftData.timeOut+'   '+shiftData.hours);

  axios.post(`/api/proctor/saveDropShift/${id}`, shiftData)
  .then(res => {

  console.log('yessss yessss ');
    dispatch({
    type: actionTypes.UPDATE_SHIFTS,
    payload: res.data

    })


  }).catch(err => {
  console.log('inside error  ');
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data

  })

  })
}
