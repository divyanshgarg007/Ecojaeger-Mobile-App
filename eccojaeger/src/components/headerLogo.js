/* eslint-disable prettier/prettier */
import React from 'react';

import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image'
import appLogo from '../assets/images/appLogo.png';
import mouseLogo from '../assets/images/logo-mous.png';

const HeaderLogo = () => {
  return (
    <>
      <FastImage style={
        {
          width: Platform.OS === 'ios' ? (160) : (160),
          height: Platform.OS === 'ios' ? (33) : (33),
        }
      } source={appLogo} />
    </>
  );
};

export default HeaderLogo;
