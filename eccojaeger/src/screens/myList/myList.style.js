import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import GlobalStyle from '../../style/globalstyle';

export const styles = StyleSheet.create({
  mylistContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  mylistText: {
    color: '#000',
    fontSize: 22,
    fontFamily: GlobalStyle.fontSet.Poppins600,
    textAlign: 'center',
    marginBottom: 20,
  },
  mylistcardBox: {
    padding: 0,
    borderWidth: 0,
    marginTop: 2,
    paddingBottom: 15,
    marginBottom: 15,
    elevation: 0,
    borderBottomColor: '#ddd',
    alignContent: 'center',
    justifyContent: 'center',
  },
  mylistBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  mylistInfoBox: {
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 150,
    width: 150,
  },
  mylistname: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.Poppins500,
    fontSize: 15,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    textAlign: 'center',
  },
  mylistCategory: {
    color: '#444',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: 13,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    textAlign: 'center',
  },
  mylistBtn: {
    backgroundColor: '#009640',
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
});
