import * as actionTypes from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {}
}


const authreducer = (state= initialState, action) => {

 switch(action.type) {

 case actionTypes.SET_CURRENT_USER:
   return {
     ...state,
     isAuthenticated: !isEmpty(action.payload),
     user: action.payload
   }


  default:
    return state;


 }

}



export default authreducer;
