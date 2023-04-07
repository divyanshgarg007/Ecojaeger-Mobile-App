/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function Toasts(props) {
  const showToast = () => {
    Toast.show({
      type: props.type,
      text1: props.message,
      text1Style: { fontSize: 50 },
      position: 'top',
      onHide: () => props?.handleHide(),
    });
  };

  return <View>{props.show && showToast()}</View>;
}

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
};