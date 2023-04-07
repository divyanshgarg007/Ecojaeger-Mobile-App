/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { View, FlatList, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { BuyingListItem } from './components';
import { styles } from './buyingList.style';
import { NAVIGATION } from '../../constants';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { CustomButton, EmptyMessage } from '../../components';
import { Toasts, NoInternet } from '../../components';
import { strings } from '../../localization';

var currentItem = null

function BuyingListView(props) {
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const productState = useSelector(state => state.rootReducers?.productState);
  const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const [buyingData, setBuyingData] = useState([]);
  const [value, setValue] = useState(0);
  const [type, setType] = useState(null)
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (authState?.accountID && authState?.signIn?.data?.data?.tokenNumber) {
      props.actions.buyingListAction();
    }
  }, [authState?.accountID, authState?.signIn?.data?.data?.tokenNumber]);

  useEffect(() => {
    if (buyingState?.buyingList?.data?.data) {
      //comment fetch here because fetch data at HomeNewView
      /*buyingState?.buyingList?.data?.data.map((item) => {
        props.actions.buyingProductListAction(item, 0);
      })*/
      setBuyingData(buyingState?.buyingList?.data?.data);
      setIsFetching(false)
    }
  }, [buyingState?.buyingList]);

  useEffect(() => {
    if (authState?.language) {
      setValue(value + 1);
    }
  }, [authState?.language]);

  useEffect(() => {
    if (buyingState?.item && currentItem) {

    }
  }, [buyingState?.item]);

  //Buying product list
  const onSuccessBuyingProduct = (data, buyingData) => {
    props.navigation.navigate(NAVIGATION.buyingProductList, {
      data: data,
      buyingData: buyingData,
      // handleBuyingProductList: handleBuyingProductList,
    });
  };

  const onErrorBuyingProduct = (data) => {
    //console.log(data);
  };

  const handleBuyingProductList = (item) => {
    let buyingDataItem = buyingState?.item[item.id]
    if (buyingDataItem) {
      navigateToProductList(item, buyingDataItem)
      props.actions.buyingProductListAction(item, 0);
      return
    }

    if (productState.network) {
      currentItem = item
      props.actions.buyingProductListAction(item, 0, onSuccessBuyingProduct, onErrorBuyingProduct);
    } else {
      // todo show error alert
    }
  };

  const navigateToProductList = (item, buyingDataItem) => {
    props.navigation.navigate(NAVIGATION.buyingProductList, {
      data: buyingDataItem,
      buyingDataItem: item,
    });
  }
  /////

  ///Delete buying list
  const onSuccessDeleteBuying = (data, id) => {
    setBuyingData(buyingData.filter((data) => data.id !== id));
    setAlert(true);
    setMessage(data.message)
    setType('success')

  }

  const onErrorDeleteBuying = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('error')
  }

  const handleDeleteBuyingMethod = (data) => {
    let obj = {
      id: data?.id,
    };
    props.actions.buyingRemoveAction(obj, onSuccessDeleteBuying, onErrorDeleteBuying);
  }

  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const onRefresh = () => {
    setIsFetching(true)
    props.actions.buyingListAction();
  }

  const renderFooter = () => {
    if (buyingState?.buyingList?.loading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      );
    }
  };
  const renderEmpty = () => {
    if (!buyingState?.buyingList?.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <EmptyMessage title={strings.common.noData} />
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', }}>
      {!network?.isConnected && <NoInternet />}
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <View style={styles.buyhomeContainer}>
        {authState?.signIn?.data?.data?.tokenNumber ?
          <KeyboardAwareFlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={buyingData}
            renderItem={({ item }) => (
              <BuyingListItem
                item={item}
                onPress={() =>
                  handleBuyingProductList(item)
                }
                handleDeleteBuyingMethod={handleDeleteBuyingMethod}
              />
            )}
            onRefresh={() => network.isConnected ? onRefresh() : null}
            refreshing={isFetching}
            keyExtractor={item => item.id}
            ListFooterComponent={() => renderFooter()}
            ListEmptyComponent={() =>
              renderEmpty()
            }
          />
          :
          <View style={styles.loginAgain}>
            <EmptyMessage title={strings.common.notLogin} />
            <CustomButton
              title={strings.actions.login}
              buttonStyle={styles.btnGreen}
              titleStyle={styles.titleLight}
              onPress={() => props.navigation.navigate(NAVIGATION.login)}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(BuyingListView);
