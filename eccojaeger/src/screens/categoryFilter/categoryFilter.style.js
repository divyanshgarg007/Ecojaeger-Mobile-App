/* eslint-disable prettier/prettier */
import { StyleSheet, Platform } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  filterContainer: {
    // paddingTop: normalize(20),
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },

  innerFilterContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    // paddingVertical: normalize(10),
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 7,
  },
  uncheck: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
  },
  check: {
    width: 10,
    height: 10,
    backgroundColor: '#009640',
    margin: 2,
    borderRadius: 2,
  },
  filterLabel: {
    fontSize: 16,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  filterLabelOpen: {
    fontSize: 16,
    color: '#009640',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  childCheckboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allCategories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
  },
  childCheckbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChilds: {
    marginLeft: 40,
  },
  childFilterLabel: {
    paddingTop: Platform.OS === 'ios' ? 0 : 6,
    fontSize: 14,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  activeChild: {
    color: '#009640',
    paddingTop: Platform.OS === 'ios' ? 0 : 6,
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
  childFilterLabelUp: {
    marginLeft: 5,
    paddingTop: 6,
    fontSize: 15,
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  activeCategory: {
    color: '#009640',
    marginLeft: 5,
    paddingTop: 6,
    fontSize: 15,
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  noCategory: {
    marginLeft: 15,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
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
    backgroundColor: '#009640',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#009640',
    width: '100%',
  },
  btnLight: {
    backgroundColor: 'transparent',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#009640',
    width: '100%',
  },
  actionTitle: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 15,
  },
  titleDark: {
    color: '#009640',
  },
});
