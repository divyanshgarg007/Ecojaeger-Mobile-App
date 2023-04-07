/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image'
import GlobalStyle from '../../../style/globalstyle';
import GoForward from '../../../assets/images/right-arrow.png';
import { API_CONSTANTS } from '../../../constants/constants';
export default function CategoryItem(props) {

  return (
    <Pressable style={styles.categoryContainer} onPress={() => props.onPress(props.item)}>
      <View style={styles.categoryCard}>
        <View style={styles.categoryBox}>
          <FastImage
            style={styles.categoryImage}
            resizeMode="contain"
            source={{
              uri: API_CONSTANTS.IMG_PREFIX + '/' + props.item?.image,
            }} />
          <Text style={styles.categoryLabel}>{props.item.name}</Text>
          <FastImage
            style={styles.goImage}
            resizeMode="contain"
            source={GoForward} />
        </View>
      </View>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: (15),
    paddingBottom: (12),
  },
  categoryCard: {
    backgroundColor: '#E04D010D',
    borderRadius: 8,
  },
  categoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: (12),
    paddingVertical: (6),
  },
  categoryImage: {
    width: (60),
    height: (40),
  },
  categoryLabel: {
    color: '#222222',
    fontSize: (16),
    width: '75%',
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  goImage: {
    width: (8),
  },
})