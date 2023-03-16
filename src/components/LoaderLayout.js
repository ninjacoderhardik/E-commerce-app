import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CircleFade} from 'react-native-animated-spinkit';
import {HEIGHT, WIDTH} from '../helper/utils';
import Colors from '../constants/colors';

export default class LoaderLayout extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CircleFade size={50} color={Colors.White} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: Colors.LightBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
