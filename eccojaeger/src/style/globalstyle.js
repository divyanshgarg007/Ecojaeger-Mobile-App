import {Dimensions} from 'react-native';

const _fontSet = {
  Poppins900: 'Poppins-Black',
  Poppins800: 'Poppins-ExtraBold',
  Poppins700: 'Poppins-Bold',
  Poppins600: 'Poppins-SemiBold',
  Poppins500: 'Poppins-Medium',
  Poppins400: 'Poppins-Regular',
  Poppins300: 'Poppins-Light',
};

const GlobalStyle = {
  fontSet: _fontSet,
  width: Dimensions.get('screen').width,
};

export default GlobalStyle;
