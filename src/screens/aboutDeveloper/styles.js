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
  headerText: {
    fontSize: Fonts.LARGE,
    color: Colors.Black,
    paddingHorizontal: getResponsiveWidth(4),
    paddingBottom: getResponsiveHeight(2),
    fontFamily: 'Montserrat-Regular',
  },
  insideContent: {
    paddingVertical: getResponsiveHeight(2),
  },
});
