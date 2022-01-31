import * as types from './ActionTypes';
import {initialState, authState, employeesState, vanState} from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
  initialState: initialState,
  firebaseConfig: firebaseConfig,
  employeesState: employeesState,
  vanState: vanState,
  authState: authState,
  types: types
}
