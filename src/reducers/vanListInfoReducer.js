import constants from './../constants';
const {types, vanState} = constants

const vanListInfoReducer = (state = vanState, action) => {
  let newState;
  switch (action.type) {
    case types.GET_ALL_VANS:
      newState = state;
        newState = action.information;
      return newState;
    case types.DUMP_ALL_VANS:
      newState = state;
        newState = {};
      return newState;
    default:
      return state;
  }
}

export default vanListInfoReducer;