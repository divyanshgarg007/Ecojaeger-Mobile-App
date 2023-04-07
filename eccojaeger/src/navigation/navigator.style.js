import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../style/globalstyle';

export const styles = StyleSheet.create({
  navigatorText: {
    color: '#E04D01',
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 6,
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },

  closeOrderNav: {
    marginLeft: (15),
  },
  backIcon: {
    width: Platform.OS === 'ios' ? 40 : (40),
    height: Platform.OS === 'ios' ? 40 : (40),
    marginLeft: 0,
  },
  addIcon: {
    width: Platform.OS === 'ios' ? 20 : (20),
    height: Platform.OS === 'ios' ? 20 : (20),
  },
});
