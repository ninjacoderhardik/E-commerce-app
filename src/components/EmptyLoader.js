import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CircleFade} from 'react-native-animated-spinkit';
import Colors from '../constants/colors';

export default class EmptyLoader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CircleFade size={50} color={Colors.Black} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
