/* eslint-disable prettier/prettier */
import React from 'react';
import { Overlay, Icon } from 'react-native-elements';
import { View, Text } from 'react-native';
import CustomButton from './customButton';
import { styles } from './components.style';

export default function AlertDialogCart(props) {
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
                    size={22}
                    color="#000"
                    onPress={props.toggleOverlay}
                />
            </View>
            <Text style={styles.alertMessage}>{props.title}</Text>
        </Overlay>
    );
}
