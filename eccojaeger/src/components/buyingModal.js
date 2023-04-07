/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { CustomButton, CustomTextInput } from '../components';
import { strings } from '../localization';
import { styles } from './components.style';

export default function BuyingModal(props) {

  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.toggleOverlay}
      backdropStyle={styles.backdropContainerBuying}
      overlayStyle={styles.innerOverlayBuying}>
      <View style={styles.closeToggleBuying}>
        <Icon
          name="close"
          type="antdesign"
          size={(22)}
          color="#222222"
          onPress={props.toggleOverlay}
        />
      </View>
      <Text style={styles.listLabel}>
        {props.action === 'rename' ? strings.common.rename : props.action === 'add' ? strings.actions.addList : strings.common.copy}{' '}{props?.title}</Text>
      <View style={styles.createInputBox}>
        <CustomTextInput
          style={styles.input}
          keyboardType="default"
          placeholder={strings.createList.enterListName}
          onChangeText={props?.setValue}
          value={props?.value}
          placeholderTextColor="#222222"
        />
      </View>
      <View style={styles.alertActions}>
        <View style={styles.btnLeft}>
          <CustomButton
            title={strings.common.cancel}
            buttonStyle={styles.btnLight}
            titleStyle={styles.titleDark}
            onPress={props.toggleOverlay}
          />
        </View>
        <View style={styles.btnRight}>
          <CustomButton
            title={strings.common.save}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.titleLight}
            onPress={() => props.handleAction(props.action)}
          />
        </View>
      </View>
    </Overlay>
  );
}
