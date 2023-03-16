import {authActions} from '../actionTypes';
import URL from '../../constants/url';
import {instance} from '../apiService';

export const _doLogin = (params) => {
  return async (dispatch, getState) => {
    return await instance(getState, 'POST', URL.LOGIN, false, params);
  };
};

export const _doAuthUserSuccess = (payload) => {
  return {type: authActions.AUTH_LOGIN_PAYLOAD, payload};
};

export const _doLogout = (params) => {
  return async (dispatch, getState) => {
    return await instance(getState, 'POST', URL.LOGOUT, true, {});
  };
};

export const _doAuthLogout = () => {
  return async (dispatch, getState) => {
    dispatch({type: authActions.AUTH_LOGOUT});
  };
};
