/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from '../../components';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { Icon } from 'react-native-elements';
import { AddItem } from './components';
import { styles } from './buyingAddProducts.style';
import { NAVIGATION } from '../../constants';
import NetInfo from '@react-native-community/netinfo';
import { Toasts, EmptyMessage, NoInternet } from '../../components';
import { strings } from '../../localization';
import { API_CONSTANTS } from '../../constants/constants';
import { searchItem, getDBConnection, saveProductItems, createTable, getProductPaginatedItems } from '../../services/db-service';


const BuyingAddProducts = props => {

  const productState = useSelector(state => state.rootReducers?.productState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const [productData, setProductData] = useState([]);

  const [pageAfterFilter, setPageAfterFilter] = useState(0);
  const [productDataAfterFilter, setProductDataAfterFilter] = useState([]);
  const [metaDataAfterFilter, setMetaDataAfterFilter] = useState([]);

  const [isSelectedChild, setSelectionChild] = useState([]);

  const [type, setType] = useState(null)
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [suggestionData, setSuggestionData] = useState([]);
  const [search, setSearch] = useState(false)

  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const lPage = useRef(0)
  const [db, setDb] = useState(null)
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      //await createTable(db);
      setDb(db)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  useEffect(() => {
    if (db) {
      callDBAPI()
    }
  }, [db])

  //LOAD data from sqlite db
  const callDBAPI = async () => {
    const storedTodoItems = await getProductPaginatedItems(db, 20, lPage.current);
    if (storedTodoItems.length) {
      lPage.current = lPage.current + 20
      var arr = []
      storedTodoItems.map((item) => {
        arr.push(JSON.parse(item.prodJson))
      })
      let unique = [...new Set([...productData, ...arr].map(obj => obj))];
      setProductData([...unique])
    }
  }

  //Filter productlist
  const onSuccessProduct = (data, page) => {
    setLoading(false)
    if (page === 0) {
      setProductDataAfterFilter(data?.data?.products);
    } else {
      setProductDataAfterFilter(
        [].concat(productDataAfterFilter, data?.data?.products),
      );
    }
    setMetaDataAfterFilter(data?.data);
  }

  const onError = data => {
    setLoading(false)
  }


  const render = () => {
    if (productState.network && (loading || productState?.productList?.loading)) {
      return (
        <View style={{ padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };
  const renderEmpty = () => {
    if (!loading && !productState?.productList?.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <EmptyMessage title={strings.common.noData} />
        </View>
      );
    }
  }

  const onSuccessProductDetail = (data) => {
    props.navigation.navigate(NAVIGATION.productDetail, { data: data?.data?.product })
  }
  const onErrorProductDetail = (data) => {
    ////console.log(data)
  }
  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail)
  }
  const handleAddBuying = (data, unitId) => {
    props?.route?.params?.handleAddBuying(data, props.route.params?.buyingId, unitId)
    //props.navigation.goBack()
  }

  //Add cart
  const onSuccessAddCart = (data) => {
    setAlert(true);
    setMessage(strings.common.addToCartSuccess)
    setType('success')
  }

  const onErrorAddCart = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('error')
  }

  const handleAddCart = (item, count, unit, price) => {
    if (count > 0) {
      let obj = {
        ids: item?.id,
        quantity: count,
        unitId: unit?.id,
      };
      if (network.isConnected && network.isInternetReachable) {
        props.actions.addCartAction(obj, onSuccessAddCart, onErrorAddCart);
      } else {
        obj["item"] = item
        obj["type"] = "offline"
        obj["selectedUnit"] = unit
        obj["unit"] = unit.name
        obj["count"] = count
        obj["productId"] = item.id
        obj.item["count"] = count
        obj.item["totalPriceNumeric"] = price.toFixed(2)
        obj.item["totalPrice"] = `CHF ${price.toFixed(2)}`
        props.actions.addItemToCartOffline([obj])

        onSuccessAddCart()
      }
    } else {
      setAlert(true);
      setMessage(strings.common.selectQuantity);
      setType('error');
    }
  };
  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  ////Auto suggestion
  const onSuccessAutoSuggestion = (data) => {
    setSuggestionData(data?.data?.products)
  }

  const onErrorAutoSuggestion = (data) => {
    setSuggestionData([])
  }

  const handleChangeSuggestion = (text) => {
    if (text?.length < 3) {
      setSearch(false)
      setPageAfterFilter(1)
      setProductDataAfterFilter([])
      setSuggestionData([])
      setMetaDataAfterFilter([])
    } else if (text?.length > 2) {
      props.actions.searchAutoSuggestionAction(text, onSuccessAutoSuggestion, onErrorAutoSuggestion)
    }
  }
  ///Product search
  const handleSelectedSuggestion = (data) => {
    if (data?.length > 2) {
      setSearch(true)
      setLoading(true)
      setPageAfterFilter(1)
      setText(data)
      props.actions.searchAction(data, onSuccessProduct, onError, 0)
    }
  }

  const handlePaginationSearch = () => {
    if (metaDataAfterFilter?.paginationVariables?.totalCount > productDataAfterFilter?.length && !loading) {
      setSearch(true)
      setLoading(true)
      setPageAfterFilter(pageAfterFilter + 1)
      props.actions.searchAction(text, onSuccessProduct, onError, pageAfterFilter)
    }
  }
  const handleClear = () => {
    setSearch(false)
    setPageAfterFilter(1)
    setProductDataAfterFilter([])
    setSuggestionData([])
    setMetaDataAfterFilter([])
  }
  return (
    <>
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <View style={styles.homeContainer}>
        {!network?.isConnected && <NoInternet />}
        <SearchBar
          handleChangeSuggestion={handleChangeSuggestion}
          suggestionData={suggestionData}
          handleSelectedSuggestion={handleSelectedSuggestion}
          handleClear={handleClear}
        />
        <View style={{ flex: 1, marginTop: 15 }}>
          <KeyboardAwareFlatList
            data={
              isSelectedChild?.length === 0 && !search ? productData : productDataAfterFilter
            }
            renderItem={({ item }) => (
              <AddItem dataUrl={API_CONSTANTS.IMG_PREFIX}
                item={item}
                onPress={handleProductDetail}
                handleAddBuying={handleAddBuying}
                handleAddCart={handleAddCart}
              />
            )}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.2}
            onEndReached={() =>
              isSelectedChild?.length === 0 && !search
                ? callDBAPI()
                : handlePaginationSearch()
            }
            ListFooterComponent={() => render()}
            ListEmptyComponent={() =>
              renderEmpty()
            }
          />
        </View>
      </View>
    </>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(BuyingAddProducts);
