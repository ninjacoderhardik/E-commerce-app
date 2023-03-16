/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Container, Content} from 'native-base';
import {OutlinedTextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import HeaderCustom from '../../components/HeaderCustom';
import LoaderLayout from '../../components/LoaderLayout';
import IMAGES from '../../constants/images';

class NewPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: this.props.navigation.getParam('email', ''),
      password: '',
      confirmPassword: '',
      secureTextEntry: true,
      isLoading: false,
      errorMessage: '',
      errors: {},
    };

    this.passwordRef = this.updateRef.bind(this, 'password');
    this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');
    this.onFocus = this.onFocus.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  renderPasswordAccessory() {
    let {secureTextEntry} = this.state;

    let name = secureTextEntry ? 'visibility' : 'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={Colors.Black}
        onPress={() => this.setState({secureTextEntry: !secureTextEntry})}
        suppressHighlighting={true}
      />
    );
  }

  _doSave = async () => {
    let errors = {};

    ['password', 'confirmPassword'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else if ('password' === name && value.length < 6) {
        errors[name] = 'Too short';
      } else if ('confirmPassword' === name && this.state.password !== value) {
        errors[name] = 'Should match with password';
      }
    });

    this.setState({errors});

    if (Object.keys(errors).length == 0) {
      const {email, password} = this.state;
      const {_doForgotPwd} = this.props;

      this.setState({errorMessage: '', isLoading: true});

      const params = {
        email: email,
        password: password,
      };

      const response = await _doForgotPwd(params);

      if (response) {
        if (response.status == 'OK') {
          this.setState({errorMessage: '', isLoading: false});
          this.props.navigation.navigate('Initial');
        } else {
          this.setState({
            errorMessage: response.errors.message,
            isLoading: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    }
  };

  render() {
    const {
      errors = {},
      secureTextEntry,
      password,
      confirmPassword,
      errorMessage,
      isLoading,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        <ImageBackground
          style={globalStyles.authBackground}
          source={IMAGES.AUTH_BACKGROUND}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
          <Content contentContainerStyle={globalStyles.contentContainer}>
            <View style={styles.contentContainer}>
              <HeaderCustom
                title="New Password"
                isBack={true}
                goBack={() => this.props.navigation.goBack()}
              />
              <View style={styles.content}>
                <OutlinedTextField
                  ref={this.passwordRef}
                  label="New Password"
                  secureTextEntry={secureTextEntry}
                  style={globalStyles.textInput}
                  labelTextStyle={globalStyles.textInput}
                  titleTextStyle={globalStyles.textInput}
                  tintColor={Colors.Black}
                  baseColor={Colors.Black}
                  errorColor={Colors.Black}
                  value={password}
                  onFocus={this.onFocus}
                  onChangeText={(password) => this.setState({password})}
                  renderRightAccessory={this.renderPasswordAccessory}
                  error={errors.password}
                />
              </View>
              <View style={styles.content}>
                <OutlinedTextField
                  ref={this.confirmPasswordRef}
                  label="Confirm Password"
                  secureTextEntry={true}
                  style={globalStyles.textInput}
                  labelTextStyle={globalStyles.textInput}
                  titleTextStyle={globalStyles.textInput}
                  tintColor={Colors.Black}
                  baseColor={Colors.Black}
                  errorColor={Colors.Black}
                  value={confirmPassword}
                  onFocus={this.onFocus}
                  onChangeText={(confirmPassword) =>
                    this.setState({confirmPassword})
                  }
                  error={errors.confirmPassword}
                />
              </View>
              <Text style={globalStyles.errorMessageStyle}>{errorMessage}</Text>
              <View style={styles.content}>
                <TouchableOpacity
                  style={globalStyles.btnContainer}
                  onPress={() => this._doSave()}>
                  <Text style={globalStyles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
          {isLoading && <LoaderLayout />}
        </ImageBackground>
      </Container>
    );
  }
}

export default connect(NewPasswordScreen);
