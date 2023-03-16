import {authActions} from '../actionTypes';

const getInitialState = () => ({
  user: {},
});

export const auth = (state = getInitialState(), action) => {
  switch (action.type) {
    case authActions.AUTH_LOGIN_PAYLOAD:
      return {...state, user: action.payload};
    case authActions.AUTH_LOGOUT:
      return {...state, user: {}};
    default:
      return state;
  }
};
