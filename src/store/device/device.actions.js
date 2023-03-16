import {deviceActions} from '../actionTypes';
import URL from '../../constants/url';

export const onNetworkConnectionChange = (isConnected, isInternetReachable) => {
  return {
    type: deviceActions.CONNECTION_CHANGE,
    isConnected,
    isInternetReachable,
  };
};

export const resetDevice = () => {
  return {type: deviceActions.RESET_DEVICE};
};
