/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBox: { width: '10%', paddingTop: (12) },
  backIcon: {
    width: (35),
    height: (35),
    marginLeft: (10),
  },
  searchBox: { width: '90%' },
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
  listName: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (18),
    textAlign: 'center',
    marginBottom: (10),
  },
  listItems: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingTop: (7),
    paddingBottom: (7),
    fontSize: (16),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
