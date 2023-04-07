/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Platform } from 'react-native';
import TAB_HOME from '../assets/images/tabhome.png';
import TAB_LIST from '../assets/images/listTab.png';
import TAB_CATEROGY from '../assets/images/tabcategory.png';
import TAB_SEARCH from '../assets/images/tabsearch.png';
import TAB_CART from '../assets/images/cartTab.png';
import { BuyingListNavigator } from './BuyingListNavigator';
import { HomeNavigator } from './HomeNavigator';
import { CartNavigator } from './CartNavigator';
import NetInfo from '@react-native-community/netinfo';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/action';
import { strings } from '../localization';
import GlobalStyle from '../style/globalstyle';
const Tab = createBottomTabNavigator();

function AppNavigator(props) {
  const [value, setValue] = useState(0);
  const [productCount, setProductCount] = useState(null);
  const authState = useSelector(state => state.rootReducers?.authState);
  const cartState = useSelector(state => state.rootReducers?.cartState);
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      props.actions.networkAction(state);
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };


  }, []);

  useEffect(() => {
    if (authState?.language) {
      setValue(value + 1);
    }

    if (authState?.language) {
      strings.setLanguage(authState?.language);
    } else {
      strings.setLanguage('de');
    }
  }, [authState?.language]);

  useEffect(() => {
    if (cartState?.cartList?.data?.data) {
      let cartData = cartState?.cartList?.data?.data?.cartDetails;
      let proCount = 0;
      for (const key in cartData) {
        proCount += cartData[key].length;

      }

      proCount = proCount + cartState?.cartList?.offlineCart.length
      setProductCount(proCount);
    }
  }, [cartState?.cartList]);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
          //height: Platform.OS === 'ios' ? (90) : (60),
          //paddingVertical: (5),
        },
        tabBarShowLabel: true,
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          var iconName;

          if (route.name === 'tab-home') {
            iconName = TAB_HOME;
            return (
              <Image
                style={{ width: (26), height: (26), tintColor: color, marginLeft: 'auto', marginRight: 'auto' }}
                source={iconName}
              />
            );
          } else if (route.name === 'tab-list') {
            iconName = TAB_LIST;
            return (
              <Image
                style={{ width: (26), height: (26), tintColor: color }}
                source={iconName}
              />
            );
          } else if (route.name === 'tab-category') {
            iconName = TAB_CATEROGY;
            return (
              <Image
                style={{ width: (26), height: (26), tintColor: color }}
                source={iconName}
              />
            );
          } else if (route.name === 'tab-search') {
            iconName = TAB_SEARCH;
            return (
              <Image
                style={{ width: (26), height: (26), tintColor: color }}
                source={iconName}
              />
            );
          } else if (route.name === 'tab-cart') {
            iconName = TAB_CART;
            return (
              <Image
                style={{ width: (26), height: (26), tintColor: color }}
                source={iconName}
              />
            );
          }
        },
        tabBarActiveTintColor: '#FA732E',
        tabBarInactiveTintColor: '#A0A3BD',
        tabBarLabelStyle: { fontFamily: GlobalStyle.fontSet.Poppins500, fontSize: (13) },
      })}>
      <Tab.Screen
        name="tab-home"
        component={HomeNavigator}
        options={{
          title: strings.navigator.home,
          tabBarItemStyle: {
            //flexDirection: 'column',
            //alignItem: 'flex-start',
            //justifyContent: 'space-around',
          },
        }}
      // listeners={({ navigation, route }) => ({
      //   tabPress: e => {
      //       props?.actions?.setStepAction(true)
      //   },
      // })}
      />

      <Tab.Screen
        name="tab-list"
        component={BuyingListNavigator}
        options={{
          title: strings.common.buyingList,
          tabBarItemStyle: {
            //flexDirection: 'column',
            //alignItem: 'flex-start',
            //justifyContent: 'space-around',
          },
        }}
      />

      <Tab.Screen
        name="tab-cart"
        component={CartNavigator}
        options={{
          title: strings.navigator.cart,
          tabBarBadge: !authState?.signIn?.data?.data?.tokenNumber ? null : productCount > 0 ? productCount : null,
          tabBarItemStyle: {
            //flexDirection: 'column',
            //alignItem: 'flex-start',
            //justifyContent: 'space-around',
          },
        }}

      />
    </Tab.Navigator>
  );
}

const Test = () => {
  return <View />;
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(AppNavigator);
