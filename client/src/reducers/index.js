import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postShiftReducer from './postShiftReducer';
import viewPostedShifts from './viewPostedShifts';
import scheduleReducer from './scheduleReducer';
const rootReducer = combineReducers({

auth: authReducer,
errReducer: errorReducer,
profReducer: profileReducer,
postShiftReducer: postShiftReducer,
viewPostedShifts: viewPostedShifts,
scheduleReducer: scheduleReducer
});

export default rootReducer;
