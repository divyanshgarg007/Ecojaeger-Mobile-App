/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  contactContainer: {
    paddingHorizontal: (20),
    // backgroundColor: '#fff',
    flex: 1,
  },

  contactBox: {
    marginTop: (20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#222222',
    fontSize: (20),
    textAlign: 'center',
  },
  contactInputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: (10),
    marginBottom: (10),
  },
  fieldSpace: {
    marginBottom: (20),
  },
  input: {
    height: (40),
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: (10),
    paddingRight: (10),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (15),
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: (10),
    textAlignVertical: 'top',
    fontSize: (14),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginTop: (10),
  },
  contactBtn: {
    backgroundColor: '#009640',
    width: '100%',
    height: (40),
    justifyContent: 'center',
    alignContent: 'center',
  },
  actionTitle: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: (15),
  },
  contactInfoBox: {
    marginTop: (25),
    marginBottom: (25),
  },
  contactInfoTitle: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
    color: '#222222',
    fontSize: (20),
    paddingBottom: (10),
  },
  contactDetails: {
    fontFamily: GlobalStyle.fontSet.Poppins400,
    color: '#222222',
    fontSize: (15),
    paddingBottom: (10),
  },
  label: {
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
});
