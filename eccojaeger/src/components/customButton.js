import React from 'react';
import { Button } from 'react-native-elements';

export default function CustomButton(props) {
  return (
    <Button
      loading={props?.loading}
      buttonStyle={props.buttonStyle}
      titleStyle={props.titleStyle}
      title={props.title}
      onPress={props.onPress}
    />
  );
}
