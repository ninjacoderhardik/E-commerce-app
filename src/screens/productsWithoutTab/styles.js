import {StyleSheet} from 'react-native';
import {getResponsiveHeight, getResponsiveWidth} from '../../helper/utils';

export default StyleSheet.create({
  listContent: {
    paddingHorizontal: getResponsiveWidth(2),
    paddingVertical: getResponsiveHeight(1),
  },
  spinner: {
    paddingVertical: getResponsiveHeight(2),
    alignItems: 'center',
  },
});
