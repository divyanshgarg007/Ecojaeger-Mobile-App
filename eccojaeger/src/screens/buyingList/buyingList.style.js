/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  buyhomeContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  buycardBox: {
    marginTop: (12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 77, 1, 0.2)',
    paddingHorizontal: (15),
  },
  buyproductBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: (12),
  },
  buyproductInfoBox: {
    paddingTop: (5),
    flexDirection: 'row',
    alignItems: 'center',
    width: '68%',
  },
  listActions: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  downIcon: {
    marginLeft: (30),
  },
  buyproName: {
    alignItems: 'center',
    color: '#222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (16),
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
    borderRadius: (8),
    marginTop: (20),
  },
  btnLight: {
    backgroundColor: '#E04D011A',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#D9DBE9',
    width: '100%',
    borderRadius: (8),
  },
  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
  titleDark: {
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
  },
  productAdd: {
    width: (24),
    height: (24),
    marginRight: (10),
  },

});
