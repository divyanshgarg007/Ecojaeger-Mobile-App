import React from 'react';

import {Image} from 'react-native-elements';
import closeIcon from '../assets/images/close.png';

const CloseButton = props => {
  const onClick = () => {
    props.onClick();
  };
  return (
    <Image
      source={closeIcon}
      style={{width: 19, height: 19, marginLeft: 10}}
      onPress={() => onClick()}
    />
  );
};

export default CloseButton;
