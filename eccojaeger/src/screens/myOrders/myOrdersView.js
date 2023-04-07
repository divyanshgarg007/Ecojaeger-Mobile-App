/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, ActivityIndicator, Linking } from 'react-native';
import { NAVIGATION } from '../../constants';
import OrderItems from './components/orderItems';
import { styles } from './myOrders.style';
import { strings } from '../../localization';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { Toasts, EmptyMessage, NoInternet } from '../../components';

function MyOrdersView(props) {
  const cartState = useSelector(state => state.rootReducers?.cartState);
  const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);

  const [type, setType] = useState(null)
  const [alertToast, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [pageCart, setPageCart] = useState(0);
  const [metaData, setMetaData] = useState([]);
  const [orderData, setOrderData] = useState([])

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props => {
        return <Text style={styles.navigatorText}>{strings.menu.orderHistory}</Text>;
      },
    });
  }, [props.navigation, authState]);

  useEffect(() => {
    props.actions.pageAction(pageCart + 1);
    props.actions.orderListAction(pageCart + 1)
  }, [])

  useEffect(() => {
    if (authState?.language) {
      props.actions.pageAction(1);
      props.actions.orderListAction(1)
    }
  }, [authState?.language]);

  useEffect(() => {
    if (authState?.accountID) {
      props.actions.pageAction(1);
      props.actions.orderListAction(1)
    }
  }, [authState?.accountID]);

  useEffect(() => {
    if (cartState?.pageCart) {
      setPageCart(cartState?.pageCart);
    }
  }, [cartState.pageCart]);

  useEffect(() => {
    if (cartState?.orderList?.data) {
      setOrderData(cartState?.orderList?.data)
    }
    if (cartState?.orderList?.metaData) {
      setMetaData(cartState?.orderList?.metaData?.data);
    }
  }, [cartState?.orderList?.data, cartState?.orderList?.metaData]);

  ///handle order pagination
  const handleOrderListPagination = () => {
    if (metaData?.paginationVariables?.totalCount > orderData?.length && !cartState?.orderList?.loading) {
      props.actions.pageCartAction(pageCart + 1);
      props.actions.orderListLoadAction(pageCart + 1)
    }
  }

  ///Re-order
  const onSuccessReorder = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('success')
    props.navigation.navigate("tab-cart")
  }

  const onErrorReorder = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('error')
  }

  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const handleReorder = (orderNumber) => {
    props.actions.reorderCartAction(parseInt(orderNumber), onSuccessReorder, onErrorReorder)
  }

  const render = () => {
    if (cartState?.orderList?.loading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      );
    }
  }

  const renderEmpty = () => {
    if (!cartState?.orderList?.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <EmptyMessage title={strings.common.noData} />
        </View>
      );
    }
  }

  //Order details
  const handleOrderDetails = (order) => {
    props.actions.orderDetailsAction(order.orderId, (response) => {
      props?.navigation?.navigate(NAVIGATION.orderDetails, { data: response, order: order })
    }, (error) => {
      //console.log("ERROR", error)
    })
  }
  ///Download cart pdf
  const onSuccessDownload = (data) => {
    let url = `http://${data?.data}`
    Linking.openURL(url)
  };
  const onErrorDownload = (data) => {
    //console.log(data);
  };
  const handleDownload = (id) => {
    props.actions.downloadOrderAction(id, onSuccessDownload, onErrorDownload);
  };


  return (
    <View style={styles.orderContainer}>
      <Toasts message={message} type={type} show={alertToast} handleHide={handleHide} />
      {!network?.isConnected && <NoInternet />}
      <KeyboardAwareFlatList
        data={orderData}
        renderItem={({ item }) => (
          <OrderItems
            item={item}
            handleReorder={handleReorder}
            handleOrderDetails={handleOrderDetails}
            handleDownload={handleDownload}
          //onPress={() => props?.navigation?.navigate(NAVIGATION.orderDetails)}
          />
        )}
        keyExtractor={item => item.orderId}
        onEndReachedThreshold={0.2}
        onEndReached={() =>
          handleOrderListPagination()
        }
        ListFooterComponent={() => render()}
        ListEmptyComponent={() =>
          renderEmpty()
        }
      />
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(null, mapDispatchToProps)(MyOrdersView);
