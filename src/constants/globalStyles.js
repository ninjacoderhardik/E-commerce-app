import {StyleSheet} from 'react-native';
import Colors from '../constants/colors';
import {
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth,
  statusBarHeight,
} from '../helper/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AuthBackground,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainer: {
    paddingHorizontal: getResponsiveWidth(8),
    paddingVertical: getResponsiveHeight(5),
  },
  authContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: getResponsiveWidth(8),
    paddingVertical: getResponsiveHeight(2),
  },
  authBackground: {
    width: WIDTH,
    flex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    backgroundColor: Colors.TintColor,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 50,
    marginHorizontal: 40,
  },
  btnText: {
    fontSize: 18,
    color: Colors.White,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  seperator: {
    backgroundColor: Colors.LightGray,
    height: 1,
  },
  textInput: {
    color: Colors.Black,
    fontFamily: 'Montserrat-Regular',
  },
  errorMessageStyle: {
    color: Colors.errorColor,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  closeContainer: {
    position: 'absolute',
    top: statusBarHeight + 15,
    right: getResponsiveWidth(4),
    padding: 10,
    zIndex: 1,
  },
  closeIcon: {
    color: Colors.White,
    fontSize: 40,
  },
});
