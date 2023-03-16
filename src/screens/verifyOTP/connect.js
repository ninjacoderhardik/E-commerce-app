import {connect} from 'react-redux';
import * as authActions from '../../store/auth/auth.actions';
import * as deviceActions from '../../store/device/device.actions';

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  ...authActions,
  ...deviceActions,
};

export default (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
