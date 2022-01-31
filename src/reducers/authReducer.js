import constants from './../constants';
const {types, authState} = constants

const authReducer = (state = authState, action) => {
  let newState;
  switch (action.type) {
    case types.AUTH_USER_TRUE:
      newState = state;
        newState = true;
      return newState;
    case types.AUTH_USER_FALSE:
      newState = state;
        newState = false;
      return newState;
    default:
      return state;
  }
}

export default authReducer