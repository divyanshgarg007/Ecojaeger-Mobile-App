/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  supportContainer: {
    paddingHorizontal: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  supportBox: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
});
