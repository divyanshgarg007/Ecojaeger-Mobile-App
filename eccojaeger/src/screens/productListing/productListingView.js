/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, Text, View, FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { BackButton, SearchBar, Toasts, BuyingModal, EmptyMessage, NoInternet } from '../../components';
import { ProductListItem } from './components';
import { styles } from './productListing.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { API_CONSTANTS } from '../../constants/constants';
import { strings } from '../../localization';
import RBSheet from "react-native-raw-bottom-sheet";
import normalize from 'react-native-normalize';
import { Icon, Image } from 'react-native-elements';
import { NAVIGATION } from '../../constants';
import SearchBarLocal from '../../components/searchBarLocal';
import { getDBConnection, productByCategory, createTable, searchItem } from '../../services/db-service';
const ProductListingView = (props) => {
  const productState = useSelector(state => state.rootReducers?.productState);
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  // const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const rBSheet = useRef();

  // const [pageAfterFilter, setPageAfterFilter] = useState(1);
  const [productDataAfterFilter, setProductDataAfterFilter] = useState([]);
  const [metaDataAfterFilter, setMetaDataAfterFilter] = useState([]);

  const [type, setType] = useState(null)
  const [alertFlag, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false);

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

  const callDBAPI = async () => {
    const storedTodoItems = await productByCategory(db, props?.route?.params?.item?.id, 20, lPage.current);
    if (storedTodoItems.length) {
      lPage.current = lPage.current + 20
      var arr = []
      storedTodoItems.map((item) => {
        arr.push(JSON.parse(item.prodJson))
      })
      let unique = [...new Set([...productDataAfterFilter, ...arr].map(obj => obj))];
      setProductDataAfterFilter([...unique])
    }
  }
  // useEffect(() => {
  //   callProductListAPI()
  // }, [pageAfterFilter]);

  // const handleFilterPagination = () => {
  //   //Apply pagination
  //   if (
  //     productState.network &&
  //     metaDataAfterFilter?.paginationVariables?.totalCount >
  //     productDataAfterFilter?.length && !loading
  //   ) {
  //     setPageAfterFilter(pageAfterFilter + 1);
  //   }
  // };
  //Filter productlist
  // const onSuccessProduct = (data) => {
  //   setLoading(false)
  //   if (pageAfterFilter === 1) {
  //     setProductDataAfterFilter(data?.data?.products);
  //   } else {
  //     setProductDataAfterFilter(
  //       [].concat(productDataAfterFilter, data?.data?.products),
  //     );
  //   }
  //   setMetaDataAfterFilter(data?.data);
  // };
  // const onError = data => {
  //   setLoading(false)
  //   setProductDataAfterFilter([]);
  // };

  // const handleFilter = () => {
  //   setFilterData(filterData);
  //   handleClear()
  //   setText('')
  // }
  // const callProductListAPI = () => {
  //   setLoading(true)
  //   let obj = {
  //     limit: 50,
  //     page: pageAfterFilter,
  //     category: filterData.Category,
  //     producers: filterData.producers,
  //     Brand: filterData.Brand,
  //     Origin: filterData.Origin,
  //     Glutenfree: filterData['Glutenfree'],
  //     Laktosefrei: filterData['Laktosefrei'],
  //     newProduct: filterData['New Product'],
  //     TK: filterData['TK'],
  //     vegan: filterData.Vegan,
  //     veggie: filterData.Veggie,
  //     promotional: filterData['promotional']
  //   };
  //   props.actions.productListSubCategoryAction(
  //     obj,
  //     onSuccessProduct,
  //     onError,
  //   );
  // }
  ///Product details
  const onSuccessProductDetail = (data) => {
    setLoading(false)
    props.navigation.navigate(NAVIGATION.productDetail, { data: data?.data?.product });
  };
  const onErrorProductDetail = (data) => {
    setLoading(false)
    setAlert(true);
    setMessage(data.message)
    setType('error')
  };
  const handleProductDetail = (data) => {
    setLoading(true)
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail);
  };
  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }
  //Add cart
  const onSuccessAddCart = (data) => {
    setAlert(true);
    setMessage(strings.common.addToCartSuccess)
    setType('success')
    props.navigation.navigate("tab-cart")
  };
  const onErrorAddCart = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('error')
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
  ///Add product to buying list
  const [addProductBuyingData, setAddProductBuying] = useState()

  const handleAddBuyingClick = (productId, unitId) => {
    if (productState.network && !buyingState?.buyingList?.data) {
      props.actions.buyingListAction()
    }
    setAddProductBuying({ productId: productId, unitId: unitId })
    rBSheet.current.open()
  }

  const onSuccessAddProductBuying = (data, obj) => {
    setAlert(true)
    setMessage(data?.message)
    setType('success')
  }
  const onErrorAddProductBuying = (data) => {
    setAlert(true);
    setMessage(data?.message)
    setType('error')
  }
  const handleAddBuying = (buyingId) => {
    let obj = {
      productId: addProductBuyingData?.productId,
      id: buyingId,
      unitId: addProductBuyingData?.unitId
    }
    rBSheet.current.close()
    props.actions.buyingAddProductAction(obj, onSuccessAddProductBuying, onErrorAddProductBuying)
  }
  /////
  //Create new buying list
  const [isShowBuyingModal, showBuyingModal] = useState(false)
  const [valueBuying, setValueBuying] = useState('')
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

  // //Product search
  // const [search, setSearch] = useState('')
  // const [isSearch, setIsSearch] = useState(false)
  // const [searchData, setSearchData] = useState([])
  // const [metaDataAfterSearch, setMetaDataAfterSearch] = useState([]);
  // const [pageAfterSearch, setPageAfterSearch] = useState(0);

  // const onSuccessProductSearch = (data, page) => {
  //   if (page === 0) {
  //     setSearchData(data?.data?.products);
  //   } else {
  //     setSearchData(
  //       [].concat(searchData, data?.data?.products),
  //     );
  //   }
  //   setMetaDataAfterSearch(data?.data);
  // };

  // const onErrorSearch = data => {
  //   //console.log(data)
  // };

  // const handleSearch = (e) => {
  //   if (e?.length > 0) {
  //     setSearch(e)
  //     setIsSearch(true)
  //     if (network?.isConnected) {
  //       setPageAfterSearch(1)
  //       props.actions.searchAction(e, onSuccessProductSearch, onErrorSearch, 0, props?.route?.params?.item?.id)
  //     } else {
  //       let filterData = productDataAfterFilter.filter((data) => data?.itemNumber.toLowerCase().includes(search.toLowerCase()) || data?.title.toLowerCase().includes(search.toLowerCase()))
  //       setSearchData(filterData)
  //     }

  //   } else {
  //     handleSearchClear()
  //   }
  // }
  // const handlePaginationSearch = () => {
  //   if (metaDataAfterSearch?.paginationVariables?.last > metaDataAfterSearch?.paginationVariables?.current && !loading) {
  //     // setSearch(true)
  //     setLoading(true)
  //     setPageAfterSearch(pageAfterSearch + 1)
  //     props.actions.searchAction(search, onSuccessProductSearch, onErrorSearch, pageAfterSearch, props?.route?.params?.item?.id)
  //   }
  // }
  // const handleSearchClear = () => {
  //   setIsSearch(false)
  //   setSearchData([])
  //   setSearch('')
  //   setPageAfterSearch(1)
  // }

  const [searchOffline, setSearchOffline] = useState('')
  const [isSearchOffline, setIsSearchOffline] = useState(false)
  const [searchDataOffline, setSearchDataOffline] = useState([])

  const handleSearchOffline = async (e) => {
    if (e?.length > 0) {
      setSearchOffline(e)
      setIsSearchOffline(true)
      //Get data from sqlite db rather productData

      const storedTodoItems = await searchItem(db, e, props?.route?.params?.item?.id)

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

  const render = () => {
    if (productState.network && metaDataAfterFilter?.paginationVariables?.totalCount >
      productDataAfterFilter?.length) {
      return (
        <View style={{ paddingVertical: 20, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator />
        </View>
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <ActivityIndicator />
        </View>
      );
    }
  }
  return (
    <SafeAreaView style={styles.listContainer}>
      {!network?.isConnected && <NoInternet />}
      <View style={styles.topContainer}>
        <View style={styles.backBox}>
          <BackButton onClick={() => props.navigation.goBack()} style={styles.backIcon} />
        </View>
        <View style={styles.searchBox}>
          {/* <SearchBarLocal
            handleSearch={handleSearchOffline}
            search={search}
            setSearch={setSearch}
            handleSearchClear={handleSearchClear}
          /> */}
          <SearchBarLocal
            handleSearch={handleSearchOffline}
            search={searchOffline}
            setSearch={setSearchOffline}
            handleSearchClear={handleSearchOfflineClear}
          />
        </View>
      </View>
      <KeyboardAwareFlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ zIndex: -1 }}
        data={isSearchOffline ? searchDataOffline : productDataAfterFilter}
        renderItem={({ item }) => (
          <ProductListItem
            item={item}
            dataUrl={API_CONSTANTS.IMG_PREFIX}
            onPress={handleProductDetail}
            handleAddCart={handleAddCart}
            handleAddBuying={handleAddBuyingClick}
          />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => isSearchOffline ? null : callDBAPI()}
        ListFooterComponent={() => !isSearchOffline && render()}
        ListEmptyComponent={() =>
          renderEmpty()
        }
      />
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
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(ProductListingView);
