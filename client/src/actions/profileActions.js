import * as actionTypes from './types';
import axios from 'axios';


export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  }
}
// clear profile

export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  }
}

// add education

export const addEducation = (eduData, history) => dispatch => {
  axios.post('/api/profile/education', eduData)
  .then(res => {
    console.log('line 23  '+eduData.to);
    history.push('/dashboard');
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })
}
// get profiles

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
  .then(res => {
  dispatch({
    type: actionTypes.GET_PROFILES,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: null
    })
  })
}



//delete education

export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
  .then(res => {
  dispatch({
    type: actionTypes.GET_PROFILE,
    payload: res.data
  })
  }).catch(err => {
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const deleteAccount = () => dispatch =>{
  if(window.confirm('Are you sure?')) {
    axios.delete('/api/profile')
    .then(res => {
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: {}
      })
    })
    .catch(err => {
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data
})

    })

  }
}


// create profile

export const createProfile = (profileData, history) => dispatch => {

axios.post('/api/profile', profileData)
.then(res => history.push('/dashboard'))
.catch(err => {
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data
})

});


}
// get profile byhandle



export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(res => {
    dispatch({
    type: actionTypes.GET_PROFILE,
    payload: res.data

    });
  })
  .catch(err => {
    dispatch({
type: actionTypes.GET_PROFILE,
payload: null

    })
  })
}

// get current profile


export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(res => {
    dispatch({
    type: actionTypes.GET_PROFILE,
    payload: res.data

    });
  })
  .catch(err => {
    dispatch({
type: actionTypes.GET_PROFILE,
payload: {}

    })
  })
}
