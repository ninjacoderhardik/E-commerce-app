import {connect} from 'react-redux';
import * as productActions from '../../store/product/product.actions';

const mapStateToProps = ({cart}) => ({
  products: cart.products,
});

const mapDispatchToProps = {
  ...productActions,
};

export default (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
