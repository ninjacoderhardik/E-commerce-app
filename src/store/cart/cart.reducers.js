import produce from 'immer';
import {cartActions} from '../actionTypes';

const getInitialState = () => ({
  products: [],
});

export const cart = (state = getInitialState(), action) => {
  const {productDetail = {}, productId = 0, quantity = 0, remark = ''} =
    action.payload || {};

  return produce(state, (draft) => {
    switch (action.type) {
      case cartActions.CART_ADD:
        if (
          !draft.products.find((e) => e.product_id === productDetail.product_id)
        ) {
          draft.products.push({...productDetail, quantity: 1, remark: ''});
        }
        break;
      case cartActions.CART_REMOVE:
        const removeIndex = draft.products.findIndex(
          (e) => e.product_id === productId,
        );

        if (removeIndex !== -1) {
          draft.products.splice(removeIndex, 1);
        }
        break;
      case cartActions.CART_UPDATE:
        const updateIndex = draft.products.findIndex(
          (e) => e.product_id === productId,
        );

        if (updateIndex !== -1) {
          draft.products[updateIndex].quantity = quantity;
        }
        break;
      case cartActions.CART_UPDATE_REMARK:
        const updateRemarkIndex = draft.products.findIndex(
          (e) => e.product_id === productId,
        );

        if (updateRemarkIndex !== -1) {
          draft.products[updateRemarkIndex].remark = remark;
        }
        break;
      case cartActions.CART_CLEAR:
        draft.products = [];
        break;
      default:
        break;
    }
  });
};
