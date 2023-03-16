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
import Toast from 'react-native-simple-toast';
import connect from './connect';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import HeaderCustom from '../../components/HeaderCustom';
import LoaderLayout from '../../components/LoaderLayout';
import IMAGES from '../../constants/images';

class VerifyOTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: this.props.navigation.getParam('email', ''),
      //   token: this.props.navigation.getParam('token', ''),
      //   redirectFrom: this.props.navigation.getParam('redirectFrom', 'Forgot'),
      otp: '',
      isLoading: false,
      errorMessage: '',
    };

    this.otpRef = this.updateRef.bind(this, 'otp');
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

  _doVerify = async () => {
    let errors = {};

    ['otp'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      }
    });

    this.setState({errors});

    if (Object.keys(errors).length == 0) {
      const {email, otp, redirectFrom, token} = this.state;
      const {_doVerifyOtp, _doAuthUserSuccess, _doCountrySelect} = this.props;

      this.setState({errorMessage: '', isLoading: true});

      const params = {
        email: email,
        otp: otp,
      };
      const response = await _doVerifyOtp(params);

      if (response) {
        if (response.status == 'OK') {
          this.setState({errorMessage: '', isLoading: false});
          Toast.show(response.message, Toast.LONG);
          if (redirectFrom == 'Forgot') {
            this.props.navigation.navigate('NewPassword', {
              email: response.payload.email,
            });
          } else {
            if (token != '') {
              _doAuthUserSuccess({...response.payload, token});
              if (
                Object.keys(response.payload.userPrefrenceDto).length > 0 &&
                response.payload.userPrefrenceDto.clubid
              ) {
                _doCountrySelect(
                  response.payload.userPrefrenceDto.clubid,
                  response.payload.userPrefrenceDto.flag,
                  response.payload.userPrefrenceDto.clubName,
                );
              }
            }
            this.props.navigation.navigate('Initial');
          }
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
    const {errors = {}, otp, errorMessage, isLoading} = this.state;

    return (
      <Container style={globalStyles.container}>
        <ImageBackground
          style={globalStyles.authBackground}
          source={IMAGES.AUTH_BACKGROUND}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
          <Content contentContainerStyle={globalStyles.contentContainer}>
            <View style={styles.contentContainer}>
              <HeaderCustom
                title="Verify OTP"
                isBack={true}
                goBack={() => this.props.navigation.goBack()}
              />
              <View style={styles.content}>
                <OutlinedTextField
                  ref={this.otpRef}
                  label="OTP"
                  keyboardType="number-pad"
                  style={globalStyles.textInput}
                  labelTextStyle={globalStyles.textInput}
                  titleTextStyle={globalStyles.textInput}
                  tintColor={Colors.Black}
                  baseColor={Colors.Black}
                  errorColor={Colors.Black}
                  value={otp}
                  onFocus={this.onFocus}
                  onChangeText={(otp) => this.setState({otp})}
                  error={errors.otp}
                />
              </View>
              <Text style={globalStyles.errorMessageStyle}>{errorMessage}</Text>
              <View style={styles.content}>
                <TouchableOpacity
                  style={globalStyles.btnContainer}
                  onPress={() => this._doVerify()}>
                  <Text style={globalStyles.btnText}>Verify</Text>
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

export default connect(VerifyOTPScreen);
