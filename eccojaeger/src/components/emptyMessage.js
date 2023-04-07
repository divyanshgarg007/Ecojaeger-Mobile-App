/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './components.style';

export default function EmptyMessage(props) {
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyTitle}>{props.title}</Text>
    </View>
  );
}
