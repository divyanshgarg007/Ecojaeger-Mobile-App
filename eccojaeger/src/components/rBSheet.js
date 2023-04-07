/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from './components.style';
import { strings } from '../localization';
import normalize from 'react-native-normalize';

export default function RBSheetView(props) {
    const refRBSheet = useRef();
    const handleDropDown = (data) => {
        refRBSheet.current.close()
        props?.setUnitPrice(data)
    }
    return (
        <View>
            <Pressable
                disabled={props.disable}
                style={styles.unitBox}
                onPress={() => refRBSheet.current.open()}>
                <Text style={styles.unitSelected}>{props?.unitPriceName}</Text>
                <Icon
                    name="down"
                    type="antdesign"
                    size={(16)}
                    color="#222"
                />
            </Pressable>

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
                        color="#222"
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
                {props?.quantity?.map((data, index) => {
                    return (
                        <Pressable onPress={() => handleDropDown(data)} key={index}>
                            <Text style={styles.listItems}>{`${data?.name}`} {(data.default === data.factory && data.default === '1') ? null : `(${parseFloat(data?.unitPrices).toFixed(2)} ${props.defaultUnit})`} </Text>
                        </Pressable>
                    );
                })
                }
            </RBSheet>
        </View>
    );
}
