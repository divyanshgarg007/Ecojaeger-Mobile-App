/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  contactContainer: {
    paddingHorizontal: 20,
    // paddingTop: 15,
    backgroundColor: '#fff',
    flex: 1,

  },

  contactBox: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  contactInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
  },
  fieldSpace: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 15,
  },
  contactBtn: {
    backgroundColor: '#009640',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  actionTitle: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 15,
  },
});
