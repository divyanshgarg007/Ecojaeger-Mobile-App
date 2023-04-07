/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: '#fff',
  },
  cardContainer: {
    marginTop: (20),
    marginBottom: (5),
  },
  historyBox: {
    marginHorizontal: (15),
    // paddingVertical: (15),
    padding: (15),
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  historyTitle: {
    fontSize: 18,
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins600,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderPro: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: (10),
    paddingBottom: (10),
    borderBottomWidth: 1,
    borderColor: '#D9DBE9',
  },
  proName: {
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    width: '50%',
  },
  proUnit: {
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    width: '20%',
  },
  proQuantity: {
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    width: '10%',
  },
  proPrice: {
    fontSize: 15,
    color: '#000',
    width: '20%',
    textAlign: 'right',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  historyTotal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: (10),
    // paddingBottom: (10),
  },
  totalHistory: {
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  prices: {
    textAlign: 'right',
  },

});
