/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContactUsView, FaqsView, ImpressumView, MenuView, MyAccountView, SupportView } from '../screens';
import { HeaderActions, BackButton } from '../components';
import { NAVIGATION } from '../constants';
import { Text, View } from 'react-native';
import BackIcon from '../assets/images/back.png';
import AppNavigator from './AppNavigator';
import { styles } from './navigator.style';
import { strings } from '../localization';
import { OrderNavigator } from './OrderNavigator';


const Drawer = createDrawerNavigator();

export function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="AppNavigator"
      drawerContent={props => <MenuView {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        drawerPosition: 'left',
        title: '',
        drawerStyle: { width: '70%' },
        headerShadowVisible: false,
      })}>
      <Drawer.Screen name="AppNavigator" component={AppNavigator} />
      <Drawer.Screen
        name={NAVIGATION.myOrder}
        component={OrderNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,

        })}
      />
      <Drawer.Screen
        name={NAVIGATION.contact}
        component={ContactUsView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          // headerStyle: {height: Platform.OS === 'ios' ? normalize(84) : normalize(54)},
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.menu.contactUs}</Text>;
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.faqs}
        component={FaqsView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={{ marginLeft: (15) }}>
                <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
              </View>
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.menu.faqs}</Text>;
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.myAccount}
        component={MyAccountView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={{ marginLeft: (15) }}>
                <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
              </View>
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.menu.myAccount}</Text>;
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.support}
        component={SupportView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={{ marginLeft: (15) }}>
                <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
              </View>
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.menu.helpSupport}</Text>;
          },
        })}
      />
      <Drawer.Screen
        name={NAVIGATION.impressum}
        component={ImpressumView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return (
              <View style={{ marginLeft: (15) }}>
                <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
              </View>
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.menu.impressum}</Text>;
          },
        })}
      />
    </Drawer.Navigator>
  );
}
