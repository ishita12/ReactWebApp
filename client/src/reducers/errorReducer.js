import * as actionTypes from '../actions/types';

const initialState = {};


const errorreducer = (state= initialState, action) => {

 switch(action.type) {

case actionTypes.GET_ERRORS:
console.log('action.payload  '+action.payload);
  return action.payload;



  default:
    return state;


 }

}

export default errorreducer;
