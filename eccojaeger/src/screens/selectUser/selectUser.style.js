/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
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
        right: (10),
        zIndex: 111,
        top: (10),
      },
      selectText: {
        fontSize: (15),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginBottom: (10),
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
        color: '#000000',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        textAlign: 'left',
        marginLeft: (5),
        padding: (10),
      },
      userdropDownBox: {
        height: (40),
      },
});
