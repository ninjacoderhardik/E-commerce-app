import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fontStyles';
import {getResponsiveWidth, getResponsiveHeight} from '../../helper/utils';

export default StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getResponsiveWidth(3),
    paddingVertical: getResponsiveHeight(1.3),
  },
  container: {
    flex: 1,
  },
  menuIconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: Colors.Black,
    fontSize: 25,
  },
  menuText: {
    paddingLeft: getResponsiveWidth(2),
    color: Colors.Black,
    fontSize: Fonts.MEDIUM,
    fontFamily: 'Montserrat-Bold',
  },

  contentContainer: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  profileImage: {
    height: getResponsiveWidth(15),
    width: getResponsiveWidth(15),
    borderRadius: getResponsiveWidth(15),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getResponsiveHeight(2),
    paddingHorizontal: getResponsiveWidth(2),
  },
  profileContent: {
    flex: 1,
    paddingLeft: getResponsiveWidth(3),
  },
  profileText: {
    fontSize: Fonts.EXTRA_LARGE,
    fontFamily: 'Montserrat-Bold',
    color: Colors.Black,
  },
  profileIconContainer: {
    paddingHorizontal: getResponsiveWidth(2),
  },
  profileIcon: {
    fontSize: 30,
    color: Colors.LightBlack,
  },
  insideContent: {
    paddingVertical: getResponsiveHeight(1),
  },
  profileContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(0.5),
  },
  profileIconInsideContainer: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoIcon: {
    fontSize: 25,
    color: Colors.LightBlack,
  },
  profileInfoText: {
    paddingLeft: 15,
    color: Colors.LightBlack,
    fontSize: Fonts.MEDIUM,
    fontFamily: 'Montserrat-Regular',
  },
});
