import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';
import Fonts from '../constants/fontStyles';

export default class EmptyMessage extends React.Component {
  render() {
    const {message = ''} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.msgText}>{message}</Text>
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
  msgText: {
    color: Colors.Black,
    fontSize: Fonts.LARGE,
    fontFamily: 'Montserrat-Regular',
  },
});
