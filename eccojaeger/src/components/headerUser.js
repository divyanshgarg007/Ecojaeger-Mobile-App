/* eslint-disable prettier/prettier */
import React from 'react';

import { Image, Icon } from 'react-native-elements';
import userIcon from '../assets/images/user.png';

const HeaderUser = props => {
  return (
    <Icon
      size={26}
      name="user"
      type="antdesign"
      onPress={() => props.onPress()}
    />
  );
};

export default HeaderUser;
