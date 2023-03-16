/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import {getVersion, getBuildNumber} from 'react-native-device-info';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import IMAGES from '../../constants/images';
import {handleClickURL} from '../../helper/utils';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _doShowLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this._doLogout()},
      ],
      {cancelable: false},
    );
  };

  _doLogout = async () => {
    const {_doLogout, _doAuthLogout} = this.props;
    _doAuthLogout();
    await _doLogout();
  };

  render() {
    const {user} = this.props;

    return (
      <Container style={globalStyles.container}>
        <Content>
          <View style={styles.contentContainer}>
            <View style={styles.profileContainer}>
              <FastImage
                source={IMAGES.PLACEHOLDER}
                style={styles.profileImage}
              />
              <View style={styles.profileContent}>
                <Text style={styles.profileText}>
                  {user?.user?.first_name} {user?.user?.last_name}
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => {}}
                style={styles.profileIconContainer}>
                <Icon
                  name="user-edit"
                  type="FontAwesome5"
                  style={styles.profileIcon}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.insideContent}>
              <View style={styles.profileContentContainer}>
                <View style={styles.profileIconInsideContainer}>
                  <Icon
                    name="phone-call"
                    type="Feather"
                    style={styles.profileInfoIcon}
                  />
                </View>
                <View style={styles.container}>
                  <Text style={styles.profileInfoText}>
                    {user?.user?.mobile}
                  </Text>
                </View>
              </View>

              <View style={styles.profileContentContainer}>
                <View style={styles.profileIconInsideContainer}>
                  <Icon
                    name="mail"
                    type="Feather"
                    style={[styles.profileInfoIcon, {top: 1}]}
                  />
                </View>
                <View style={styles.container}>
                  <Text style={styles.profileInfoText}>
                    {user?.user?.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={globalStyles.seperator} />
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => this.props.navigation.navigate('AboutDeveloper')}>
            <View style={styles.menuIconContainer}>
              <Icon
                name="developer-mode"
                type="MaterialIcons"
                style={styles.menuIcon}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.menuText}>About Developer</Text>
            </View>
          </TouchableOpacity>
          <View style={globalStyles.seperator} />
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => handleClickURL('https://thangamexports.com/')}>
            <View style={styles.menuIconContainer}>
              <Icon name="info" type="MaterialIcons" style={styles.menuIcon} />
            </View>
            <View style={styles.container}>
              <Text style={styles.menuText}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
          <View style={globalStyles.seperator} />
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => this._doShowLogoutAlert()}>
            <View style={styles.menuIconContainer}>
              <Icon
                name="power-off"
                type="FontAwesome"
                style={styles.menuIcon}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.menuText}>Log out</Text>
            </View>
          </TouchableOpacity>
          <View style={globalStyles.seperator} />
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Text style={styles.menuText}>
              Version : {getVersion()} build {getBuildNumber()}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(SettingsScreen);
