/* eslint-disable prettier/prettier */
import React from 'react';
import { Pressable } from 'react-native';
import FastImage from 'react-native-fast-image'
import { styles } from './components.style';

export default function HeaderActions(props) {
  return (
    <Pressable onPress={() => props.onPress()}>
      <FastImage source={props.icon} style={styles.iconSize} />
    </Pressable>
  );
}
