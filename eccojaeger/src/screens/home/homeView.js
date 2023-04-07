/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, Text, View, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { Icon } from 'react-native-elements';
import { ProductItem } from './components';
import { styles } from './home.style';
import { NAVIGATION } from '../../constants';
import FilterIcon from '../../assets/images/filter.png';
import { EmptyMessage, SearchBar, PromotionalFilter } from '../../components';
import { Toasts, BuyingModal, NoInternet } from '../../components';
import RBSheet from "react-native-raw-bottom-sheet";
import { strings } from '../../localization';
import { Dimensions } from 'react-native';
import { API_CONSTANTS } from '../../constants/constants';
import SearchBarLocal from '../../components/searchBarLocal';
import { searchItem, getDBConnection, saveProductItems, createTable, getProductPaginatedItems } from '../../services/db-service';
import FastImage from 'react-native-fast-image'

const HEIGHT = Dimensions.get('screen').height;

const HomeView = props => {
  const rBSheet = useRef();
  const lPage = useRef(0)

  const productState = useSelector(state => state.rootReducers?.productState);
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const network = useSelector(state => state.rootReducers?.productState?.network);
  const [isShowBuyingModal, showBuyingModal] = useState(false)
  const [valueBuying, setValueBuying] = useState('')
  const [type, setType] = useState(null)
  const [alertFlag, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [text, setText] = useState('')
  const [suggestionData, setSuggestionData] = useState([]);
  const [search, setSearch] = useState(false)

  const [page, setPage] = useState(0);
  const [productData, setProductData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [value, setValue] = useState(0);

  const [pageAfterFilter, setPageAfterFilter] = useState(0);
  const [productDataAfterFilter, setProductDataAfterFilter] = useState([]);
  const [metaDataAfterFilter, setMetaDataAfterFilter] = useState([]);

  const [pageAfterSearch, setPageAfterSearch] = useState(0);
  const [productDataAfterSearch, setProductDataAfterSearch] = useState([]);
  const [metaDataAfterSearch, setMetaDataAfterSearch] = useState([]);

  const [isSelectedChild, setSelectionChild] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(props?.route?.params?.filter);

  //Product search
  const [searchOffline, setSearchOffline] = useState('')
  const [isSearchOffline, setIsSearchOffline] = useState(false)
  const [searchDataOffline, setSearchDataOffline] = useState([])

  const [sort, setSort] = useState({
    id: 'default',
    name: strings.common.alphabet
  })

  const [filterData, setFilterData] = useState({
    producers: [],
    Brand: [],
    Origin: [],
    Category: '',
    Vegan: 0,
    Veggie: 0,
    'promotional': 0,
    'Glutenfree': 0,
    'Laktosefrei': 0,
    'New Product': 0,
    'TK': 0
  });

  const [addProductBuyingData, setAddProductBuying] = useState()

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


  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <Pressable onPress={() => handleClickFilter()} >
          <FastImage source={FilterIcon} style={styles.filterIcon} />
        </Pressable>
      ),
    });
  });


  useEffect(() => {
    if (network?.isConnected) {
      //setOpenFilters(props?.route?.params?.filter)
    }
  }, [props?.route?.params?.filter]);

  useEffect(() => {
    if (network?.isConnected) {
      handleSearchOfflineClear()
      // setOpenFilters(false);
    }
  }, [network?.isConnected]);

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
  };

  const onError = data => {
    setLoading(false)
    setProductDataAfterFilter([]);
  };


  const handleFilter = (filterData, isSelectedChild) => {
    //Apply filter
    setLoading(true)
    if (productState.network) {
      setPageAfterFilter(1);
      let obj = {
        limit: 12,
        page: 1,
        category: filterData.Category,
        producers: filterData.producers,
        Brand: filterData.Brand,
        Origin: filterData.Origin,

        Glutenfree: filterData['Glutenfree'],
        Laktosefrei: filterData['Laktosefrei'],
        newProduct: filterData['New Product'],
        TK: filterData['TK'],
        vegan: filterData.Vegan,
        veggie: filterData.Veggie,
        sort: sort,
        promotional: filterData['promotional']
      };
      setFilterData(filterData);
      setSelectionChild(isSelectedChild);
      handleClearSearch()
      setText('')
      props.actions.productListSubCategoryAction(
        obj,
        onSuccessProduct,
        onError,
        0,
      );
    }
  };

  const handleFilterPagination = () => {
    //Apply pagination
    if (
      productState.network &&
      metaDataAfterFilter?.paginationVariables?.last >
      metaDataAfterFilter?.paginationVariables?.current && !loading
    ) {
      setLoading(true)
      setPageAfterFilter(pageAfterFilter + 1);
      let obj = {
        limit: 12,
        page: pageAfterFilter + 1,
        category: filterData.Category,
        producers: filterData.producers,
        Brand: filterData.Brand,
        Origin: filterData.Origin,

        Glutenfree: filterData['Glutenfree'],
        Laktosefrei: filterData['Laktosefrei'],
        newProduct: filterData['New Product'],
        TK: filterData['TK'],
        vegan: filterData.Vegan,
        veggie: filterData.Veggie,
        sort: sort,
        promotional: filterData['promotional']
      };
      props.actions.productListSubCategoryAction(
        obj,
        onSuccessProduct,
        onError,
        pageAfterFilter + 1,
      );
    }
  };
  ////

  //Click clear all
  const handleClearAll = () => {
    //Apply pagination
    if (productState.network) {
      setPageAfterFilter(1);
      setFilterData({
        producers: [],
        Brand: [],
        Origin: [],
        Category: '',
        'Glutenfree': 0,
        'Laktosefrei': 0,
        'New Product': 0,
        'TK': 0,
        Vegan: 0,
        Veggie: 0,
        promotional: 0
      });
      setSelectionChild([]);
      setProductDataAfterFilter([])
      setMetaDataAfterFilter([])
      //setOpenFilters(false)
    }
  };

  ///Product details

  const handleProductDetail = (data) => {
    setLoading(true)
    //props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail);
    props.actions.productDetailsAction(data, (response) => {
      setLoading(false)
      props.navigation.navigate(NAVIGATION.productDetail, { data: response?.data?.product });
    }, (response) => {
      setLoading(false)
      setAlert(true);
      setMessage(response.message)
      setType('error')
    });
  };

  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const onSuccessAddCart = (data) => {
    setAlert(true);
    setMessage(strings.common.addToCartSuccess);
    setType('success');
  };

  const onErrorAddCart = (data) => {
    setAlert(true);
    setMessage(data.message);
    setType('error');
  };

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
        obj["unit"] = unit?.name
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

  ///Add product to buying list

  const handleAddBuyingClick = (productId, unitId) => {
    if (productState.network && !buyingState?.buyingList?.data) {
      props.actions.buyingListAction()
    }
    setAddProductBuying({ productId: productId, unitId: unitId })
    rBSheet.current.open()
  }

  const handleAddBuying = (buyingId) => {
    let obj = {
      productId: addProductBuyingData?.productId,
      id: buyingId,
      unitId: addProductBuyingData?.unitId
    }
    rBSheet.current.close()

    props.actions.buyingAddProductAction(obj, (response) => {
      setAlert(true)
      setMessage(response?.message)
      setType('success')
    }, (response) => {
      setAlert(true);
      setMessage(response?.message)
      setType('error')
    });
  }

  ////Auto suggestion
  const onSuccessAutoSuggestion = (data) => {
    setSuggestionData(data?.data?.products)
  };

  const onErrorAutoSuggestion = (data) => {
    setSuggestionData([])
  };

  const handleChangeSuggestion = (text) => {
    if (text?.length < 2) {
      setSearch(false)
      setPageAfterSearch(1)
      setProductDataAfterSearch([])
      setSuggestionData([])
      setMetaDataAfterSearch([])
    } else if (text?.length >= 2) {
      props.actions.searchAutoSuggestionAction(text, onSuccessAutoSuggestion, onErrorAutoSuggestion)
    }
  }

  ///Product search
  const onSuccessProductSearch = (data, page) => {
    setLoading(false)
    if (page === 0) {
      setProductDataAfterSearch(data?.data?.products);
    } else {
      setProductDataAfterSearch(
        [].concat(productDataAfterSearch, data?.data?.products),
      );
    }
    setMetaDataAfterSearch(data?.data);
  };

  const onErrorSearch = data => {
    setLoading(false)
  };

  const handleSelectedSuggestion = (data) => {
    if (data?.length >= 2) {
      setSearch(true)
      setLoading(true)
      setPageAfterSearch(1)
      setText(data)
      props.actions.searchAction(data, onSuccessProductSearch, onErrorSearch, 0)
      handleClearAll()
    }
  }

  const handlePaginationSearch = () => {
    if (metaDataAfterSearch?.paginationVariables?.last > metaDataAfterSearch?.paginationVariables?.current && !loading) {
      setSearch(true)
      setLoading(true)
      setPageAfterSearch(pageAfterSearch + 1)
      props.actions.searchAction(text, onSuccessProductSearch, onErrorSearch, pageAfterSearch)
    }
  }

  const handleClearSearch = () => {
    setSearch(false)
    setPageAfterSearch(1)
    setProductDataAfterSearch([])
    setSuggestionData([])
    setMetaDataAfterSearch([])
  }

  // Filter Open

  const handleClickFilter = () => {
    if (network?.isConnected && !(metaData?.paginationVariables?.last > metaData?.paginationVariables?.current)) {
      setOpenFilters(!openFilters);
    } else {
      alert(strings.common.offlineMessage)
    }
  };

  //Create new buying list

  const handleAddBuyingPopUp = () => {
    rBSheet.current.close()

    setTimeout(() => {
      showBuyingModal(true)
    }, 500);
  }

  const toggleBuyingAction = () => {
    showBuyingModal(!isShowBuyingModal);
  }
  const onSuccessCreate = (data) => {
    showBuyingModal(!isShowBuyingModal);
    setValueBuying('')
    setAlert(true);
    setMessage(data.message)
    setType('success')
    rBSheet.current.open()
  };

  const onErrorCreate = (data) => {
    setAlert(true);
    setMessage('Please input the valid name')
    setType('error')
  };

  const handleAddBuyingAction = (action) => {
    let obj = {
      name: valueBuying,
      requestFrom: 'mob',
      action: 'new'
    };
    props.actions.buyingCreateAction(obj, onSuccessCreate, onErrorCreate);
  }

  const renderData = () => {
    if (isSelectedChild?.length === 0 && !search && !isSearchOffline) {
      return productData //All synced data
    } else {
      if (search) {
        return productDataAfterSearch // Online searched Data
      } else if (isSearchOffline) {
        return searchDataOffline // Offline seached data
      } else {
        return productDataAfterFilter // filtered data
      }
    }
  }
  const onLoadMore = () => {
    if (isSelectedChild?.length === 0 && !search) {
      //handleProductListPagination() // load more for all data
      callDBAPI()
    } else {
      if (search) {
        handlePaginationSearch() // load more for search data
      } else {
        handleFilterPagination() // load more for filtered data
      }
    }
  }

  const handleSearchOffline = async (e) => {
    if (e?.length > 0) {
      setSearchOffline(e)
      setIsSearchOffline(true)
      //Get data from sqlite db rather productData

      const storedTodoItems = await searchItem(db, e)

      var arr = []
      if (storedTodoItems.length) {
        storedTodoItems.map((item) => {
          arr.push(JSON.parse(item.prodJson))
        })
      }
      setSearchDataOffline([...arr])

    } else {
      handleSearchOfflineClear()
    }
  }

  const handleSearchOfflineClear = () => {
    setIsSearchOffline(false)
    setSearchDataOffline([])
    setSearchOffline('')
  }

  const renderFooter = () => {
    if (productState.network && (loading || productState?.productListSyncedData?.loading)) {
      return (
        null
      );
    }
  };

  const renderEmpty = () => {
    if (!loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <EmptyMessage title={strings.common.noData} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )

    }
  }

  const renderItem = ({ item }) => {
    return (
      <ProductItem
        dataUrl={API_CONSTANTS.IMG_PREFIX}
        item={item}
        onPress={handleProductDetail}
        handleAddCart={handleAddCart}
        handleAddBuying={handleAddBuyingClick}
      />
    )
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      {
        !network?.isConnected && <NoInternet />
      }
      {
        network?.isConnected && productState?.productListSyncedData?.metaData?.data?.paginationVariables?.last > productState?.productListSyncedData?.metaData?.data?.paginationVariables?.current &&
        <View style={styles.syncContainer}>
          <Text style={styles.offlineMsg}>
            {strings.common.syncingMsg}
          </Text>
        </View>
      }

      {
        network?.isConnected ?
          <SearchBar
            handleChangeSuggestion={handleChangeSuggestion}
            suggestionData={suggestionData}
            handleSelectedSuggestion={handleSelectedSuggestion}
            handleClear={handleClearSearch}
            synced={!(metaData?.paginationVariables?.last > metaData?.paginationVariables?.current)}
            focus={props?.route?.params?.search}
          />
          : <SearchBarLocal
            handleSearch={handleSearchOffline}
            search={searchOffline}
            setSearch={setSearchOffline}
            handleSearchClear={handleSearchOfflineClear}
          />
      }

      {
        openFilters && network.isConnected &&
        <View style={{ zIndex: 999, paddingTop: (12), maxHeight: HEIGHT - 350, minHeight: 80, width: '100%', backgroundColor: '#fff' }}>
          <PromotionalFilter
            handleFilter={handleFilter}
            handleClearAll={handleClearAll}
            filter=
            {isSelectedChild?.length === 0
              ? productState?.productListSyncedData?.metaData?.data?.filters
              : metaDataAfterFilter.filters}
            isSelectedChild={isSelectedChild}
            filterData={filterData}
            handleClickFilter={handleClickFilter}
          />
        </View>
      }
      <View style={{ flex: 1, marginTop: 15 }}>
        <KeyboardAwareFlatList
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.itemContainer}
          data={renderData()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            onLoadMore()
          }
          ListFooterComponent={() => productState?.network?.isConnected && renderFooter()}
          ListEmptyComponent={() =>
            renderEmpty()
          }
        />
      </View>
      <RBSheet
        ref={rBSheet}
        height={(200)}
        openDuration={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: (30),
            paddingTop: (20),
          },
        }}
      >
        <View style={styles.addToggle}>
          <Icon
            name="plus"
            type="antdesign"
            size={(22)}
            color="#222"
            onPress={() => handleAddBuyingPopUp()}
          />
        </View>
        <Text style={styles.listName}>{strings.common.selectBuyingList}</Text>
        <View style={styles.closeToggle}>
          <Icon
            name="close"
            type="antdesign"
            size={(22)}
            color="#222"
            onPress={() => rBSheet.current.close()}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {buyingState?.buyingList?.data?.data.map((data, index) => {
            return (
              <Pressable onPress={() => handleAddBuying(data.id)} key={index}>
                <Text style={styles.listItems}>{data.name}</Text>
              </Pressable>
            )
          })
          }
        </ScrollView>

      </RBSheet>
      <BuyingModal
        toggleOverlay={toggleBuyingAction}
        visible={isShowBuyingModal}
        action={'add'}
        handleAction={handleAddBuyingAction}
        value={valueBuying}
        setValue={setValueBuying}
      />
      <Toasts message={message} type={type} show={alertFlag} handleHide={handleHide} />
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(HomeView);
