/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import { CustomButton, CustomTextArea } from '../../../components';
import GlobalStyle from '../../../style/globalstyle';
import { strings } from '../../../localization';

export default function AddComment(props) {
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
          color="#000"
          onPress={props.toggleOverlay}
        />
      </View>
      <View>
        <CustomTextArea
          placeholder={strings.common.addComment}
          value={props?.valueComment}
          onChangeText={text => props.setValueComment(text)}
          style={styles.commentInput}
          numberOfLines={4}
        />
      </View>
      <CustomButton
        title={strings.common.addComment}
        buttonStyle={[styles.btnGreen, styles.spaceButton]}
        titleStyle={styles.titleLight}
        onPress={() => props.handleAddComment(props?.valueComment)}
      />
    </Overlay>
  );
}
export const styles = StyleSheet.create({
  backdropContainer: {
    backgroundColor: '#43464B',
    opacity: 0.65,
  },
  innerOverlay: {
    backgroundColor: '#fff',
    width: '93%',
    paddingHorizontal: (20),
  },
  closeToggle: {
    position: 'absolute',
    right: (10),
    zIndex: 111,
    top: (6),
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: (10),
    textAlignVertical: 'top',
    fontSize: (14),
    color: '#000000',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginTop: (30),
    marginBottom: (10),
  },
  spaceButton: {
    marginTop: (12),
    marginBottom: (10),
  },
  btnGreen: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    marginTop: (20),
    marginBottom: (15),
    borderRadius: (8),
  },
  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
});
