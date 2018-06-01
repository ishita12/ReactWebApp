import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
  shifts: null,
  shift: null,
  loading: false,
  ids: {}
}



const postShiftReducer = (state= initialState, action) => {

 switch(action.type) {

   case actionTypes.POSTED_SHIFTS_LOADING:
   return {
     ...state,
     loading: true
   }

case actionTypes.GET_SINGLE_POSTED_SHIFT:
return {
  ...state,
  shift: action.payload,
  loading: false
}
case actionTypes.GET_POSTED_SHIFTS:
return {
  ...state,
  loading: false,
  shifts: action.payload
}
case actionTypes.GET_POSTED_SHIFT:
 return {
   ...state,
   shift: action.payload,
   loading: false
 }

case actionTypes.GET_PASSED_SHIFT_IDS:
   return {
     ...state,
     ids: action.payload
   }
  default:
    return state;


 }

}



export default postShiftReducer;
