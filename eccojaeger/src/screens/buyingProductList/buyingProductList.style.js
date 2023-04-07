/* eslint-disable prettier/prettier */
import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  productlistContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  buyingListActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (15),
    paddingVertical: (15),
    alignItems: 'center',
    width: '100%',
    borderTopColor: '#E04D0133',
    borderTopWidth: 1,
  },

  listActionsCheckout: {
    flex: 0,
    flexBasis: '100%',
    marginRight: (6),
  },
  btnGreen: {
    marginTop: (5),
    backgroundColor: '#E04D0199',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    width: '100%',
    borderRadius: (8),
  },

  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },


  navigatorText: {
    color: '#E04D01',
    fontSize: Platform.OS === 'ios' ? 22 : 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 6,
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  backIcon: {
    width: Platform.OS === 'ios' ? 40 : (40),
    height: Platform.OS === 'ios' ? 40 : (40),
  },
  addIcon: {
    width: Platform.OS === 'ios' ? 20 : (20),
    height: Platform.OS === 'ios' ? 20 : (20),
  },
});
