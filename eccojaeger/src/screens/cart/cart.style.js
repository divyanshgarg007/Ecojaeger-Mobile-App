/* eslint-disable prettier/prettier */
import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginAgain: {
    paddingHorizontal: (20),
    flex: 1,
    justifyContent: 'center',
  },
  btnGreen: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    marginTop: (20),
    marginBottom: (15),
    borderRadius: (8),
  },
  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
cartListView: { flex: 1, paddingHorizontal: (15) },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    opacity: 0.8,
    zIndex: 1111,
  },
});
