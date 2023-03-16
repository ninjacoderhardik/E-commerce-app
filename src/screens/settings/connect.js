import {connect} from 'react-redux';
import * as authActions from '../../store/auth/auth.actions';

const mapStateToProps = ({auth}) => ({
  user: auth.user,
});

const mapDispatchToProps = {
  ...authActions,
};

export default (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
