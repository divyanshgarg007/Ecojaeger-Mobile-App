/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Hamburger, HeaderActions } from '../components';
import BackIcon from '../assets/images/back.png';
import { NAVIGATION } from '../constants';
import {
  CategoriesProductListView,
  CategoriesView,
  CategoryFilterView,
  ProductDetailView,
} from '../screens';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './navigator.style';
import { strings } from '../localization';

const Stack = createNativeStackNavigator();
export function CategoryNavigator(props) {

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
        name={NAVIGATION.categoryList}
        component={CategoriesView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.categories}</Text>;
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.productDetail}
        component={ProductDetailView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.productDetail}</Text>;
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.categoriesProductList}
        component={CategoriesProductListView}
      />
      <Stack.Screen
        name={NAVIGATION.categoryFilter}
        component={CategoryFilterView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <HeaderActions onPress={() => navigation.goBack()} icon={BackIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.filter}</Text>;
          },
        })}
      />
    </Stack.Navigator>
  );
}
