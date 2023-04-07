/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackButton, Hamburger, HeaderActions } from '../components';
import { NAVIGATION } from '../constants';
import { CartView } from '../screens';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { styles } from './navigator.style';
import { strings } from '../localization';
import { ProductDetailView } from '../screens';
import BackIcon from '../assets/images/back.png';

const Stack = createNativeStackNavigator();
export function CartNavigator(props) {

  const [value, setValue] = useState(0);
  const authState = useSelector(state => state.rootReducers?.authState);

  useEffect(() => {
    if (authState?.language) {
      setValue(value + 1);
    }
  }, [authState?.language]);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.cart}
        component={CartView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.cart}</Text>;
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.productDetail}
        component={ProductDetailView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.productDetail}</Text>;
          },
        })}
      />
    </Stack.Navigator>
  );
}
