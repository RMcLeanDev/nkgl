import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';

const {types, firebaseConfig} = constants;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    store.dispatch(authUserTrue());
    firebase.database().ref("vans").on('value', function(snapshot) {
      store.dispatch(getAllVans(snapshot.val()))
    })
  } else {
    store.dispatch(authUserFalse());
  }
})

firebase.database().ref("uniforms").on('value', function(snapshot) {
  store.dispatch(getInventoryList(snapshot.val()))
})

export const testFunction = () => ({
  type: types.TEST_FUNCTION
})

export const authUserTrue = () => ({
  type: types.AUTH_USER_TRUE
})

export const authUserFalse = () => ({
  type: types.AUTH_USER_FALSE
})

export const getInventoryList = (info) => ({
  type: types.GET_INVENTORY_LIST,
  info
})

// export const getAllEmployees = (information) => ({
//   type: types.GET_ALL_EMPLOYEES,
//   information
// })

// export const dumpAllEmployees = () => ({
//   type: types.DUMP_ALL_EMPLOYEES
// })

export const getAllVans = (information) => ({
  type: types.GET_ALL_VANS,
  information
})

// export const dumpAllVans = () => ({
//   type: types.DUMP_ALL_VANS
// })