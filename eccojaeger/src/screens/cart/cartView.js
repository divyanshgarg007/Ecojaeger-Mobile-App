/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Pressable, ActivityIndicator, PermissionsAndroid, Linking, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartItem } from './components';
import { Header, Footer } from './components';
import { NAVIGATION } from '../../constants';
import { styles } from './cart.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { CustomButton, EmptyMessage, NoInternet } from '../../components';
import { strings } from '../../localization';
import ThankYou from './components/thankYou';
import { Toasts } from '../../components';
import { KeyboardAwareFlatList, KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'


var productCount = 0
var updadingOfflineCart = false

const CartView = (props) => {
  const cartState = useSelector(state => state.rootReducers?.cartState);
  const authState = useSelector(state => state.rootReducers?.authState);
  const [cartData, setCartData] = useState([]);
  const [value, setValue] = useState(0);
  const [orderSeparation, setOrderSeparation] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState(null)
  const [alertToast, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const network = useSelector(state => state.rootReducers?.productState.network);
  const [networkStatus, setNetworkStatus] = useState({});

  const [offlineUpdateCount, setOfflineUpdateCount] = useState(1)
  const [addCommentArray, setAddCommentArray] = useState([])

  useEffect(() => {
    setNetworkStatus(network)
    addOfflineItemToCart(network)
  }, [network])

  useEffect(() => {
    if (cartState?.cartList?.data || cartState?.cartList?.offlineCart) {
      let data = []
      let proCount = 0
      if (cartState?.cartList?.data?.data) {
        let lCartData = cartData
        let cartDataa = cartState?.cartList?.data?.data?.cartDetails

        for (const key in cartDataa) {
          let price = 0
          productCount = (proCount += cartDataa[key].length)
          cartDataa[key]?.map((data) => {
            return price = price + data?.totalPriceNumeric
          })



          let obj = {
            date: key,
            data: cartDataa[key],
            price: price,
            [`comment-${key}`]: '',
          }

          let lObj = lCartData.find((item) => item.date === key)
          if (lObj && lObj?.deliveryDate) {
            obj["deliveryDate"] = lObj.deliveryDate
            obj[`deliveryDate_${key}`] = lObj[`deliveryDate_${key}`]
          }
          data.push(obj)
        }
      }

      if (cartState?.cartList?.offlineCart && cartState?.cartList?.offlineCart.length > 0) {
        let obj = {
          date: "offline",
          data: cartState?.cartList?.offlineCart,
          price: 0,
        }

        productCount = proCount + cartState?.cartList?.offlineCart.length
        data.push(obj)
      }
      setLoading(false)
      setCartData(data)
    }

    addOfflineItemToCart(networkStatus)
  }, [cartState?.cartList]);

  //// to change the price on lang change so call handleseparation method to listen action.
  useEffect(() => {
    if (authState?.language) {
      setValue(value + 1);
      handleSeparation();
    }
  }, [authState?.language]);

  useEffect(() => {
    if (authState?.accountID) {
      handleSeparation();
    }
  }, [authState?.accountID]);

  useEffect(() => {
    handleSeparation();
  }, [orderSeparation])

  const toggleThankYou = () => {
    setShowThankYou(!showThankYou);
  }

  const addOfflineItemToCart = (ntStatus) => {
    if (ntStatus.isConnected && ntStatus.isInternetReachable && !updadingOfflineCart) {
      var offlineObj = cartState?.cartList?.offlineCart
      if (offlineObj && offlineObj?.length > 0) {
        updadingOfflineCart = true
        let bodyFormData = new FormData()
        offlineObj.forEach(data => {
          bodyFormData.append('products[]', data?.productId)
          bodyFormData.append('product-unit[]', data?.unitId)
          bodyFormData.append('product-qty[]', data?.count)
        })
        setLoading(true)
        props.actions.addCartBuyingAction(bodyFormData, (response) => {
          props.actions.emptyCartOffline({})
          updadingOfflineCart = false
          setLoading(false)
          if (cartState?.cartList?.placeOrderStatus) {
            placeOrder()
          }
        }, (response) => {
          updadingOfflineCart = false
          setLoading(false)
        })
      } else {
        if (cartState?.cartList?.placeOrderStatus) {
          placeOrder()
        }
      }
    }
  }

  //Delete Cart item
  const onSuccessRemoveCart = (data, id) => {
    //setCartData(cartData.filter(data => data.id !== id));
  }

  const onErrorRemoveCart = data => {
    //console.log(data);
  }

  const handleRemoveCartMethod = data => {
    if (data?.type === "offline" || data?.productId) {
      var objs = cartState?.cartList?.offlineCart
      var index = objs.findIndex((item) => (item.ids === data.ids && item.count === data.count))
      if (index !== -1) {
        objs.splice(index, 1);
      }
      props.actions.replaceCartOffline(objs)
    } else {
      if (networkStatus.isConnected && networkStatus.isInternetReachable) {
        let obj = {
          id: `${data?.id}-${data?.unit}`,
        }
        props.actions.removeCartAction(obj, onSuccessRemoveCart, onErrorRemoveCart);
      } else {
        alert(strings.cart.offlineTitle)
      }
    }
  }

  const handleClearAll = () => {
    if (networkStatus.isConnected && networkStatus.isInternetReachable) {
      let obj = {
        allCheck: 1
      };
      setLoading(true)
      props.actions.removeCartAction(obj, onSuccessRemoveCart, onErrorRemoveCart);
    } else {
      props.actions.replaceCartOffline([])
    }
  }

  const handleSeparation = () => {
    props.actions.cartListAction(orderSeparation);
  }

  ///Proceed to checkout
  const onSuccessCheckOut = (data) => {
    setShowThankYou(true);
    setLoading(false)
    props.actions.storePlaceOrderStatus(null)
  }

  const onErrorCheckOut = (data) => {
    setAlert(true);
    setMessage(strings.common.errorCheckout)
    setType('error')
    setLoading(false)
  }

  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const handleCheckOut = () => {
    if (networkStatus.isConnected && networkStatus.isInternetReachable) {
      setLoading(true)
      var offlineObj = cartData.find((obj) => obj.date === "offline")
      if (offlineObj && offlineObj?.data?.length > 0) {
        let bodyFormData = new FormData()
        offlineObj.data.forEach(data => {
          bodyFormData.append('products[]', data?.productId)
          bodyFormData.append('product-unit[]', data?.buyingId)
          bodyFormData.append('product-qty[]', data?.count)
        })
        props.actions.addCartBuyingAction(bodyFormData, (response) => {
          props.actions.emptyCartOffline({})
          placeOrder()
        }, (response) => {
          //console.log("ERROR", response)
        })
      } else {
        placeOrder()
      }
    } else {
      Alert.alert(
        strings.cart.offlineTitle,
        strings.cart.offlineMessage,
        [
          {
            text: strings.actions.no.toUpperCase(),
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: strings.actions.yes.toUpperCase(), onPress: () => onClickOK() }
        ]
      )
    }
  }

  const onClickOK = () => {
    props.actions.storePlaceOrderStatus(true)
  }

  const placeOrder = () => {
    let bodyFormData = new FormData()
    bodyFormData.append('requestFrom', 'mob')
    bodyFormData.append('orderSeparately', orderSeparation)
    cartData.forEach(data => {
      if (data[`comment-${data.date}`] !== '') {
        bodyFormData.append(`comment-${data.date}`, data[`comment-${data.date}`])
      }
      if (data[`deliveryDate_${data.deliveryDate_}`] !== '') {
        bodyFormData.append(`deliveryDate_${data.deliveryDate}`, data[`deliveryDate_${data.deliveryDate}`])
      }
    })

    props.actions.createOrderAction(bodyFormData, onSuccessCheckOut, onErrorCheckOut);

  }

  ///Redirect to order history
  const handleOrderHistory = () => {
    setShowThankYou(false)
    props.navigation.navigate(NAVIGATION.myOrder);
  }

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartData?.map((data) => {
      totalPrice = totalPrice + data?.price;
    })

    var offlineObj = cartData.find((obj) => obj.date === "offline")
    if (offlineObj && offlineObj?.data?.length > 0) {

      offlineObj.data.forEach(data => {
        totalPrice += parseFloat(data.item.totalPriceNumeric)
      })
    }

    return totalPrice
  }

  ///Product details
  const onSuccessProductDetail = (data) => {
    props.navigation.navigate(NAVIGATION.productDetail, { data: data?.data?.product });
  }

  const onErrorProductDetail = (data) => {
    //console.log(data)
  }

  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail);
  }

  ///Download cart pdf
  const onSuccessDownload = (data) => {
    let url = `http://${data?.data}`
    Linking.openURL(url)
  }

  const onErrorDownload = (data) => {
    //console.log(data);
  }

  const handleDownload = () => {
    props.actions.downloadCartAction(onSuccessDownload, onErrorDownload);
  }

  const renderEmpty = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <EmptyMessage title={strings.common.noData} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.cartContainer}>
      {!network?.isConnected && <NoInternet />}
      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator color={"#fff"} />
        </View>
      }
      <Toasts message={message} type={type} show={alertToast} handleHide={handleHide} />

      <ThankYou toggleOverlay={toggleThankYou} visible={showThankYou} handleOrderHistory={handleOrderHistory} />
      {authState?.signIn?.data?.data?.tokenNumber ?
        <KeyboardAwareFlatList
          style={styles.cartListView}

          extraScrollHeight={30}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          ListHeaderComponent={() => cartData?.length > 0 &&
            <Header
              handleSeparation={handleSeparation}
              setOrderSeparation={setOrderSeparation}
              orderSeparation={orderSeparation}
            />}
          data={cartData}

          renderItem={({ item }) => (
            <CartItem
              data={item}
              networkStatus={networkStatus}
              setLoading={setLoading}
              loading={loading}
              date={cartState?.cartList?.data?.data?.currentDate}
              onPress={handleProductDetail}
              handleRemoveCartMethod={handleRemoveCartMethod}
              updateOffline={() => setOfflineUpdateCount(offlineUpdateCount + 1)}
              accountDeliverDays={cartState?.cartList?.data?.data?.accountDeliverDays}
              dateHolidayList={cartState?.cartList?.data?.data?.dateHolidayList}
              setAddCommentArray={setAddCommentArray}
              addCommentArray={addCommentArray}
              setCartData={setCartData}
              cartData={cartData}
            />
          )}
          ListEmptyComponent={() =>
            renderEmpty()
          }
          keyExtractor={item => item?.date}
          ListFooterComponent={() => cartData?.length > 0 &&
            <Footer
              handleCheckOut={handleCheckOut}
              totalPrice={getTotalPrice()}
              productCount={productCount}
              handleClearAll={handleClearAll}
              cartData={cartData}
              handleDownload={handleDownload}
            />}
        />

        :

        <View style={styles.loginAgain}>
          <EmptyMessage title={strings.common.notLogin} />
          <CustomButton
            title={strings.actions.login}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.titleLight}
            onPress={() => {
              props.navigation.navigate(NAVIGATION.login)
            }
            }
          />
        </View>
      }

    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(CartView);
