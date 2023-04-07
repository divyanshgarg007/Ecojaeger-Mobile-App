import React from 'react';
import {View, TextInput} from 'react-native';

export default function CustomTextArea(props) {
  return (
    <View>
      <TextInput
        style={props.style}
        placeholder={props.placeholder}
        placeholderTextColor="#000000"
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
        numberOfLines={props.numberOfLines}
      />
    </View>
  );
}
