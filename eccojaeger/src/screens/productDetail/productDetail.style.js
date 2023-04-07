/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  productDetailContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: (5),
    paddingBottom: (15),
  },
  imageContainerBox: {

  },
  imageCardBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0,
  },
  dotSlide: {
    width: (13),
    height: (13),
    borderRadius: (50),
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: '#fff',
    borderColor: '#222222',
    borderWidth: 1,
  },
  dotSlideBox: {
    position: 'absolute',
    bottom: (15),
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  relatedDot: {
    bottom: (0),
  },
  productImage: {
    width: '100%',
    height: (180),
    borderRadius: (5),
  },
  productInfo: {
    paddingHorizontal: (20),
    paddingVertical: (15),
  },
  productQuantity: {
    paddingLeft: (18),
  },
  productName: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (20),
  },
  perPrice: {
    color: '#fff',
    fontSize: (12),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    backgroundColor: '#FA732E',
    textAlign: 'center',
    paddingTop: (5),
    paddingBottom: (4),
    paddingHorizontal: (4),
    borderRadius: 2,
    width: (75),
  },
  productPrice: {
    marginTop: (10),
    color: '#E04D01CC',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    backgroundColor: '#E04D011A',
    paddingHorizontal: (8),
    paddingVertical: (4),
    borderRadius: (4),
  },
  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: (10),
    marginBottom: (3),
  },
  inputFieldsBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitsBox: {
    width: (90),
    marginLeft: (5),
    marginRight: (15),
  },
  addCartBox: {
    backgroundColor: '#fff',
    paddingHorizontal: (20),
    paddingBottom: (20),
  },
  createBtn: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
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
  aboutInfo: {
    paddingTop: (20),
  },
  aboutProduct: {
    paddingTop: (10),
  },
  specificationHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: (10),
  },
  aboutText: {
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (18),
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  aboutProText: {
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (20),
  },
  descText: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
    width: '50%',
    textAlign: 'right',
    //backgroundColor: 'yellow',
  },
  descTextCol: {
    marginTop: 5,
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
    width: '100%',
    textAlign: 'right',
    //backgroundColor: 'yellow',
  },
  addBreak: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: '#A0A3BD',
    paddingVertical: (7),
  },
  addBreakCol: {
    //backgroundColor: 'red',
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: '#A0A3BD',
    paddingVertical: (7),
  },
  addTextHeading: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (16),
    width: '50%',

  },
  addTextHeadingCol: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (16),
    width: '100%',

  },
  relatedProduct: {
    backgroundColor: '#fff',
    marginBottom: (20),
  },
  relatedText: {
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (22),
    paddingHorizontal: (20),
    marginBottom: (10),
    marginTop: (10),
  },
  relatedBox: {
    borderWidth: 1,
    borderColor: '#D9DBE9',
    borderRadius: 0,
    flex: 1,
    padding: (12),
    marginRight: (2),
    marginLeft: (20),
  },
  moreBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  relatedImageBox: {
  },
  relatedProdImage: {
    width: (60),
    height: (60),
    borderRadius: (5),
  },
  contentBox: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: (30),
  },
  actionIcons: {
    paddingBottom: (11),
  },

  relatedPer: {
    fontSize: (12),
    paddingVertical: (4),
    paddingHorizontal: (8),
  },
  relatedBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: (10),
    width: '100%',
  },
  relatedProdPrice: {
    fontSize: (12),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    width: '50%',
  },
  relatedUnit: {
    width: '50%',
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
  iconSize: { width: Platform.OS === 'ios' ? 35 : (32), height: Platform.OS === 'ios' ? 35 : (32), marginLeft: 0 },
  detailsLink: {
    color: '#164193',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  addToggle: {
    position: 'absolute',
    left: (15),
    zIndex: 111,
    top: (23),
  },
  productAdd: {
    width: (24),
    height: (24),
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (15),
    width: '100%',
  },
  unitBox: {
    flex: 1,
  },
  cartIconRelated: {
    marginTop: (20),
  },
  promotionPerPrice: {
    marginTop: 10,
    color: '#E04D01CC',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginRight: (15),
    borderRadius: (2),
    paddingVertical: (4),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
