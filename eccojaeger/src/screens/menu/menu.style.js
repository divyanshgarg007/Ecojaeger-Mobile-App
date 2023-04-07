/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  menuContainer: {
    paddingTop: (15),
    backgroundColor: '#fff',
    flex: 1,
  },
  menuLists: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  menuItems: {
    fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingHorizontal: (25),
    paddingVertical: (15),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: (22),
    paddingBottom: (15),
  },
  loginInfo: {
    padding: 0,
  },
  userName: {
    fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (10),
  },
  userIcon: {
    color: '#E04D01CC',
    padding: (7),
    borderRadius: 100,
  },
  closeMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: (15),
    marginBottom: (10),
  },
  signInBtn: {
    color: '#E04D01',
    fontSize:(15),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingHorizontal: (25),
    paddingVertical: (15),
  },
  signOut: {
    fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingHorizontal: (25),
    paddingVertical: (15),
  },
  loginBox:{ borderBottomColor: '#ddd',
  borderBottomWidth: 1, width: '100%'},

});
