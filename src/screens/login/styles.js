import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import {
  getResponsiveHeight,
  getResponsiveWidth,
  WIDTH,
} from '../../helper/utils';
import Fonts from '../../constants/fontStyles';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: getResponsiveHeight(4),
  },
  textInputContent: {
    paddingVertical: getResponsiveHeight(0.5),
    marginHorizontal: getResponsiveWidth(2),
    alignSelf: 'center',
    width: WIDTH > 550 ? 500 : WIDTH - 40,
  },
  content: {
    paddingVertical: getResponsiveHeight(0.5),
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: getResponsiveHeight(1),
    marginBottom: getResponsiveHeight(5),
  },
  logoImage: {
    height: getResponsiveHeight(15),
    width: '100%',
    tintColor: Colors.ActiveTabColor,
  },
  forgotContainer: {
    paddingVertical: getResponsiveHeight(0.5),
    alignItems: 'center',
  },
  forgotText: {
    marginTop: getResponsiveHeight(3),
    fontSize: Fonts.LARGE,
    color: Colors.Black,
    textAlign: 'right',
    fontFamily: 'Montserrat-Regular',
  },
  faqText: {
    textAlign: 'center',
    fontSize: Fonts.LARGE,
    color: Colors.Black,
    fontFamily: 'Montserrat-Regular',
  },
  signupText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LightBlack,
  },
  modalView: {
    width: getResponsiveWidth(85),
    maxHeight: getResponsiveHeight(70),
    backgroundColor: Colors.White,
    borderRadius: 8,
  },
  modalText: {
    fontSize: Fonts.MEDIUM,
    color: Colors.Black,
    fontFamily: 'Montserrat-Bold',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TintColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    color: Colors.White,
    fontFamily: 'Montserrat-Bold',
  },
  closeIcon: {
    fontSize: 30,
    color: Colors.White,
  },
  modalcontentContainer: {
    backgroundColor: Colors.White,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
