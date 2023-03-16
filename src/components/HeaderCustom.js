/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Colors from '../constants/colors';

export default class HeaderCustom extends Component {
  render() {
    const {title, goBack, isBack = false} = this.props;

    return (
      <View>
        <View
          style={{
            paddingBottom: 20,
          }}>
          {isBack && (
            <TouchableOpacity onPress={goBack}>
              <Icon
                name="chevron-thin-left"
                type="Entypo"
                style={{
                  color: Colors.Black,
                  paddingRight: 10,
                  paddingVertical: 5,
                }}
              />
            </TouchableOpacity>
          )}
          <View style={{paddingVertical: 10}}>
            <Text
              style={{
                color: Colors.Black,
                fontSize: 26,
                fontWeight: '700',
                paddingLeft: 5,
                textAlign: 'center',
                fontFamily: 'Montserrat-Bold',
              }}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
