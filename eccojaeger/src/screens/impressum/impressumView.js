/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './impressum.style';
import { strings } from '../../localization';

export default function ImpressumView() {
  return (
    <View style={styles.supportContainer}>
      <Text style={styles.supportBox}>{strings.common.noData}</Text>
    </View>
  );
}
