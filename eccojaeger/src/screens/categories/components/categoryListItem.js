/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../categories.style';
import FastImage from 'react-native-fast-image'

export default function CategoryListItem(props) {
  return (
    <View
      style={styles.itemContainer}>
      <Pressable
        onPress={() => {
          props.onPress();
        }}
        style={styles.categoryItem}>
        <View style={styles.catImageBox}>
          <FastImage
            source={{ uri: props.item.image }}
            style={styles.catImage}
          />
          <Text style={styles.catName}>{props.item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}
