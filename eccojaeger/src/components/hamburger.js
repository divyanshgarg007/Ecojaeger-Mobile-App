/* eslint-disable prettier/prettier */
import React from 'react';
import { Pressable } from 'react-native';

import FastImage from 'react-native-fast-image'
import hamburgerIcon from '../assets/images/hamburger.png';
import { styles } from './components.style';

const Hamburger = props => {
  const onClick = () => {
  };
  return (
    <Pressable onPress={() => props.onClick()}>
      <FastImage source={hamburgerIcon} style={styles.iconSize} />
    </Pressable>
  );
};

export default Hamburger;
