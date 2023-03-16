import { connect } from 'react-redux';
import * as authActions from '../../store/auth/auth.actions';

const mapStateToProps = ({  }) => ({
});

const mapDispatchToProps = {
    ...authActions
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
