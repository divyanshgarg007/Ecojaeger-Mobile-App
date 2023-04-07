/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../constants';
import { BackButton } from '../components';
import { Text } from 'react-native';
import { MyOrdersView, OrderDetailsView } from '../screens';
import { styles } from './navigator.style';
import { strings } from '../localization';

const Stack = createNativeStackNavigator();
export function OrderNavigator(props) {

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
       name={NAVIGATION.orderHistory}
       component={MyOrdersView}
       options={({ navigation }) => ({
         headerShown: true,
         headerTitleAlign: 'center',
         headerBackVisible: false,
         headerLeft: props => {
           return (
            <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
           );
         },
       })}
      />
      <Stack.Screen
       name={NAVIGATION.orderDetails}
       component={OrderDetailsView}
       options={({ navigation }) => ({
         headerShown: true,
         headerTitleAlign: 'center',
         headerBackVisible: false,
         headerLeft: props => {
           return (
            <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
           );
         },
         headerTitle: props => {
           return <Text style={styles.navigatorText}>{strings.menu.orderDetails}</Text>;
         },
       })}
      />

    </Stack.Navigator>
  );
}
