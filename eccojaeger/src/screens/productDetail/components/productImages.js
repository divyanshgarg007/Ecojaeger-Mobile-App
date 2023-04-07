/* eslint-disable prettier/prettier */
import React from 'react';
import FastImage from 'react-native-fast-image'
import { Card } from 'react-native-elements';
import AppFunction from '../../../assets/images/carot.jpg';
import { styles } from '../productDetail.style';

export default function AppItems(props) {
  return (
    <Card containerStyle={styles.imageCardBox}>
      <FastImage
        style={styles.productImage}
        resizeMode="cover"
        source={AppFunction}
      />
    </Card>
  );
}
