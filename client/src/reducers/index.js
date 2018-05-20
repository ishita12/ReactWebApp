import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
const rootReducer = combineReducers({

auth: authReducer,
errReducer: errorReducer,
profReducer: profileReducer
});

export default rootReducer;
