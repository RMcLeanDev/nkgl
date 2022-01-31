import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';

const {types, firebaseConfig} = constants;

firebase.initializeApp(firebaseConfig);

console.log(firebase.database())

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    store.dispatch(authUserTrue());
    firebase.database().ref("employees").orderByChild("name").on('value', function(snapshot) {
      let list = []
      snapshot.forEach(function(child){
        list.push(child.val())
      })
      store.dispatch(getAllEmployees(list))
    })
    firebase.database().ref("vanList").orderByChild("name").on('value', function(snapshot) {
      let list = []
      snapshot.forEach(function(child){
        let van = child.val()
        list.push(van)
      })
      store.dispatch(getAllVans(list))
    })
  } else {
    store.dispatch(authUserFalse());
    store.dispatch(dumpAllEmployees())
    store.dispatch(dumpAllVans());
  }
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

export const getAllEmployees = (information) => ({
  type: types.GET_ALL_EMPLOYEES,
  information
})

export const dumpAllEmployees = () => ({
  type: types.DUMP_ALL_EMPLOYEES
})

export const getAllVans = (information) => ({
  type: types.GET_ALL_VANS,
  information
})

export const dumpAllVans = () => ({
  type: types.DUMP_ALL_VANS
})