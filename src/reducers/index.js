import {combineReducers} from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import employeesInfoReducer from './employeesInfoReducer';
import vanListInfoReducer from './vanListInfoReducer';
import inventoryReducer from './inventoryReducer';

const rootReducer = combineReducers({
    testState: testReducer,
    employeesState: employeesInfoReducer,
    vanState: vanListInfoReducer,
    authState: authReducer,
    inventoryState: inventoryReducer
});

export default rootReducer;
