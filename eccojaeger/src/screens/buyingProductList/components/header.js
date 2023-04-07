/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';
import GlobalStyle from '../../../style/globalstyle';
import { strings } from '../../../localization';

export default function Header(props) {
  return (
    <View style={styles.deliveryInfoContainer}>
      <View style={styles.deliveryContainer}>
        <CheckBox
          checked={props?.sort}
          checkedIcon={
            <View style={styles.uncheck}>
              <View style={styles.check} />
            </View>
          }
          uncheckedIcon={<View style={styles.uncheck} />}
          style={styles.check}
          title={<Text style={styles.deliverText}>{strings.common.alphabet}</Text>}
          containerStyle={styles.checkbox}
          onPress={() => props?.setSort(props?.sort ? 0 : 1)}
        />
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  deliveryInfoContainer: {
    paddingHorizontal: (15),
    paddingTop: (15),
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: (10),
  },
  checkbox: {
    padding: (0),
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: (4),
  },
  uncheck: {
    width: (16),
    height: (16),
    backgroundColor: 'transparent',
    borderWidth: 1,
    margin: (0),
    borderColor: '#E04D01CC',
    borderRadius: (2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  check: {
    width: (9),
    height: (9),
    backgroundColor: '#E04D01CC',
    //margin: Platform.OS === 'ios' ? (3) : (4),
    borderRadius: (2),
  },
  deliverText: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    paddingLeft: (10),
    paddingTop: Platform.OS === 'ios' ? (0) : (5),
  },
});