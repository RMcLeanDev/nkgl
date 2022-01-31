import constants from './../constants';
const {types, employeesState} = constants

const employeesInfoReducer = (state = employeesState, action) => {
  let newState;
  switch (action.type) {
    case types.GET_ALL_EMPLOYEES:
      newState = state;
        newState = action.information;
      return newState;
    case types.DUMP_ALL_EMPLOYEES:
      newState = state;
        newState = {};
      return newState;
    default:
      return state;
  }
}

export default employeesInfoReducer;