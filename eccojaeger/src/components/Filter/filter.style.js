/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  filterProducts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dataFilter: {
    borderWidth: 1,
    borderColor: '#D9DBE9',
    width: '48%',
    borderRadius: (8),
    backgroundColor: '#E04D011A',
  },
  filterCheckbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    paddingVertical: (12),
  },
  uncheck: {
    width: (16),
    height: (16),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E04D01',
    borderRadius: (2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  check: {
    width: (9),
    height: (9),
    backgroundColor: '#E04D01',
    borderRadius: (2),
  },
  dataName: {
    color: '#E04D01',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
    paddingTop: Platform.OS === 'ios' ? (0) : (5),
  },
  selectedDataName: {
    color: '#E04D01',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (12),
    paddingTop: Platform.OS === 'ios' ? (0) : (5),
  },
  categoryContainer: {
    marginTop: (12),
    borderWidth: 1,
    borderColor: '#D9DBE9',
    borderRadius: (8),
    paddingHorizontal: (20),
    paddingVertical: (12),
    backgroundColor: '#E04D011A',
  },
  categoryContainerActive: {
    marginTop: (12),
    borderWidth: 1,
    borderColor: '#D9DBE9',
    borderRadius: (8),
    paddingHorizontal: (20),
    paddingVertical: (12),
    backgroundColor: '#E04D011A',
  },
  allCategoriesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  allCategoriesFilter: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  allCategoriesActive: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },

  currentCategories: {
    paddingHorizontal: (11),
  },
  currentCategoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: (11),
    paddingTop: (7),
  },

  subCategoriesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: (7),
  },
  multipleParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: (11),
    paddingTop: (7),
  },
  allsubCategories: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  allsubCategoriesActive: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  subCategories: {
    color: '#A0A3BD',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  subCategoriesActive: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  subIcon: {
    paddingRight: (10),
  },
  subIconActive: {
    paddingRight: (10),
  },
  onParent: {
    paddingRight: (10),
  },
  onParentActive: {
    paddingRight: (10),
  },
  subInnerCategoriesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: (5),
  },
  subInnerCategories: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (12),
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
  },
  subInnerCategoriesActive: {
    color: '#E04D01',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (12),
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
  },
  subInnerCheckbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    paddingTop: (6),
    paddingBottom: (6),
  },
  uncheckSubInner: {
    width: (16),
    height: (16),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E04D01',
    borderRadius: (50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkSubInner: {
    width: (9),
    height: (9),
    backgroundColor: '#E04D01',
    borderRadius: (50),
  },
  allCategories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filterChilds: {
    marginLeft: (40),
  },
  subCatLabel: {
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
    fontSize: (14),
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  currentCatLabel: {
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
    fontSize: (14),
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  currentCatLabelActive: {
    paddingTop: Platform.OS === 'ios' ? (0) : (4),
    fontSize: (14),
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  noCategory: {
    marginLeft: (15),
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa',
    opacity: 0.8,
    zIndex: 1111,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: (12),
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  clearBtn: {
    flex: 0,
    flexBasis: '45%',
  },
  doneBtn: {
    flex: 0,
    flexBasis: '45%',
  },
  btnGreen: {
    backgroundColor: '#E04D0199',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    width: '100%',
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
  boxCurrent: {
    paddingHorizontal: (10),
  },
  boxCurrentSub: {
    paddingHorizontal: (0),
  },
  subCatTouch: {
    paddingHorizontal: (10),
  },
  boxParent: {
    paddingHorizontal: (10),
  },
  lastItem: {
    marginLeft: (15),
    flexDirection: 'row',
  },
});
