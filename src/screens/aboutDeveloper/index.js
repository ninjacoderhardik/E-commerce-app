import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';

class AboutDeveloperScreen extends Component {
  render() {
    return (
      <Container style={globalStyles.container}>
        <Content>
          <View style={styles.insideContent}>
            <Text style={styles.headerText}>
              In case of any help and support feel free to contact us.
            </Text>
            <View style={globalStyles.seperator} />
            <TouchableOpacity
              style={styles.menuContainer}
              onPress={() => Linking.openURL('tel:+917600681961')}>
              <View style={styles.menuIconContainer}>
                <Icon
                  name="phone-call"
                  type="Feather"
                  style={styles.menuIcon}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.menuText}>+91 7600681961</Text>
              </View>
            </TouchableOpacity>
            <View style={globalStyles.seperator} />
            <TouchableOpacity
              style={styles.menuContainer}
              onPress={() =>
                Linking.openURL('mailto:hardiknakarani317@gmail.com')
              }>
              <View style={styles.menuIconContainer}>
                <Icon name="mail" type="Feather" style={styles.menuIcon} />
              </View>
              <View style={styles.container}>
                <Text style={styles.menuText}>hardiknakarani317@gmail.com</Text>
              </View>
            </TouchableOpacity>
            <View style={globalStyles.seperator} />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(AboutDeveloperScreen);
