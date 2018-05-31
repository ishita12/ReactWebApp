import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// create a shift
export const registerShift = (shiftPosted, history) => dispatch => {


  axios.post('/api/postShift/singleShift', shiftPosted).then(res => {
      console.log(res.data);
      console.log('yes we got the data');
      history.push('/dashboard');
  }).catch(err => {
    console.log('no data   ');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  });

};

// update sinle shift

export const updateSingleShift = (shiftPosted, history) => dispatch => {

console.log('inside update');
  axios.post('/api/postShift/updateSingleShift', shiftPosted).then(res => {
      console.log(res.data);
      console.log('yes we got the data');
      history.push('/dashboard');
  }).catch(err => {
    console.log('no data   ');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  });

};



export const setPostShiftLoading = () => {
  return {
    type: actionTypes.POSTED_SHIFTS_LOADING
  }
}



export const getPostedShifts = (id) => dispatch => {
  dispatch(setPostShiftLoading());
  console.log('id is   '+id);
  axios.get(`/api/postShift/all/${id}`)
  .then(res => {
  dispatch({
    type: actionTypes.GET_POSTED_SHIFTS,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_POSTED_SHIFTS,
      payload: null
    })
  })
}






//delete shift

export const deleteShift = (id) => dispatch => {
    if(window.confirm('Are you sure?')) {
  axios.delete(`/api/postShift/shift/${id}`)
  .then(res => {
  dispatch({
    type: actionTypes.GET_POSTED_SHIFT,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })
}
}


//edit posted shift
/*
export const editShift = (id) => dispatch => {
  dispatch(setPostShiftLoading());
  console.log('id is   '+id);
  axios.get(`/api/postShift/single/${id}`)
  .then(res => {
  dispatch({
    type: actionTypes.GET_POSTED_SHIFT,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_POSTED_SHIFT,
      payload: null
    })
  })
}
*/

//get single posted shift

export const getSinglePostedShift = (id) => dispatch => {
  dispatch(setPostShiftLoading());
  console.log('inside getSinglePostedShift action');
  axios.get(`/api/postShift/shift/${id}`)
  .then(res => {
    console.log('shift is present  '+ id);
    dispatch({
    type: actionTypes.GET_SINGLE_POSTED_SHIFT,
    payload: res.data

    });
  })
  .catch(err => {
    dispatch({
type: actionTypes.GET_POSTED_SHIFT,
payload: null

    })
  })
}
