/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'
import MinusIcon from '../assets/images/minus.png';
import PlusIcon from '../assets/images/add.png';
import CustomTextInput from './customTextInput';
import GlobalStyle from '../style/globalstyle';

function CustomQuantityInput(props) {
    const handleMinus = () => {
        let val = parseFloat(props.count)
        if (props.count === "") {
            val = props?.minValue
        }
        if (val > props?.minValue) {
            if (val % props?.minValue !== 0 && (val < (props?.minValue + 1))) {
                props?.setCount(parseFloat(props?.minValue));
            } else {
                let minusNumber = (props?.count - 1).toFixed(1)
                props?.setCount(parseFloat(minusNumber));
            }
        } else {
            props?.setCount(parseFloat(props?.minValue));
        }
    }

    const handleAdd = () => {
        let val = parseFloat(props.count)
        if (props.count === "") {
            val = props?.minValue
            props?.setCount(parseFloat(val));
        } else {
            props?.setCount(parseFloat(val) + 1);
        }

    };

    const handleInput = (value) => {
        let num = value.replace(',', ".")
        if (props?.unitPrice?.unitCode === "KG" && !isNaN(num)) {
            if (parseFloat(num) < props?.minValue) {
                props?.setCount(parseFloat(props?.minValue));
            } else {
                if ((num.includes('.') && num.split('.')[1].length <= 1)) {
                    props?.setCount(num);
                } else if (!num.includes('.')) {
                    props?.setCount(num);
                }
            }
        } else if (props?.unitPrice?.unitCode !== "KG" && !isNaN(num) && !(num.toString().indexOf('.') != -1)) {
            if (parseFloat(num) < props?.minValue) {
                props?.setCount(parseFloat(props?.minValue));
            } else {
                props?.setCount(num);
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
                <CustomTextInput style={styles.qtyNum}
                    value={props.count}
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
        borderRadius: (8),
        marginRight: (8),
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

//export default memo(CustomQuantityInput)
export default CustomQuantityInput