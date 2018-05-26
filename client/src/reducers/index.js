import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postShiftReducer from './postShiftReducer';
const rootReducer = combineReducers({

auth: authReducer,
errReducer: errorReducer,
profReducer: profileReducer,
postShiftReducer: postShiftReducer
});

export default rootReducer;
