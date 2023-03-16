import {} from '../actionTypes';
import URL from '../../constants/url';
import {instance} from '../apiService';

export const getDashboard = () => {
  return async (dispatch, getState) => {
    return await instance(getState, 'GET', URL.GET_DASHBOARD, false, {});
  };
};

export const getCategories = () => {
  return async (dispatch, getState) => {
    return await instance(getState, 'GET', URL.GET_CATEGORIES, false, {});
  };
};

export const getSubCategories = (params) => {
  return async (dispatch, getState) => {
    return await instance(
      getState,
      'GET',
      `${URL.GET_SUB_CATEGORIES}${params.id}`,
      false,
      {},
    );
  };
};

export const _doProducts = (params) => {
  return async (dispatch, getState) => {
    return await instance(
      getState,
      'GET',
      URL.GET_PRODUCTS +
        `?page=${params.page}&sub_category_id=${params.sub_category_id}&kt=${params.kt}`,
      false,
      {},
    );
  };
};

export const _doOrder = (params) => {
  return async (dispatch, getState) => {
    return await instance(getState, 'POST', URL.ORDER, false, params);
  };
};

export const getOrders = (params) => {
  return async (dispatch, getState) => {
    return await instance(
      getState,
      'GET',
      `${URL.GET_ORDER}${params.id}`,
      false,
      {},
    );
  };
};
