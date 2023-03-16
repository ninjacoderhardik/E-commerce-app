import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';
import ForgotPasswordScreen from '../screens/forgotPassword';
import VerifyOTPScreen from '../screens/verifyOTP';
import NewPasswordScreen from '../screens/newPassword';

import AppTabsScreen from './tabBar';
import * as deviceActions from '../store/device/device.actions';

enableScreens();
const Stack = createStackNavigator();

class Navigator extends Component {
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      this.props.onNetworkConnectionChange(
        state.isConnected,
        state.isInternetReachable,
      );
      if (state.isConnected === true && state.isInternetReachable === false) {
        showMessage({
          message: 'Network not reachable.',
          type: 'warning',
        });
      } else if (
        state.isConnected === false &&
        state.isInternetReachable === false
      ) {
        showMessage({
          message: 'You are offline.',
          type: 'danger',
        });
      }
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {user} = this.props;

    return (
      <NavigationContainer>
        {Object.keys(user).length === 0 ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Dashboard" component={AppTabsScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({device, auth}) => ({
  isConnected: device.isConnected,
  isInternetReachable: device.isInternetReachable,
  user: auth.user,
});

const mapDispatchToProps = {
  ...deviceActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
