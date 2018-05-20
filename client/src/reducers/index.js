import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
const rootReducer = combineReducers({

auth: authReducer,
errReducer: errorReducer
});

export default rootReducer;
