/* eslint-disable prettier/prettier */
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './components.style';

export default function SelectDropDown(props) {
  return (
    <View style={styles.quantityInputBox}>
      <SelectDropdown
        disabled={props?.disable}
        data={props?.quantity}
        renderDropdownIcon={() => (
          <Icon size={20} name="chevron-down" type="entypo" color="#000" />
        )}
        buttonTextStyle={styles.cartselectItem}
        buttonStyle={styles.cartselectBtn}
        rowTextStyle={styles.cartdropDownBoxItem}
        rowStyle={styles.cartdropDownBox}
        defaultButtonText={props?.unitPriceName}
        onSelect={(selectedItem, index) => {
          props?.setUnitPrice(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `${selectedItem?.name} (${selectedItem?.unitPrices} ${props.defaultUnit})`;
        }}
        rowTextForSelection={(item, index) => {
          return `${item?.name} (${parseFloat(item?.unitPrices).toFixed(2)} ${props.defaultUnit})`;
        }}
      />
    </View>
  );
}
