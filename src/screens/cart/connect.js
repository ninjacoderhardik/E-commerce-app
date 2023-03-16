import {connect} from 'react-redux';
import * as cartActions from '../../store/cart/cart.actions';
import * as productActions from '../../store/product/product.actions';

const mapStateToProps = ({cart, auth}) => ({
  products: cart.products,
  user: auth.user,
});

const mapDispatchToProps = {
  ...cartActions,
  ...productActions,
};

export default (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
