/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MinusIcon from '../../../assets/images/minus.png';
import PlusIcon from '../../../assets/images/add.png';
import GlobalStyle from '../../../style/globalstyle';
import { CustomTextInput } from '../../../components';
import FastImage from 'react-native-fast-image'
export default function QuantityInputCart(props) {
  const [value, setValue] = useState(props?.count)
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    setValue(props?.count)
    setEnable(true)
  }, [props?.count])

  useEffect(() => {
    if (value.length > 0) {
      props?.handleQuantityUpdate(parseFloat(value), props?.item);
    }
  }, [value])

  const handleMinus = () => {

    let lValue = value
    if (lValue === "") {
      /**
       * if value become "" by user change from keyboard the make lValue = 2; 
       */
      lValue = 2
    }

    if (lValue > 1) {
      if (lValue % 1 !== 0 && (lValue < (1 + 1))) {
        setValue(1);
        props?.handleQuantityUpdate(1, props?.item);
        setEnable(false)
      } else {
        let minusNumber = (lValue - 1).toFixed(1)
        setValue(parseFloat(minusNumber))
        props?.handleQuantityUpdate(minusNumber, props?.item);
        setEnable(false)
      }

    }
  };

  const handleAdd = () => {
    let lValue = value
    if (lValue === "") {
      lValue = 0
    }
    setValue(parseFloat(lValue) + 1)
    props?.handleQuantityUpdate(lValue + 1, props?.item);
    setEnable(false)
  };

  const handleInput = (value) => {
    let num = value.replace(',', ".")
    if (props?.selectedUnit === "Kilo" && !isNaN(num)) {
      if (parseFloat(num) < 1) {
        setValue(1);
      } else {
        if ((num.includes('.') && num.split('.')[1].length <= 1)) {
          setValue(num);
        } else if (!num.includes('.')) {
          setValue(num);
        }
      }
    } else if (props?.selectedUnit !== "Kilo" && !isNaN(num) && !(num.toString().indexOf('.') != -1)) {
      if (parseFloat(num) < 1) {
        setValue(parseFloat(1));
      } else {
        !isNaN(num) &&
          setValue(num);
      }
    }
  };
  return (
    <View style={styles.quantityBox}>
      <Pressable style={styles.minus} onPress={() => handleMinus()}>
        <FastImage
          style={styles.quantityIcons}
          resizeMode="contain"
          source={MinusIcon} />
      </Pressable>
      <View style={styles.qtyLabel}>
        {/* <Text style={styles.qtyNum}>{props.count}</Text> */}
        <CustomTextInput style={styles.qtyNum}
          value={value}
          onChangeText={(e) => handleInput(e)}
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.add} onPress={() => handleAdd()}>
        <FastImage
          style={styles.quantityIcons}
          resizeMode="contain"
          source={PlusIcon} />
      </Pressable>
    </View>
  );
}
export const styles = StyleSheet.create({
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minus: {
    backgroundColor: '#E04D010D',
    marginRight: (8),
    borderRadius: (8),
    alignItems: 'center',
    justifyContent: 'center',
    height: (44),
    width: (44),
  },
  add: {
    backgroundColor: '#E04D0133',
    borderRadius: (8),
    alignItems: 'center',
    justifyContent: 'center',
    height: (44),
    width: (44),
  },
  quantityIcons: {
    width: (16),
    height: (16),
    flex: 1,
  },
  qtyLabel: {
    backgroundColor: '#E04D010D',
    borderWidth: 1,
    borderColor: '#E04D011A',
    height: (44),
    width: (44),
    borderRadius: (8),
    marginRight: (8),
  },
  qtyNum: {
    fontSize: (20),
    textAlign: 'center',
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    height: (44),
    paddingTop: 0,
    paddingBottom: 0,
  },
});