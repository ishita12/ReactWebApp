import * as actionTypes from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const setViewShiftsLoading = () => {
  return {
    type: actionTypes.VIEW_SHIFTS_LOADING
  }
}




export const getAllShifts = (ids) => dispatch => {

  for(var i in ids){
      console.log('inside this method    '+ids[i]);
  }
console.log('type of ids   '+typeof ids);
  dispatch(setViewShiftsLoading());

  axios.get(`/api/proctor/all/${ids}`)
  .then(res => {
    console.log('inside getAllShifts');
  dispatch({
    type: actionTypes.VIEW_POSTED_SHIFTS,
    payload: res.data
  })
  }).catch(err => {
    console.log('inside error');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })
}


// checkForSelectedDateAndType


export const checkForSelectedDateAndType = (shiftDate, shiftType) => dispatch => {

 console.log('checkForSelectedDateAndType   action   '+ shiftDate+'         '+shiftType);

   axios.get(`/api/proctor/checkForSelectedDateAndType/${shiftDate}/${shiftType}`)
   .then(res => {
     console.log('inside checkForSelectedDateAndType then');
   dispatch({
     type: actionTypes.GET_DROPPED_SHIFT_STATUS,
     payload: res.data
   })
   }).catch(err => {
     console.log('inside error');
     dispatch({
       type: actionTypes.GET_ERRORS,
       payload: err.response.data
     })
   })


}


// delete dropper user


export const deleteDropperUser = (sid) => dispatch => {
console.log('delete dropper user action    '+sid);

axios.delete(`/api/proctor/deleteShiftFromDroppedList/${sid}`)
.then(res => {

}).catch(err => {
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })
})

}



// checkStatus


export const checkStatus = (sid) => dispatch => {

 console.log('checkStatus   action   '+ sid);

   axios.get(`/api/proctor/checkStatus/${sid}`)
   .then(res => {
     console.log('inside checkStatus then');
   dispatch({
     type: actionTypes.GET_DROPPED_STATUS,
     payload: res.data
   })
   }).catch(err => {
     console.log('inside error');
     dispatch({
       type: actionTypes.GET_ERRORS,
       payload: err.response.data
     })
   })


}




// get id for user


export const getIdForUser = (sid) => dispatch => {

 console.log('getIdForUser   action   '+ sid);

   axios.get(`/api/proctor/getIdForUser/${sid}`)
   .then(res => {
     console.log('inside getIdForUser then');
   dispatch({
     type: actionTypes.GET_DROPPED_USERID,
     payload: res.data
   })
   }).catch(err => {
     console.log('inside error');
     dispatch({
       type: actionTypes.GET_ERRORS,
       payload: err.response.data
     })
   })


}






// dispatch action for deleting the shift from all shifts list which has been claimed

export const deleteShiftFromDroppedList = (sd) => dispatch => {

console.log('deleteShiftFromDroppedList action      '+sd);

axios.delete(`/api/proctor/deleteShiftFromDroppedList/${sd}`)
.then(res => {
dispatch({
  type: actionTypes.DELETE_CLAIMED_SHIFT_ID,
  payload: res.data
})
}).catch(err => {
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })
})
}


// get filtered shifts for selected station and shifttype


export const getVal2 = (hall, type, shifts) => dispatch => {
  console.log('Inside getVal2 action     '+ hall+'         '+type);
  console.log('Inside getVal2 action     '+shifts);
  axios.get(`/api/proctor/getVal2/${hall}/${type}`, shifts)
  .then(res => {
    console.log('inside getVal2 then');
  dispatch({
    type: actionTypes.GET_VAL2_SHIFTS,
    payload: res.data
  })
  }).catch(err => {
    console.log('inside error');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })



}

export const getUserName = (user) => dispatch => {
console.log('inside getUserName action   '+user);

axios.get(`/api/proctor/getUserName/${user}`)
.then(res => {
  console.log('inside getUserName then');
dispatch({
  type: actionTypes.GET_USER_NAME,
  payload: res.data
})
}).catch(err => {
  console.log('inside error');
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })
})


}


