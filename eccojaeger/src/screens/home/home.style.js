/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
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
  listName: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (18),
    textAlign: 'center',
    marginBottom: (10),
  },
  listItems: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingTop: (7),
    paddingBottom: (7),
    fontSize: (16),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  closeToggle: {
    position: 'absolute',
    right: (15),
    zIndex: 111,
    top: (23),
  },
  addToggle: {
    position: 'absolute',
    left: (15),
    zIndex: 111,
    top: (23),
  },
  indicator: {
    padding: 20
  },
  filterIcon: {
    width: Platform.OS === 'ios' ? (40) : (35),
    height: Platform.OS === 'ios' ? (40) : (35),
    marginLeft: 0
  },
  itemContainer: {
    zIndex: -1,
    //paddingHorizontal: (15),
    //marginBottom: 120
  },

  syncContainer: {
    paddingVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E04D010D',
  },
  offlineMsg: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins500,

  },
});
