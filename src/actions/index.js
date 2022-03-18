import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';
import axios from 'axios';

let apiKey
let sessionId 
let logonParams = {username: `xxxx`};

var myAdminApi = function () {
  var serverUrl = "https://myadminapi.geotab.com/v2/MyAdminApi.ashx";
  var call = function (method, params, callbackSuccess, callbackError) {
              var apiMethod = {
                  "id": -1,
                  "method": method,
                  "params": params
              };
              var request = new XMLHttpRequest();
              request.open("POST", serverUrl, true);
              request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              request.onreadystatechange = function () {
                  if (request.readyState === 4) {
                      if (request.status === 200) {
                          var data,
                                  error,
                                  result;
                          try {
                              data = JSON.parse(request.responseText);
                              if (data && data.error) {
                                  error = data.error;
                                  handleError(error, callbackError);
                              }
                              else {
                                  result = data.result;
                                  callbackSuccess(result);
                              }
                          }
                          catch (e) {
                              handleError(e, callbackError);
                          }
                      } else {
                          handleError(request, callbackError);
                      }
                  }
              };
              request.send("JSON-RPC=" + encodeURIComponent(JSON.stringify(apiMethod)));
          },
          handleError = function (error, errorCallback) {
              var errorString;
              if (error && error.name && error.message) {
                  errorString = error.name + ": " + error.message;
                  console.log(errorString)
              }
              else if (error.target || (error instanceof XMLHttpRequest && error.status === 0)) {
                  errorString = "Network Error: Couldn't connect to the server. Please check your network connection and try again.";
              }
              if (errorCallback) {
                  errorCallback(errorString || error, error);
              }
          };

  return {
      call: call
  }
};

myAdminApi().call(`Authenticate`, logonParams, function(user){
  console.log(user)
});

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