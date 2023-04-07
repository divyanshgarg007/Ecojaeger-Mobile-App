/* eslint-disable prettier/prettier */
import React, { memo, useRef } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image'
import DropIcon from '../assets/images/drop.png';
import GlobalStyle from '../style/globalstyle';
import { strings } from '../localization';
import RBSheet from "react-native-raw-bottom-sheet";
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

function CustomUnitPrice(props) {
    const network = useSelector(state => state.rootReducers?.productState.network);
    const refRBSheet = useRef();
    const showAlert = () => {
        return Alert.alert(
            "Alert",
            strings.common.offlineMessage,
            [
                {
                    text: 'OK',
                },
            ],
        );
    };
    const handleDropDown = (data) => {
        refRBSheet.current.close()
        if (props?.isBuying && props?.isBuying !== undefined && network?.isConnected) {
            props?.handleUpdateQuantity(props?.item, data, props?.unitPrice)
            props?.setUnitPrice(data)
        } else if (props?.isBuying && props?.isBuying !== undefined && !network?.isConnected) {
            showAlert()
        } else {
            props?.setUnitPrice(data)
        }

    }

    /**
     * 
     * @returns 
     * Case1: Show info for unit price and factory price.
     * Case2: Show packagingInfo for item whose default and factory values is "1"
     * 14/12/2002: As dicussed with Norbert show packaging info when there is one item in 'productUnit'

     */
    const getUnitInfo = () => {
        if (props?.quantity && props.quantity.length === 1) {
            return ` (${props.item.packagingInfo})`
        } else {
            if (!props?.cart && !(props?.unitPrice?.default === props?.unitPrice?.factory && props?.unitPrice?.default === '1')) {
                return (`(${parseFloat(props?.unitPrice?.unitPrices).toFixed(2)}  ${props?.item?.factoryUnitName})`)
            }
        }

        // if (!props?.cart && !(props?.unitPrice?.default === props?.unitPrice?.factory && props?.unitPrice?.default === '1')) {
        //     return (`(${parseFloat(props?.unitPrice?.unitPrices).toFixed(2)}  ${props?.item?.factoryUnitName})`)
        // } else {
        //     if (props?.quantity && props.quantity.length === 1) {
        //         let unitItem = props.quantity[0]
        //         if (unitItem.default === "1" && unitItem.factory === "1") {
        //             return ` (${props.item.packagingInfo})`
        //         }
        //         //return ` (${props.item.packagingInfo})`
        //     }
        // }
    }

    return (
        <>
            <View style={styles.unitContainer}>
                <View style={styles.unitPrices}>
                    <Text style={styles.unitName}>{!props?.cart ? props?.unitPrice?.unitCode : props?.unitPriceName}
                        {/* {!props?.cart && !(props?.unitPrice?.default === props?.unitPrice?.factory && props?.unitPrice?.default === '1') &&
                            <Text>
                                ({parseFloat(props?.unitPrice?.unitPrices).toFixed(2)}{' '}{props?.item?.factoryUnitName})
                            </Text>
                        } */}
                        <Text>
                            {getUnitInfo()}
                        </Text>
                    </Text>
                    <Text style={styles.unitPrice}>{props?.unit}</Text>
                </View>
                <Pressable
                    disabled={props.disable}
                    style={styles.unitBox}
                    onPress={() => {
                        if (props.quantity.length > 1) {
                            refRBSheet.current.open()
                        }
                    }}>
                    <View style={styles.unitAction}>
                        <FastImage
                            style={styles.quantityIcons}
                            resizeMode="contain"
                            source={DropIcon} />
                    </View>
                </Pressable>
            </View>
            <RBSheet
                ref={refRBSheet}
                height={(250)}
                openDuration={200}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        paddingHorizontal: (30),
                        paddingTop: (20),
                    },
                }}
            >
                <Text style={styles.listName}>{strings.common.selectUnit}</Text>
                <View style={styles.closeToggleSheet}>
                    <Icon
                        name="close"
                        type="antdesign"
                        size={(22)}
                        color="#000"
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
                {props?.quantity?.map((data, index) => {
                    return (
                        <Pressable onPress={() => handleDropDown(data)} key={index}>
                            <Text style={styles.listItems}>{`${data?.name}`} {(data.default === data.factory && data.default === '1') ? props?.quantity?.length === 1 ? `(${props?.item?.packagingInfo})` : null : `(${parseFloat(data?.unitPrices).toFixed(2)} ${props.defaultUnit})`} </Text>
                        </Pressable>
                    );
                })
                }
            </RBSheet>
        </>
    );
}
export const styles = StyleSheet.create({
    unitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitPrices: {
        backgroundColor: '#E04D010D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: (8),
        width: '80%',
        borderTopLeftRadius: (8),
        borderBottomLeftRadius: (8),
        height: (44),
    },
    unitAction: {
        backgroundColor: '#E04D011A',
        paddingHorizontal: (8),
        borderTopRightRadius: (8),
        borderBottomRightRadius: (8),
        height: (44),
    },
    quantityIcons: {
        width: (16),
        height: (16),
        flex: 1,
    },
    unitName: {
        color: '#222222',
        fontSize: (13),
        fontFamily: GlobalStyle.fontSet.Poppins400,
    },
    unitPrice: {
        color: '#222222',
        fontSize: (13),
        fontFamily: GlobalStyle.fontSet.Poppins600,
    },
    listName: {
        color: '#222222',
        fontFamily: GlobalStyle.fontSet.Poppins500,
        fontSize: (18),
        textAlign: 'center',
        marginBottom: (10),
    },
    closeToggleSheet: {
        position: 'absolute',
        right: (15),
        zIndex: 111,
        top: (23),
    },
    listItems: {
        color: '#222222',
        fontFamily: GlobalStyle.fontSet.Poppins400,
        paddingTop: (9),
        paddingBottom: (7),
        fontSize: (16),
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});

//export default memo(CustomUnitPrice)
export default CustomUnitPrice