/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

const cardGap = 10;

export const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  cardBoxWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cardView: {
    marginTop: cardGap,
    width: '31.4%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
    marginBottom: 4,
  },
  catImageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  catImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  catName: {
    marginTop: 5,
    color: '#000',
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'center',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 116,
    backgroundColor: '#fff',
  },
  offlineMsg: {
    color: '#000',
    fontSize: 16,
    fontFamily: GlobalStyle.fontSet.Poppins500,
    textAlign: 'center',
    paddingTop: 10,
  },
  offlineIcon: {
    // paddingTop: normalize(20),
  },
  categoryItem: {
    flex: 1,
  },
  noInternetBox: { height: '100%', justifyContent: 'center', alignItems: 'center' },
});
