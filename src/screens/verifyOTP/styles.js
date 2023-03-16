import {StyleSheet} from 'react-native';
import {WIDTH, getResponsiveHeight} from '../../helper/utils';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  content: {
    paddingVertical: getResponsiveHeight(0.5),
    alignSelf: 'center',
    width: WIDTH > 550 ? 500 : WIDTH - 40,
  },
});
