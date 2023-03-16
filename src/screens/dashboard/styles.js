import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fontStyles';
import {getResponsiveHeight, getResponsiveWidth} from '../../helper/utils';

export default StyleSheet.create({
  itemContent: {
    paddingVertical: getResponsiveHeight(1),
  },
  listContent: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  itemTitle: {
    fontSize: Fonts.LARGE,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    marginBottom: getResponsiveHeight(0.5),
    color: Colors.TextColor,
  },
  itemLink: {
    fontSize: Fonts.MEDIUM,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    marginBottom: getResponsiveHeight(0.5),
    color: Colors.linkColor,
  },
  listTitle: {
    paddingHorizontal: getResponsiveWidth(3),
    paddingTop: getResponsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  nameContainer: {
    backgroundColor: Colors.LightBlack,
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: getResponsiveWidth(1),
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: Fonts.EXTRA_LARGE,
    fontWeight: '500',
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
    textAlign: 'center',
    paddingHorizontal: getResponsiveWidth(2),
  },
  categoryImage: {
    height: getResponsiveWidth(40),
    width: getResponsiveWidth(40),
    borderRadius: getResponsiveWidth(1),
  },
  itemContainer: {
    backgroundColor: Colors.White,
    borderRadius: getResponsiveWidth(2),
    marginHorizontal: getResponsiveWidth(1),
    padding: getResponsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getResponsiveHeight(0.5),
  },
});
