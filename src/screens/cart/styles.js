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
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  headerLeftLogo: {
    height: getResponsiveHeight(3),
    width: getResponsiveWidth(15),
    marginVertical: getResponsiveHeight(1),
    tintColor: Colors.ActiveTabColor,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: getResponsiveHeight(0.5),
  },
  itemContentImage: {
    height: getResponsiveWidth(25),
    width: getResponsiveWidth(25),
    borderRadius: getResponsiveWidth(2),
    backgroundColor: Colors.AuthBackground,
    marginRight: getResponsiveWidth(4),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingHorizontal: getResponsiveHeight(1),
    paddingVertical: getResponsiveHeight(1),
    borderRadius: getResponsiveWidth(2),
  },
  btnText: {
    fontSize: getResponsiveHeight(2),
    marginVertical: getResponsiveHeight(0.5),
    color: Colors.TextColor,
    fontFamily: 'Montserrat-Regular',
  },
  btnPriceText: {
    fontSize: getResponsiveHeight(2.5),
    marginTop: getResponsiveHeight(0.5),
    marginBottom: getResponsiveHeight(1),
    color: Colors.TextColor,
    fontFamily: 'Montserrat-Bold',
  },
  btnDeleteIconContainer: {
    borderColor: Colors.LightGray,
    borderWidth: 2,
    borderRadius: getResponsiveHeight(4),
    height: getResponsiveHeight(5),
    width: getResponsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDeleteIcon: {
    fontSize: getResponsiveHeight(2.5),
    color: Colors.LightGray,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneBtnContainer: {
    backgroundColor: Colors.TintColor,
    paddingHorizontal: getResponsiveWidth(5),
    paddingVertical: getResponsiveHeight(1.5),
    marginHorizontal: getResponsiveWidth(5),
    marginTop: getResponsiveHeight(1),
  },
  doneBtnText: {
    textAlign: 'center',
    fontSize: getResponsiveHeight(2),
    color: Colors.White,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
  },

  cancelBtnContainer: {
    borderColor: Colors.TintColor,
    borderWidth: 1,
    paddingHorizontal: getResponsiveWidth(5),
    paddingVertical: getResponsiveHeight(1.5),
    marginHorizontal: getResponsiveWidth(5),
    marginVertical: getResponsiveHeight(1),
  },
  cancelBtnText: {
    textAlign: 'center',
    fontSize: getResponsiveHeight(2),
    color: Colors.TintColor,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
  },
  dropdownContent: {
    justifyContent: 'center',
    borderColor: Colors.LightGray,
  },
  dropdown: {
    height: getResponsiveHeight(3.5),
    borderRadius: 0,
    borderColor: Colors.LightGray,
    borderWidth: 1,
    paddingTop: getResponsiveHeight(0.3),
  },
  dropdownIcon: {
    position: 'absolute',
    right: 0,
    color: Colors.LightGray,
  },
  plusMinusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.ContrastTextColor,
    borderWidth: 1,
  },
  plusMinusContent: {
    flex: 0.25,
  },
  plusMinusIcon: {
    color: Colors.TextColor,
    textAlign: 'center',
    fontSize: Fonts.LARGE,
  },
  qtyContainer: {
    flex: 0.5,
    borderColor: Colors.ContrastTextColor,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 5,
  },
  qtyText: {
    color: Colors.TextColor,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: Fonts.MEDIUM,
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
  textInputContent: {
    paddingVertical: getResponsiveHeight(0.5),
    marginHorizontal: getResponsiveWidth(2),
    alignSelf: 'center',
    width: WIDTH > 550 ? 500 : '100%',
    marginTop: getResponsiveHeight(2),
  },
});
