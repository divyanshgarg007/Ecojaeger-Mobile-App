/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { styles } from './components.style';

export default function CustomQuantity(props) {
  const handleMinus = () => {
    if (props?.count > 1) {
      props?.setCount(props?.count - 1);
    }
  };
  const handleAdd = () => {
    props?.setCount(props?.count + 1);
  };
  return (
    <View>
      <Icon
        size={(16)}
        name="plus"
        type="antdesign"
        color="#FA732E"
        containerStyle={styles.addQty}
        onPress={() => handleAdd()}
      />
      <Text style={styles.qtyNumber}>{props.count}</Text>
      <Icon
        size={(17)}
        name="minus"
        type="antdesign"
        color="#FA732E"
        containerStyle={styles.minusQty}
        onPress={() => handleMinus()}
      />
    </View>
  );
}
