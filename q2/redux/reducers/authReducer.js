import {types} from '../types';

const initialState = {
  isAuth: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_REDUCER:
      return {
        ...state,
        isAuth: true,
      };
    default:
      return state;
  }
}

export default authReducer;
