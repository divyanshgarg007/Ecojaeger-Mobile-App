/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './components.style';

export default function Language(props) {
  const data = ['German']
  return (
    <View>
      <SelectDropdown
        data={data}
        renderDropdownIcon={() => (
          <Icon size={20} name="chevron-down" type="entypo" />
        )}
        buttonTextStyle={styles.userselectItem}
        buttonStyle={styles.userselectBtn}
        rowTextStyle={styles.userdropDownBoxItem}
        rowStyle={styles.userdropDownBox}
        defaultButtonText={props.language}
        onSelect={(selectedItem, index) => {
          //props.onPress(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
}
