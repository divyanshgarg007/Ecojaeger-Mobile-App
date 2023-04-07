/* eslint-disable prettier/prettier */
import React from 'react';
import { Overlay, Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import CustomButton from './customButton';
import { styles } from './components.style';
import normalize from 'react-native-normalize';

export default function AlertDialog(props) {
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.toggleOverlay}
      backdropStyle={styles.backdropContainer}
      overlayStyle={styles.innerOverlay}>
      <View style={styles.closeToggle}>
        <Icon
          name="close"
          type="antdesign"
          size={(22)}
          color="#222222"
          onPress={props.toggleOverlay}
        />
      </View>
      <Text style={styles.alertMessage}>{props.title}</Text>
      <View style={styles.alertActions}>
        <View style={styles.btnLeft}>
          <CustomButton
            title={props.cancel}
            buttonStyle={styles.btnLight}
            titleStyle={styles.titleDark}
            onPress={props.toggleOverlay}
          />
        </View>
        <View style={styles.btnRight}>
          <CustomButton
            title={props.delete}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.titleLight}
            onPress={() => props?.deleteMethod()}
          />
        </View>
      </View>
    </Overlay>
  );
}
