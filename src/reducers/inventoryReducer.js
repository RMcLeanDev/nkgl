import constants from './../constants';
const {types, inventoryState} = constants

const inventoryReducer = (state = inventoryState, action) => {
  let newState;
  switch (action.type) {
    case types.GET_INVENTORY_LIST:
      newState = state;
        newState = action.info;
      return newState;
    default:
      return state;
  }
}

export default inventoryReducer;