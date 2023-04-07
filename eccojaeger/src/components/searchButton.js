/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import SearchIcon from '../assets/images/search.png';
import { strings } from '../localization';
import GlobalStyle from '../style/globalstyle';

export default function SearchButton(props) {
  const onClick = () => {
    props.onPress();
  };
  return (
    <Pressable style={styles.searchCard} onPress={() => onClick()}>
      <FastImage
        style={styles.productAdd}
        resizeMode="contain"
        source={SearchIcon}
      />
      <Text style={styles.searchLabel}>{strings.common.searchProduct}</Text>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  searchCard: {
    borderColor: '#E04D0133',
    borderWidth: 1,
    borderRadius: (8),
    flexDirection: 'row',
    marginHorizontal: (15),
    paddingHorizontal: (12),
    paddingVertical: (10),
    marginTop: (10),
  },
  productAdd: {
    width: (24),
    height: (24),
    marginRight: (14),
  },
  searchLabel: {
    color: '#E04D0199',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins400,
  },
});
