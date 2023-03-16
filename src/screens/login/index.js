/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Linking,
  ScrollView,
} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import {OutlinedTextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import IMAGES from '../../constants/images';
import ButtonSubmit from '../../components/ButtonSubmit';
import LoaderLayout from '../../components/LoaderLayout';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
      loginResponse: {},
      isShowModal: false,
      isLoading: false,
      errorMessage: '',
      errors: {},
    };

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
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

  _doLogin = async () => {
    const {_doLogin} = this.props;
    const {email, password} = this.state;

    let errors = {};

    ['email', 'password'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else if (
        name === 'email' &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      ) {
        errors[name] = 'Should be valid';
      } else if (name === 'password' && value.length < 6) {
        errors[name] = 'Too short';
      }
    });

    this.setState({errors});

    if (Object.keys(errors).length === 0) {
      this.setState({errorMessage: ''});
      this.buttonSubmit._onPress();

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await _doLogin(formData);

      if (response) {
        if (response.status === true) {
          this.setState({loginResponse: response.data});
          setTimeout(() => {
            this.buttonSubmit._doAfterSuccess();
          }, 1000);
        } else {
          this.setState({errorMessage: response.message});
          this.buttonSubmit._doAfterFailure();
        }
      } else {
        this.setState({errorMessage: 'Something went wrong.'});
        this.buttonSubmit._doAfterFailure();
      }
    }
  };

  render() {
    const {
      errors = {},
      secureTextEntry,
      email,
      password,
      isShowModal,
      errorMessage,
      isLoading,
    } = this.state;

    return (
      <Container style={globalStyles.container}>
        <ImageBackground
          style={globalStyles.authBackground}
          source={IMAGES.AUTH_BACKGROUND}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <Content contentContainerStyle={globalStyles.authContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={IMAGES.LOGO}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textInputContent}>
                <OutlinedTextField
                  ref={this.emailRef}
                  label="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={globalStyles.textInput}
                  labelTextStyle={globalStyles.textInput}
                  titleTextStyle={globalStyles.textInput}
                  tintColor={Colors.Black}
                  baseColor={Colors.Black}
                  errorColor={Colors.Black}
                  value={email}
                  onFocus={this.onFocus}
                  onChangeText={(email) => this.setState({email})}
                  error={errors.email}
                />
              </View>
              <View style={styles.textInputContent}>
                <OutlinedTextField
                  ref={this.passwordRef}
                  label="Password"
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
              <View style={styles.forgotContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text style={styles.forgotText}>Forgot Password? </Text>
                </TouchableOpacity>
              </View>
              <Text style={globalStyles.errorMessageStyle}>{errorMessage}</Text>
              <View style={styles.content}>
                <ButtonSubmit
                  ref={(child) => {
                    this.buttonSubmit = child;
                  }}
                  onPress={() => this._doLogin()}
                  onNavigate={() => {
                    const {_doAuthUserSuccess} = this.props;
                    const {loginResponse} = this.state;
                    _doAuthUserSuccess(loginResponse);
                  }}
                />
              </View>
              <View style={[styles.content, {zIndex: -1}]}>
                <Text style={styles.faqText}>
                  Don't have an account?{' '}
                  <Text
                    onPress={() => this.setState({isShowModal: true})}
                    style={styles.signupText}>
                    Register Now
                  </Text>
                </Text>
              </View>
            </View>
          </Content>
        </ImageBackground>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isShowModal}
          onRequestClose={() => {
            this.setState({isShowModal: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <View style={styles.container}>
                  <Text style={styles.headerText}>
                    How to register with Thangam Exports?
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({isShowModal: false})}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.modalcontentContainer}>
                <Text style={styles.modalText}>
                  Please contact us through the{' '}
                  <Text
                    style={{color: Colors.linkColor}}
                    onPress={() =>
                      Linking.openURL('mailto:support@thangamexports.com')
                    }>
                    support@thangamexports.com
                  </Text>{' '}
                  or{' '}
                  <Text
                    style={{color: Colors.linkColor}}
                    onPress={() => Linking.openURL('tel:+918347779606')}>
                    +91 8347779606
                  </Text>
                  .
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {isLoading && <LoaderLayout />}
      </Container>
    );
  }
}

export default connect(LoginScreen);
