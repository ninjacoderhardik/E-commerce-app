import {cartActions} from '../actionTypes';

export const addToCart = (productDetail) => ({
  type: cartActions.CART_ADD,
  payload: {productDetail},
});

export const removeFromCart = (productId) => ({
  type: cartActions.CART_REMOVE,
  payload: {productId},
});

export const updateInCart = (productId, quantity) => ({
  type: cartActions.CART_UPDATE,
  payload: {productId, quantity},
});

export const updateInCartRemark = (productId, remark) => ({
  type: cartActions.CART_UPDATE_REMARK,
  payload: {productId, remark},
});

export const clearCart = () => ({
  type: cartActions.CART_CLEAR,
});
