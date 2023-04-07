/* eslint-disable prettier/prettier */
import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },

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
