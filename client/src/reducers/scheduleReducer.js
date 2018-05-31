import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';



const initialState = {

  loading: false,
myShifts: {},
droppedShifts: {},
newDroppedShifts: {}
}





const scheduleReducer = (state= initialState, action) => {
console.log('1');
switch(action.type) {


case actionTypes.VIEW_SCHEDULE_LOADING:
console.log('2');
  return {
   ...state,
   loading: true


 }

 case actionTypes.GET_NEW_SHIFTS:
   return {
     ...state,
     droppedShifts: action.payload
   }


  case actionTypes.GET_MY_SCHEDULE:
    return {

     ...state,
     myShifts: action.payload,
     loading: false
  }

  case actionTypes.UPDATE_SHIFTS:
    return {
      ...state,
      newDroppedShifts: action.payload
    }



  default:
    return state;


 }


}
export default scheduleReducer;
