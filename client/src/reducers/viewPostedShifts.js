import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';



const initialState = {

  loading: false,
  shifts: {},
  updatedShifts: {},
  claimedIds: {},
  allShifts: {},
  successVal: false,
  droppedIds: {},
  checkDroppedShift: {}
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

  default:
    return state;


 }


}
export default viewPostedShifts;
