import {StyleSheet} from 'react-native';
import {
  WIDTH,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../helper/utils';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  content: {
    paddingVertical: getResponsiveHeight(0.5),
    marginHorizontal: getResponsiveWidth(2),
    alignSelf: 'center',
    width: WIDTH > 550 ? 500 : WIDTH - 40,
  },
});
