/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image'
import GlobalStyle from '../../../style/globalstyle';

export default function BannerImages(props) {
  return (
    <View style={styles.imageCardBox}>
      <FastImage
        style={styles.sliderImage}
        resizeMode="cover"
        source={{ uri: props?.item?.source?.imageURL ? (props.item.source?.imageURL.length > 0 ? props.item.source?.imageURL : null) : null }}
      />
      <View style={styles.sliderContent}>
        <View style={styles.sliderBox}>
          <Text style={styles.functionTitle}>{props?.item?.source?.primaryDesc?.replace(/(\r\n|\n|\r)/gm, '')}</Text>
          <Pressable >
            <Text style={styles.functionSubTitle} onPress={() => props?.item?.source?.itemNumber ? props?.handleProductDetail(props?.item?.source?.itemNumber) : props?.item?.source?.link ? Linking.openURL(props?.item?.source?.link) : ''}>
              {props?.item?.source?.secondaryDesc?.replace(/(\r\n|\n|\r)/gm, '')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  sliderImage: {
    // width: '100%',
    height: (140),
    borderRadius: (0),
    flex: 1,
  },
  imageCardBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0,
  },

  sliderContent: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: (0),
    height: '100%',
    width: '100%',
  },
  sliderBox: {
    width: '100%',
    height: '100%',
    paddingHorizontal: (20),
    textAlign: 'left',
    justifyContent: 'center',
  },
  functionTitle: {
    color: '#fff',
    fontSize: (22),
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
  functionSubTitle: {
    color: '#fff',
    fontSize: (13),
    fontFamily: GlobalStyle.fontSet.Poppins500,
  },
});
