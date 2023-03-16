import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fontStyles';
import {getResponsiveHeight, getResponsiveWidth} from '../../helper/utils';

export default StyleSheet.create({
  listContent: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  nameContainer: {
    backgroundColor: Colors.LightBlack,
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: getResponsiveWidth(2),
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
    height: getResponsiveWidth(30),
    width: getResponsiveWidth(40),
    borderRadius: getResponsiveWidth(2),
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
