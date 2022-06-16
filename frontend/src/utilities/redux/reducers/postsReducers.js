import * as types from '../actions/actionTypes';
const iniState = {
  items: []
}

export const posts = (state = iniState, action) => {
  switch (action.type) {
    case types.SET_POSTS:
      return {...state, items: action.payload};
    case types.SET_DATA:
      return {...state, data: action.payload};
    default:
      return state;
  }
};
