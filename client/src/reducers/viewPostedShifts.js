import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';



const initialState = {

  loading: false,
  shifts: {},
  shifts1: {},
  myShifts1: {},
  updatedShifts: {},
  claimedIds: {},
  allShifts: {},
  successVal: false,
  successVal2: false,
  successVal3: false,
  droppedIds: {},
  checkDroppedShift: {},
  checkStatus: {},
  successDropOrNot: false,
  successDropOrNot2: false,
  user: '',
  name: '',
  email: '',
  userid: '',
  shiftids: []
}





const viewPostedShifts = (state= initialState, action) => {
console.log('1');
switch(action.type) {


case actionTypes.VIEW_POSTED_SHIFTS:
console.log('2');
  return {
   ...state,
   shifts: action.payload,
   loading: false


 }

 case actionTypes.VIEW_POSTED_SHIFTS1:
 console.log('2');
   return {
    ...state,
    shifts1: action.payload,
    loading: false


  }

  case actionTypes.VIEW_SHIFTS_LOADING:
  return {
    ...state,
    loading: true
  }

  case actionTypes.GET_UPDATED_SHIFTS:
    return {

     ...state,
     updatedShifts: action.payload
  }

  case actionTypes.GET_CLAIMED_IDS:
    return {
       ...state,
     claimedIds: action.payload

   }

  case actionTypes.GET_ALL_SHIFTS:
    return {
      ...state,
      shifts: action.payload
    }

    case actionTypes.GET_ALL_SHIFTS1:
      return {
        ...state,
        shifts1: action.payload
      }

    case actionTypes.GET_MY_SHIFTS:
      return {

        ...state,
        myShifts1: action.payload
      }
 case actionTypes.GET_DROPPED_SHIFTS_IDS:
   return {
   ...state,
   droppedIds: action.payload


   }

case actionTypes.GET_DROPPED_SHIFT_STATUS:
  return {
    ...state,
    checkDroppedShift: action.payload,
    successVal: action.payload
  }

case actionTypes.GET_DROPPED_STATUS:
 return {
   ...state,
   checkStatus: action.payload,
   user: action.payload,
   successDropOrNot: action.payload

 }

case actionTypes.GET_USER_NAME:
  return {
    ...state,
    name: action.payload,
    email: action.payload
  }

case actionTypes.GET_DROPPED_USERID:
  return {
    ...state,
    userid: action.payload
  }


  default:
    return state;


 }


}
export default viewPostedShifts;
