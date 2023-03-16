import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import {getResponsiveHeight, getResponsiveWidth} from '../../helper/utils';
import Fonts from '../../constants/fontStyles';

export default StyleSheet.create({
  listContent: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  spinner: {
    paddingVertical: getResponsiveHeight(2),
    alignItems: 'center',
  },

  itemContainer: {
    backgroundColor: Colors.White,
    borderRadius: getResponsiveWidth(2),
    marginHorizontal: getResponsiveWidth(1),
    paddingHorizontal: getResponsiveWidth(4),
    paddingTop: getResponsiveHeight(2),
    paddingBottom: getResponsiveHeight(1.5),
    marginVertical: getResponsiveHeight(0.5),
  },
  itemTitle: {
    fontSize: Fonts.LARGE,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    marginBottom: getResponsiveHeight(0.5),
    color: Colors.TextColor,
  },
  itemSubTitle: {
    fontSize: Fonts.MEDIUM,
    fontFamily: 'Montserrat-Bold',
    color: Colors.ContrastTextColor,
  },
  itemDate: {
    fontSize: Fonts.SMALL,
    fontFamily: 'Montserrat-Regular',
    color: Colors.ContrastTextColor,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
