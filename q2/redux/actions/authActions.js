import {types} from '../types';

export const authenticate = () => async dispatch => {
  try {
    dispatch({
      type: types.AUTH_REDUCER,
    });
  } catch (error) {
    console.log({error});
  }
};
