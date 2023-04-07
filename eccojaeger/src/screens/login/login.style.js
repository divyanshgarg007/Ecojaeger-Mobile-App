/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  loginContainer: {
    paddingHorizontal: (20),
    paddingTop: (0),
    backgroundColor: '#fff',
    flex: 1,
  },

  loginBox: {
    marginTop: (20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#000',
    fontSize: (20),
    textAlign: 'left',
  },
  loginInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: (10),
    marginBottom: (10),
  },
  fieldSpace: {
    marginBottom: (20),
  },
  input: {
    color: '#000',
    height: (40),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (10),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (15),
  },
  loginBtn: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    borderRadius: (8),
  },
  actionTitle: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
});
