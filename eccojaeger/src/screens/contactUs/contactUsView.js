/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { CustomButton, CustomTextArea, CustomTextInput } from '../../components';
import { ContactInfo } from './components';
import { useSelector } from 'react-redux';
import {styles} from './contactUs.style';
import { strings } from '../../localization';

export default function ContactUsView() {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(0);
  const authState = useSelector(state => state.rootReducers?.authState);
  useEffect(() => {
    if (authState?.language) {
      setValue(value + 1);
    }
  }, [authState?.language]);

  return (
    <ScrollView style={styles.contactContainer} >
      {/* <Text style={styles.contactBox}>{strings.common.noData}</Text>
      <View style={styles.contactInputBox}>
        <CustomTextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={value => setInputValue({ ...inputValue, name: value })}
          placeholder="Username or Email Address *"
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
      <View style={styles.contactInputBox}>
      <CustomTextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => setInputValue({ ...inputValue, phone: value })}
          placeholder="Phone Number *"
        />
      </View>
      <View style={styles.fieldSpace}>
      <CustomTextArea
          style={styles.commentInput}
          keyboardType="numeric"
          onChangeText={value => setInputValue({ ...inputValue, message: value })}
          placeholder="Message *"
          numberOfLines={4}
        />
      </View>
      <CustomButton
        buttonStyle={styles.contactBtn}
        titleStyle={styles.actionTitle}
        title="Submit"
      /> */}
      <ContactInfo />
    </ScrollView>
  );
}