// claim user shift
export const claimUserShift = (shift, name,email, user, history) => dispatch => {

console.log('inside claimUserShift action   '+shift.status+'         '+shift.user+'      '+name+'      '+email);

const shiftData = {
user: shift.user,
sid: shift.sid,
hall: shift.hall,
shiftDate: shift.shiftDate,
shiftType: shift.shiftType,
 timeIn: shift.timeIn,
 timeOut: shift.timeOut,
 hours: shift.hours,
 status: shift.status,
 name: name,
 email: email
}

axios.post('/api/proctor/claimShift/'+ user, shiftData)
.then(res => {

  dispatch({
  type: actionTypes.GET_UPDATED_SHIFTS,
  payload: res.data

  })

history.push('/dashboard')

}).catch(err => {
console.log('inside error  ');
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data
})
})
}


export const claimTheShift = (shift, user, history) => dispatch => {

  console.log('inside claimTheShift action    '+user);

  const shiftData = {
  user: shift.user,
  sid: shift.sid,
  hall: shift.hall,
  shiftDate: shift.shiftDate,
  shiftType: shift.shiftType,
   timeIn: shift.timeIn,
   timeOut: shift.timeOut,
   hours: shift.hours,
   status: shift.status

  }

  axios.post('/api/proctor/claimTheShift/'+ user, shiftData)
  .then(res => {

    dispatch({
    type: actionTypes.GET_UPDATED_SHIFTS,
    payload: res.data

    })

  history.push('/dashboard')

  }).catch(err => {
  console.log('inside error  ');
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })
  })

}



// claim user shift
export const reclaimUserShift = (shift, userID, history) => dispatch => {

console.log('inside claimUserShift action   ');

const shiftData = {
user: shift.user,
sid: shift.sid,
hall: shift.hall,
shiftDate: shift.shiftDate,
shiftType: shift.shiftType,
 timeIn: shift.timeIn,
 timeOut: shift.timeOut,
 hours: shift.hours,
 status: shift.status

}

axios.post('/api/proctor/reclaimShift/'+ userID, shiftData)
.then(res => {

  dispatch({
  type: actionTypes.GET_UPDATED_SHIFTS,
  payload: res.data

  })

history.push('/dashboard')

}).catch(err => {
console.log('inside error  ');
dispatch({
  type: actionTypes.GET_ERRORS,
  payload: err.response.data
})
})
}











// get claimed shift ids



export const getClaimedShiftIds = () => dispatch => {

console.log('get claimed shift ids action  ');

  axios.get('/api/proctor/getClaimedShiftIds')
  .then(res => {
    console.log('inside getClaimedShiftIds then');
  dispatch({
    type: actionTypes.GET_CLAIMED_IDS,
    payload: res.data
  })
  }).catch(err => {
    console.log('inside error');
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: err.response.data
    })
  })

}



export const allShifts = () => dispatch => {

console.log('inside allShifts action  ');

axios.get('/api/proctor/allShifts')
.then(res => {
console.log('then   ');
dispatch({
type: actionTypes.GET_ALL_SHIFTS,
payload: res.data

})


}).catch(err => {
console.log('error  ');
dispatch({

type: actionTypes.GET_ERRORS,
payload: err.response.data

})

})

}


// getDroppedShiftIdsByLoggedInUser


export const getDroppedShiftIdsByLoggedInUser = (uid) => dispatch => {

console.log('In getDroppedShiftIdsByLoggedInUser action  ');


axios.get(`/api/proctor/getDroppedShiftIdsByLoggedInUser/${uid}`)
.then(res => {
  console.log('inside getDroppedShiftIdsByLoggedInUser response   '+uid);
dispatch({
  type: actionTypes.GET_DROPPED_SHIFTS_IDS,
  payload: res.data
})
}).catch(err => {
  console.log('inside error');
  dispatch({
    type: actionTypes.GET_ERRORS,
    payload: err.response.data
  })
})


}
