/* eslint-disable prettier/prettier */
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './components.style';

export default function SortDropDown(props) {
    let finalData = props?.data?.filter((data) => data?.id === props?.value?.id)[0]?.name
    return (
        <View style={styles.quantityInputBox}>
            <SelectDropdown
                data={props?.data}
                renderDropdownIcon={() => (
                    <Icon size={20} name="chevron-down" type="entypo" color="#000" />
                )}
                buttonTextStyle={styles.cartselectItem}
                buttonStyle={styles.cartselectBtn}
                rowTextStyle={styles.cartdropDownBoxItem}
                rowStyle={styles.cartdropDownBox}
                defaultButtonText={finalData}
                onSelect={(selectedItem, index) => {
                    props?.setSort(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem?.name;
                }}
                rowTextForSelection={(item, index) => {
                    return item?.name;
                }}
            />
        </View>
    );
}
