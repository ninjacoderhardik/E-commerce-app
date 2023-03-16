/* eslint-disable curly */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {CircleFade} from 'react-native-animated-spinkit';
import Colors from '../constants/colors';
import {WIDTH} from '../helper/utils';

const DEVICE_WIDTH = WIDTH > 550 ? 500 : WIDTH - 20;
const MARGIN = 70;

export default class ButtonSubmit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
      // useNativeDriver: true
    }).start();
  }

  _doAfterSuccess() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
      this.props.onNavigate();
    }, 500);
  }

  _doAfterFailure() {
    Animated.timing(this.buttonAnimated, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
    }).start();
    this.setState({isLoading: false});
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.onPress()}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <CircleFade size={30} color={Colors.White} />
            ) : (
              <Text style={styles.text}>Login</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.TintColor,
    height: MARGIN,
    borderRadius: 50,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: Colors.TintColor,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: Colors.TintColor,
  },
  text: {
    color: Colors.White,
    fontSize: 18,
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});
