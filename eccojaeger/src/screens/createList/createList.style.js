/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  createContainer: {
    paddingHorizontal: (20),
    paddingTop: (25),
    backgroundColor: '#fff',
    flex: 1,
  },

  createBox: {
    marginTop: (20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#000',
    fontSize: (16),
  },
  createInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: (20),
    marginTop: (10),
  },
  input: {
    height: (40),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (10),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (15),
    color: '#000',
  },

  createBtn: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    borderRadius: (8),
  },
  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
});
