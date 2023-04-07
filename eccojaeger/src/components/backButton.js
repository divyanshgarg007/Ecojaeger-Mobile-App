import React from 'react';

import { Image } from 'react-native-elements';
import closeIcon from '../assets/images/backnew.png';

const BackButton = props => {
    const onClick = () => {
        props.onClick();
    };
    return (
        <Image
            source={closeIcon}
            style={props.style}
            onPress={() => onClick()}
        />
    );
};

export default BackButton;
