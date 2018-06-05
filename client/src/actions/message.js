import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



// create a shift
export const checkIfUserHasDroppedShifts = (userID) => dispatch => {
console.log('In checkIfUserHasDroppedShifts action   ');

  axios.get(`/api/proctor/checkIfUserHasDroppedShifts/${userID}`).then(res => {

   console.log('In checkIfUserHasDroppedShifts action   then');

    dispatch({
      type: actionTypes.GET_DROPPED_SHIFTS_FOR_LOGGEDIN_USER,
      payload: res.data
    })

  }).catch(err => {
    console.log('no data   ');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  });

};



// send message


export const sendMessage = (shiftData) => dispatch => {

console.log('Inside sendMessage action ');
const date = new Date(shiftData.shiftDate);

const shift = {
  user: shiftData.user,
sid: shiftData.sid,
hall: shiftData.hall,
shiftType: shiftData.shiftType,
shiftDate: date.toDateString(),
 timeIn: shiftData.timeIn,
 timeOut: shiftData.timeOut,
 hours: shiftData.hours

}
 console.log('inside action    '+shift.shiftType+'       '+shift.shiftDate+'    '+shift.hall);

axios.post('/api/proctor/sendMessage', shift)
.then(res => {

console.log('yessss yessss ');
  dispatch({
  type: actionTypes.SEND_MESSAGES,
  payload: res.data

  })



}).catch(err => {
console.log('inside error  ');
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data

})

})

};





export const getMyMessages = (userID) => dispatch => {

  console.log('In getMyMessages action   '+userID);

    axios.get(`/api/proctor/getMyMessages/${userID}`).then(res => {

     console.log('In getMyMessages action   then');

      dispatch({
        type: actionTypes.GET_MY_MESSAGES,
        payload: res.data
      })

    }).catch(err => {
      console.log('no data   ');
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    });



};
