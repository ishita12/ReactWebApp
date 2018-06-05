import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';



const initialState = {

  loading: false,
myShifts: {},
droppedShifts: {},
newDroppedShifts: {},
shiftids: [],
message: '',
droppedShiftsByloggeduser: {},
displayMessages: {},
myMessages: {}
}





const scheduleReducer = (state= initialState, action) => {

switch(action.type) {


case actionTypes.VIEW_SCHEDULE_LOADING:

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
    case actionTypes.GET_AVAILABLE_IDS:
      return {
        ...state,
        shiftids: action.payload
      }
   case actionTypes.GET_DROPPED_SHIFTS_FOR_LOGGEDIN_USER:
     return {
      ...state,
      droppedShiftsByloggeduser: action.payload,
      message: action.payload

     }

  case actionTypes.SEND_MESSAGES:
    return {

    ...state,
    displayMessages: action.payload


    }
  case actionTypes.GET_MY_MESSAGES:
    return {
      ...this.state,
      myMessages: action.payload
    }

  default:
    return state;


 }


}
export default scheduleReducer;
