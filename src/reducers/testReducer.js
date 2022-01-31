import constants from './../constants';
const {types, initialState} = constants

const testReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.TEST_FUNCTION:
      newState = state;
        console.log("test_function")
      return newState;
    default:
      return state;
  }
}

export default testReducer;
