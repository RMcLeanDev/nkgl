import * as types from './ActionTypes';
import {initialState, authState, employeesState, vanState, inventoryState} from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
  initialState: initialState,
  firebaseConfig: firebaseConfig,
  employeesState: employeesState,
  vanState: vanState,
  authState: authState,
  inventoryState: inventoryState,
  types: types
}
