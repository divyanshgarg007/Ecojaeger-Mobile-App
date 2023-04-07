/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Hamburger, BackButton } from '../components';
import { ProductDetailView } from '../screens';
import { NAVIGATION } from '../constants';
import AddIcon from '../assets/images/add.png';
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import {
  BuyingProductListView,
  BuyingListView,
  CreateListView,
  BuyingAddProducts,
} from '../screens';
import { Text } from 'react-native';
import { styles } from './navigator.style';
import { strings } from '../localization';
import { Pressable } from 'react-native';

const Stack = createNativeStackNavigator();
export function BuyingListNavigator(props) {
  const authState = useSelector((state) => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.buyingList}
        component={BuyingListView}
        options={({ navigation }) => ({
          headerRight: () => {
            return <>
              {authState?.signIn?.data?.data?.tokenNumber ?
                <Pressable onPress={() => network?.isConnected ? navigation.navigate(NAVIGATION.addList) : alert(strings.common.offlineMessage)}>
                  <FastImage source={AddIcon} style={styles.addIcon} />
                </Pressable> : ''
              }
            </>;
          },
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.buyingList}</Text>;
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
      <Stack.Screen
        name={NAVIGATION.buyingProductList}
        component={BuyingProductListView}
      />

      <Stack.Screen
        name={NAVIGATION.addList}
        component={CreateListView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.createList.createList}</Text>;
          },
        })}
      />

      <Stack.Screen
        name={NAVIGATION.productListing}
        component={BuyingAddProducts}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.products}</Text>;
          },
        })}
      />
    </Stack.Navigator>
  );
}
