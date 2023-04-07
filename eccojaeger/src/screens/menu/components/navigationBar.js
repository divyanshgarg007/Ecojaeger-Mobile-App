/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { styles } from '../menu.style';

export default function NavigationBar(props) {
  return (
    <View style={styles.closeMenu}>
      <Icon
        size={25}
        name="close"
        type="antdesign"
        color={'#000'}
        onPress={() => props.onClose()}
      />
    </View>
  );
}

