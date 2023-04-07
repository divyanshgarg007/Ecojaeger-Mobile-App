/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import { Platform, View } from 'react-native';
import { styles } from './components.style';

export default function QuantityInput(props) {
  const handleCount = data => {
    if (data >= 0) {
      props?.setCount(data);
    }
  };
  return (
    <View>
      <NumericInput
        onChange={data => handleCount(data)}
        value={props.count}
        editable={false}
        step={1}
        textColor="#000"
        iconStyle={styles.quantityIcon}
        rightButtonBackgroundColor="#fff"
        leftButtonBackgroundColor="#fff"
        totalWidth={90}
        totalHeight={Platform.OS === 'ios' ? 28 : 26}
        borderColor="#ddd"
        inputStyle={styles.inputSize}
        separatorWidth={1}
        minValue={props.minValue}
        maxValue={9999}
      />
    </View>
  );
}
