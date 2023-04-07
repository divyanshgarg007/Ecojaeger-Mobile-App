/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { CustomButton, CustomTextInput } from '../../components';
import {styles} from './myAccount.style';
import { strings } from '../../localization';

export default function MyAccountView() {
    const [inputValue, setInputValue] = useState('');
  return (
    <ScrollView style={styles.contactContainer} contentContainerStyle={{   flex: 1, alignItems: 'center',
    justifyContent: 'center',}}>
      <Text style={styles.contactBox}>{strings.common.noData}</Text>
      {/* <View style={styles.contactInputBox}>
        <CustomTextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={value => setInputValue({ ...inputValue, name: value })}
          placeholder="Name *"
        />
      </View>
      <View style={styles.contactInputBox}>
        <CustomTextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={value => setInputValue({ ...inputValue, name: value })}
          placeholder="Company Name *"
        />
      </View>
      <View style={styles.contactInputBox}>
      <CustomTextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={value => setInputValue({ ...inputValue, email: value })}
          placeholder="Email *"
        />
      </View>
      <View style={[styles.contactInputBox, styles.fieldSpace]}>
      <CustomTextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => setInputValue({ ...inputValue, phone: value })}
          placeholder="Phone Number *"
        />
      </View>
      <CustomButton
        buttonStyle={styles.contactBtn}
        titleStyle={styles.actionTitle}
        title="Update"
      /> */}
    </ScrollView>
  );
}
