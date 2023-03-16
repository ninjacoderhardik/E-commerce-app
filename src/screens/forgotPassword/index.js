/* eslint-disable no-useless-escape */
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
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import HeaderCustom from '../../components/HeaderCustom';
import LoaderLayout from '../../components/LoaderLayout';
import IMAGES from '../../constants/images';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isLoading: false,
      errorMessage: '',
    };

    this.emailRef = this.updateRef.bind(this, 'email');
    this.onFocus = this.onFocus.bind(this);
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

  _doForgot = async () => {
    let errors = {};

    ['email'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else if (
        name === 'email' &&
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      ) {
        errors[name] = 'Should be valid';
      }
    });

    this.setState({errors});

    if (Object.keys(errors).length === 0) {
      // const {email} = this.state;
      // const {_doGenerateOtp} = this.props;
      // this.setState({errorMessage: '', isLoading: true});
      // const params = {
      //   email: email,
      // };
      // const response = await _doGenerateOtp(params);
      // if (response) {
      //   if (response.status === 'OK') {
      //     this.setState({errorMessage: '', isLoading: false});
      //     this.props.navigation.navigate('VerifyOTP', {
      //       email: response.payload.email,
      //     });
      //   } else {
      //     this.setState({
      //       errorMessage: response.errors.message,
      //       isLoading: false,
      //     });
      //   }
      // } else {
      //   this.setState({isLoading: false});
      // }
    }
  };

  render() {
    const {errors = {}, email, errorMessage, isLoading} = this.state;

    return (
      <Container style={globalStyles.container}>
        <ImageBackground
          style={globalStyles.authBackground}
          source={IMAGES.AUTH_BACKGROUND}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
          <Content contentContainerStyle={globalStyles.contentContainer}>
            <View style={styles.contentContainer}>
              <HeaderCustom
                title="Forgot Password"
                isBack={true}
                goBack={() => this.props.navigation.goBack()}
              />
              <View style={styles.contentContainer}>
                <View style={styles.content}>
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
                <Text style={globalStyles.errorMessageStyle}>
                  {errorMessage}
                </Text>
                <View style={styles.content}>
                  <TouchableOpacity
                    style={globalStyles.btnContainer}
                    onPress={() => this._doForgot()}>
                    <Text style={globalStyles.btnText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>
          {isLoading && <LoaderLayout />}
        </ImageBackground>
      </Container>
    );
  }
}

export default connect(ForgotPasswordScreen);
