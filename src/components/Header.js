import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/colors';
import {
  statusBarHeight,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../helper/utils';

export default class Header extends Component {
  render() {
    const {
      headerTitle = '',
      leftComponent = <View />,
      rightComponent = <View />,
    } = this.props;

    return (
      <View style={styles.headerBackground}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.headerContainer}>
          <View style={styles.headerSideContainer}>{leftComponent}</View>
          <View style={styles.headerCenterContainer}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </View>
          <View style={styles.headerSideContainer}>{rightComponent}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: Colors.TintColor,
  },
  headerContainer: {
    marginTop: statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: getResponsiveHeight(1),
  },
  headerCenterContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSideContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: getResponsiveWidth(4),
    paddingVertical: getResponsiveHeight(1.5),
    backgroundColor: Colors.White,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: getResponsiveHeight(2.2),
    color: Colors.White,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
  },
});
