import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// register user

export const registerUser = (userData, history) => dispatch => {


  axios.post('/api/users/register', userData).then(res => {
      console.log(res.data);
      history.push('/login');
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  });

};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  }
}


// login

export const loginUser = (userData) => dispatch => {
axios.post('/api/users/login', userData).then(res => {
console.log('line 35   '+userData.email);
// save to local storage
const { token } = res.data;
localStorage.setItem('jwtToken', token);
// setting token to auth header
setAuthToken(token);
// decode token to get user data
const decoded = jwt_decode(token);
// set current user
dispatch(setCurrentUser(decoded));
}).catch(err => {

  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })

});

};


// logout

export const logout = () => dispatch => {
  //remove token
  localStorage.removeItem('jwtToken');

  // rempve auth header
  setAuthToken(false);
  // set current user to empty Object

 dispatch(setCurrentUser({}));

}
