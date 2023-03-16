import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import {getResponsiveHeight, getResponsiveWidth} from '../../helper/utils';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: getResponsiveHeight(1),
  },
  content: {
    paddingVertical: getResponsiveHeight(0.5),
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: getResponsiveHeight(1),
    marginBottom: getResponsiveHeight(2),
  },
  logoImage: {
    height: getResponsiveHeight(8),
    width: getResponsiveWidth(50),
  },
  loginText: {
    textAlign: 'center',
    fontSize: getResponsiveHeight(2),
    color: Colors.DarkWhite,
    fontFamily: 'Lato-Regular',
  },
  loginBtnText: {
    color: Colors.White,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  orText: {
    color: Colors.White,
    fontSize: getResponsiveHeight(2),
    textAlign: 'center',
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: getResponsiveHeight(1.2),
  },
  checkIconContainer: {
    flex: 0.15,
    // top: getResponsiveHeight(-0.5)
  },
  checkTextContainer: {
    flex: 0.85,
  },
  checkIcon: {
    height: getResponsiveWidth(5),
    width: getResponsiveWidth(5),
    tintColor: Colors.White,
  },
  checkText: {
    color: Colors.White,
    fontSize: getResponsiveHeight(2),
    lineHeight: getResponsiveHeight(2.5),
    fontFamily: 'Lato-Regular',
  },
});
