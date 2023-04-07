/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable, Alert, Linking, TouchableOpacity } from 'react-native';
import { View, ScrollView } from 'react-native';
import NavigationBar from './components/navigationBar';
import { MenuItem } from './components';
import { Icon } from 'react-native-elements';
import { NAVIGATION } from '../../constants';
import SelectUserView from '../selectUser/selectUserView';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { styles } from './menu.style';
import { getToken, setToken } from '../../utilities/utils';
import { strings } from '../../localization';
import { API_CONSTANTS } from '../../constants/constants';
import moment from 'moment';
import { deleteItems, saveProductItems } from '../../services/db-service';

function MenuView(props) {

  const initialState = [{
    id: '3',
    name: strings.menu.contactUs,
  },
  {
    id: '4',
    name: strings.menu.faqs,
  },
  {
    id: '5',
    name: strings.menu.helpSupport,
  },
  {
    id: '6',
    name: strings.menu.impressum,
  },]
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
    props.navigation.closeDrawer()
  };
  const authState = useSelector(state => state.rootReducers?.authState);
  const buyingState = useSelector(state => state.rootReducers?.buyingState);
  const cartState = useSelector(state => state.rootReducers?.cartState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const productState = useSelector(state => state.rootReducers?.productState);

  useEffect(() => {
    if (authState?.signIn?.data?.data?.tokenNumber) {
      menu.unshift({
        id: '1',
        name: strings.menu.orderHistory,
      }, {
        id: '2',
        name: strings.menu.myAccount,
      });
    }
  }, [authState?.signIn?.data?.data?.tokenNumber])

  const handleMenu = title => {
    if (title === strings.menu.orderHistory) {
      // TODO: Go to separate Order list screen
      props.navigation.navigate(NAVIGATION.myOrder);
    }

    else if (title === strings.menu.contactUs) {
      props.navigation.navigate(NAVIGATION.contact);
    }
    else if (title === strings.menu.impressum) {
      Linking.openURL(`${API_CONSTANTS.BASE_URL}${authState?.language}/impressum`)
    } else {
      props.navigation.navigate('AppNavigator');
    }
  };

  const [accountId, setAccountId] = useState();

  const [language, setLanguages] = useState(
    authState?.language === 'de' ? 'German' : 'English',
  );

  useEffect(() => {
    var lang = authState?.language === 'de' ? 'German' : 'English'
    setLanguages(lang)

    onSetMenu()
  }, [authState?.language])

  const handleLanguage = (lang) => {
    strings.setLanguage(lang === 'German' ? 'de' : 'en');
    props.actions.setUserLanguage(lang === 'German' ? 'de' : 'en');

    onSetMenu()
  };

  const onSetMenu = () => {
    let menuData = [{
      id: '3',
      name: strings.menu.contactUs,
    },
    {
      id: '6',
      name: strings.menu.impressum,
    }]
    if (authState?.signIn?.data?.data?.tokenNumber) {
      menuData.unshift({
        id: '1',
        name: strings.menu.orderHistory,
      },
      );
    }
    setMenu(menuData);
  }

  const getAnswer = async () => {
    let selectedAccount;
    await getToken('buyerId').then(data => { selectedAccount = data; });
    if (selectedAccount) {
      setAccountId(parseInt(selectedAccount));
      props.actions.setAccountId(parseInt(selectedAccount));
    }
    else {
      setAccountId(parseInt(authState?.buyingList?.data?.data[0]?.id))
      props.actions.setAccountId(authState?.buyingList?.data?.data[0]?.id);
    }
  };

  useEffect(() => {
    getAnswer();
  }, []);

  useEffect(() => {
    getAnswer()
  }, [authState?.buyingList?.data]);

  let selectedData = authState?.buyingList?.data?.data?.filter((data) => data.id === accountId)[0]?.name

  const handleLogout = () => {

    setToken('buyerId', '');
    setToken('token', '');
    // props.actions.cleanUpBuyingList();
    // props.actions.cleanUpCartList();
    props.actions.logoutAction();

    setMenu([{
      id: '3',
      name: strings.menu.contactUs,
    },
    {
      id: '6',
      name: strings.menu.impressum,
    }])
  };

  const onSignOut = () => {
    Alert.alert(
      strings.common.logoutMessage,
      "",
      [
        {
          text: strings.actions.no,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: strings.actions.yes, onPress: () => handleLogout() }
      ]
    );
  }

  const onForceSync = () => {
    if (network?.isConnected && productState?.syncedTime) {
      props.navigation.closeDrawer()
      props.actions.forceSyncProduct({})

      // props?.actions?.syncAction(Math.floor(new Date(productState?.syncedTime[authState.accountID]).getTime() / 1000), (data) => {
      //   if (data?.status === true) {
      //     props.actions.resetProductListPaginationInfo()
      //   } else {
      //     alert("Daten sind aktualisiert")
      //   }
      // }, (error) => {

      // });

      /*
      let obj = {
        producers: [],
        Brand: [],
        limit: 500,
        page: 1,
        category: '',
        Origin: [],
        vegan: 0,
        veggie: 0,
        Glutenfree: 0,
        Laktosefrei: 0,
        newProduct: 0,
        TK: 0,
        sort: {
          id: 'default',
          name: strings.common.alphabet
        },
        promotional: 0,
        time: Math.floor(new Date(productState?.syncedTime[authState.accountID]).getTime() / 1000)
      };

      props?.actions?.deltaSyncDataAction(obj, (data) => {
        if (data?.products) {
          if (data?.productsIds) {
            deleteItems(db, data.productsIds.toString())
            //console.log("syncShopData item deleted")
          }
          if (data.products.length > 0) {
            saveProductItems(db, data.products, (resp) => {
              //console.log("syncShopData saved")
              if (data?.paginationVariables) {
                if (data.paginationVariables.current < data.paginationVariables.last) {
                  onForceSync()
                }
                if (data.paginationVariables.current === data.paginationVariables.last) {
                  //console.log("syncShopData completed")
                  props.actions.saveProductListSyncedTime({ [authState?.accountID]: moment().toDate() })
                }
              }
            }, (err) => {
            });
          }
        } else {
          alert("Daten sind aktualisiert")
        }
      }, (error) => {
        //console.log("error")
      });

    } else {
      alert(strings.common.offlineMessage)
    }*/
    }
  }

  const getSyncTime = () => {
    if (productState?.syncedTime) {
      let dt = new Date(productState?.syncedTime[authState.accountID]).getTime()
      var local = moment(dt).local().format('DD.MM.YYYY HH:mm:ss');
      //console.log(dt)
      return local
    } else {
      return ""
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.menuContainer}>
        <NavigationBar onClose={() => props.navigation.closeDrawer()} />
        <View style={authState?.signIn?.data?.data?.tokenNumber ? styles.userInfo : styles.loginInfo}>
          {authState?.signIn?.data?.data?.tokenNumber ?
            <>
              <Icon
                size={(25)}
                // color={'#fff'}
                name="user"
                type="antdesign"
                iconStyle={styles.userIcon}
              />
              <Text style={styles.userName}>{authState?.signIn?.data?.data?.userName}</Text>
            </>
            : <Pressable onPress={() => props.navigation.navigate(NAVIGATION.login)} style={styles.loginBox}>
              <Text style={styles.signInBtn}>{strings.common.login}</Text>
            </Pressable>
          }
        </View>
        {/* <Language language={language} onPress={(lang) => handleLanguage(lang)} /> */}
        {authState?.signIn?.data?.data?.tokenNumber ?
          <SelectUserView toggleOverlay={toggleOverlay} visible={visible} data={authState?.buyingList?.data}
            selectedData={selectedData} /> : ''
        }
        <View>
          {menu.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              handleMenu={name => handleMenu(name)}
            />
          ))}
        </View>
        {authState?.signIn?.data?.data?.tokenNumber &&
          <>
            <Pressable onPress={() => onSignOut()}>
              <Text style={styles.signOut}>{strings.menu.signOut}</Text>
            </Pressable>
            <TouchableOpacity style={{ borderRadius: 30, margin: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E04D01', borderTopColor: '#ddd', borderTopWidth: 1 }} onPress={() => onForceSync()}>
              <Text style={[styles.signOut, { fontWeight: 'bold', color: 'white' }]}>{strings.menu.sync}</Text>
            </TouchableOpacity>
          </>
        }
        <Text style={{ marginTop: 10, color: '#000', textAlign: 'center', }}>{getSyncTime()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(MenuView);
