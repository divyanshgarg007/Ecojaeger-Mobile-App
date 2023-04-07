/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { strings } from '../localization';
import GlobalStyle from '../style/globalstyle';

export default function NoInternet() {
  return (
    <View style={styles.container}>
      <Text style={styles.offlineMsg}>
        {strings.common.offlineMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E04D010D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  },
  offlineMsg: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins500,

  },
})
