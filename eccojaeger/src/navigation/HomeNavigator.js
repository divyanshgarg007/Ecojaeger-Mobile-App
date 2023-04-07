/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from '../constants';
import { Platform, Text } from 'react-native';
import { HeaderLogo, Hamburger, BackButton } from '../components';
import { HomeView, HomeNewView, LoginView, ProductFilterView, ProductDetailView, ProductListingView, SearchProductListView, ProductListingFilterView, homeNewChildView } from '../screens';
import { styles } from './navigator.style';
import { strings } from '../localization';

const Stack = createNativeStackNavigator();

export function HomeNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTransparent: Platform.OS === 'ios' ? true : false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={NAVIGATION.homeNew}
        component={HomeNewView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => <HeaderLogo {...props} />,
        })}
      />

      <Stack.Screen
        name={NAVIGATION.homeNewChild}
        component={homeNewChildView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => <HeaderLogo {...props} />,
        })}
      />

      <Stack.Screen
        name={NAVIGATION.homeFilter}
        component={HomeView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />;
          },
          headerTitle: props => <HeaderLogo {...props} />,
        })}
      />

      <Stack.Screen
        name={NAVIGATION.productLists}
        component={ProductListingView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return <Hamburger onClick={() => navigation.openDrawer()} />;
          },
          headerTitle: props => <HeaderLogo {...props} />,
        })}
      />
      <Stack.Screen
        name={NAVIGATION.filter}
        component={ProductFilterView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>{strings.common.filter}</Text>;
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
        name={NAVIGATION.login}
        component={LoginView}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => <HeaderLogo {...props} />,
        })}
      />

      <Stack.Screen
        name={NAVIGATION.searchlist}
        component={SearchProductListView}
        options={({ navigation }) => ({
          headerLeft: props => {
            return (
              <BackButton onClick={() => navigation.goBack()} style={styles.backIcon} />
            );
          },
          headerTitle: props => {
            return <Text style={styles.navigatorText}>Search Product</Text>;
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.productfilter}
        component={ProductListingFilterView}
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
