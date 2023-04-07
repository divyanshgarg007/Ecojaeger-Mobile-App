/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  filterIcon: { width: Platform.OS === 'ios' ? (40) : (35), height: Platform.OS === 'ios' ? (40) : (35), marginLeft: 0 },
  navigationView: {
    flexDirection: 'row',
    paddingVertical: (10),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 77, 1, 0.2)',
    marginBottom: (12),
  },
  navigationLabel: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#E04D01',
    fontSize: (20),
  },
  backIcon: {
    width: (35),
    height: (35),
    marginLeft: 15,
  },
});
