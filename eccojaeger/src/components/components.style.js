/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../style/globalstyle';

export const styles = StyleSheet.create({
  quantityInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  cartselectItem: {
    fontSize: (14),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'left',
    marginLeft: (3),
  },
  cartselectBtn: {
    backgroundColor: '#fff',
    width: '100%',
    height: Platform.OS === 'ios' ? 30 : 30,
  },
  cartdropDownBoxItem: {
    fontSize: (13),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'left',
    padding: (10),
  },
  cartdropDownBox: {
    height: (44),
  },
  quantityIcon: { color: '#222222' },
  inputSize: { fontSize: (14), fontFamily: GlobalStyle.fontSet.Poppins400 },
  backdropContainer: {
    backgroundColor: '#43464B',
    opacity: 0.65,
  },
  innerOverlay: {
    backgroundColor: '#fff',
    width: '95%',
    paddingVertical: (20),
    paddingHorizontal: (25),
  },
  closeToggle: {
    position: 'absolute',
    right: (6),
    zIndex: 111,
    top: (6),
  },
  alertMessage: {
    fontSize: (16),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: (15),
    paddingBottom: (5),
    alignItems: 'center',
    width: '100%',
  },
  btnLeft: {
    flex: 0,
    flexBasis: '30%',
    marginRight: (20),
  },
  btnRight: {
    flex: 0,
    flexBasis: '30%',
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

  offlineMsg: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    textAlign: 'center',
    paddingTop: (10),
    backgroundColor: '#E04D010D',
  },

  noInternetBox: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  emptyBox: {
    paddingHorizontal: (15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: 'gray',
  },
  homeSearchContainer: {
    marginTop: (12),
    paddingHorizontal: (15),
    height: (48),
    width: '100%',
    zIndex: 11111,
  },
  homeSearchs: {
    flexDirection: 'row',
    borderRadius: (8),
    borderWidth: 1,
    borderColor: 'rgba(224, 77, 1, 0.2)',
    alignItems: 'center',
  },
  localSearch: {
    flexDirection: 'row',
    borderRadius: (8),
    borderWidth: 1,
    borderColor: 'rgba(224, 77, 1, 0.2)',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: (12),
  },

  searchImage: {
    marginLeft: (12),
    width: (24),
    height: (24),
    position: 'absolute',
  },
  searchImageLocal: {
    width: (24),
    height: (24),
    marginRight: (5),
  },
  inputSearchContainer: { margin: 0, padding: 0, backgroundColor: 'transparent' },
  searchBox: {
    flex: 1,
  },
  searchList: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 0,
    fontFamily: GlobalStyle.fontSet.Poppins400,
    zIndex: 11111,
  },
  searchListText: {
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
  },
  userselectItem: {
    fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'left',
    marginLeft: (16),
  },
  userselectBtn: {
    backgroundColor: '#fff',
    width: '100%',
    height: (55),
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderRadius: (4),
  },
  userdropDownBoxItem: {
    fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'left',
    marginLeft: (5),
    padding: (10),
  },
  userdropDownBox: {
    height: (40),
  },
  addQty: {
    borderColor: '#FA732E',
    borderWidth: 1,
    padding: (6),
    borderRadius: 2,
    textAlign: 'center',
  },
  minusQty: {
    borderColor: '#D9DBE9',
    borderWidth: 1,
    padding: (6),
    borderRadius: (2),
    textAlign: 'center',
  },
  qtyNumber: {
    fontSize: (14),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'center',
    paddingTop: (4),
  },
  iconSize: { width: Platform.OS === 'ios' ? (40) : (35), height: Platform.OS === 'ios' ? (40) : (35), marginLeft: 0 },
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
    paddingTop: (9),
    paddingBottom: (7),
    fontSize: (16),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  closeToggleSheet: {
    position: 'absolute',
    right: (15),
    zIndex: 111,
    top: (23),
  },
  unitBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: (5),
    height: Platform.OS === 'ios' ? 28 : 26,
  },
  unitSelected: {
    fontSize: (14),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    textAlign: 'left',
  },
  graphContainer: {
    width: '75%',
    marginLeft: 'auto',
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
  },
  innerContainerGraph: {
    marginTop: (10),
    width: '100%',
    flexDirection: 'row',
  },
  monthName: {
    position: 'absolute',
    left: (-80),
    top: (12),
    fontSize: (12),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    color: '#000',
  },
  barName: {
    marginLeft: (5),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (12),
    color: '000',
  },
  dietData: {
    marginTop: (7),
  },
  dataTable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (6),
    marginLeft: (10),
  },
  labelData: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
    color: '#222222',
  },
  innerData: {
    paddingLeft: (10),
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
    fontSize: (15),
  },
  uncheck: {
    width: (16),
    height: (16),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E04D01CC',
    borderRadius: (2),
  },
  check: {
    width: (9),
    height: (9),
    backgroundColor: '#E04D01CC',
    margin: Platform.OS === 'ios' ? (3) : (4),
    borderRadius: (2),
  },
  checkbox: {
    padding: (0),
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: (4),
  },
  backdropContainerBuying: {
    backgroundColor: '#43464B',
    opacity: 0.65,
  },
  innerOverlayBuying: {
    backgroundColor: '#fff',
    width: '93%',
  },
  closeToggleBuying: {
    position: 'absolute',
    right: (10),
    zIndex: 111,
    top: (6),
  },
  createInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: (10),
  },
  input: {
    height: (40),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (10),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (15),
    color: '#222222',
  },
  listLabel: {
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#222222',
    fontSize: (16),
    marginTop: (20),
    marginBottom: (5),
  },
  searchInput: {
    height: (44),
    paddingTop: Platform.OS === 'ios' ? 0 : (5),
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (10),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
    flex: 1,
    color: 'rgba(224, 77, 1, 1)',
  },

});
