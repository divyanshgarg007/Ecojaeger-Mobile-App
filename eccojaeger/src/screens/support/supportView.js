/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './support.style';
import { strings } from '../../localization';

export default function SupportView() {
  return (
    <View style={styles.supportContainer}>
      <Text style={styles.supportBox}>{strings.common.noData}</Text>
    </View>
  );
}
