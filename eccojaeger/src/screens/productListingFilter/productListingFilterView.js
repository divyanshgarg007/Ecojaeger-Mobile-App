/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, Text, View, FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { BackButton, SearchBar, Toasts, BuyingModal, EmptyMessage, NoInternet } from '../../components';
import { ProductListFilterItem } from './components';
import { styles } from './productListingFilter.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { API_CONSTANTS } from '../../constants/constants';
import { strings } from '../../localization';
import RBSheet from "react-native-raw-bottom-sheet";
import { Icon, Image } from 'react-native-elements';
import { NAVIGATION } from '../../constants';
import SearchBarLocal from '../../components/searchBarLocal';

const ProductListingFilterView = (props) => {
  const productState = useSelector(state => state.rootReducers?.productState);
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);

  const rBSheet = useRef();

  const [pageAfterFilter, setPageAfterFilter] = useState(1);
  const [productDataAfterFilter, setProductDataAfterFilter] = useState([]);
  const [metaDataAfterFilter, setMetaDataAfterFilter] = useState([]);

  const [isSelectedChild, setSelectionChild] = useState([]);

  const [type, setType] = useState(null)
  const [alertFlag, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false);


  const [filterData, setFilterData] = useState(props?.route?.params?.filterData);

  useEffect(() => {
    callProductListAPI()
  }, [pageAfterFilter]);

  const handleFilterPagination = () => {
    //Apply pagination
    if (
      productState.network &&
      metaDataAfterFilter?.paginationVariables?.totalCount >
      productDataAfterFilter?.length && !loading
    ) {
      setPageAfterFilter(pageAfterFilter + 1);
    }
  };
  //Filter productlist
  const onSuccessProduct = (data) => {
    setLoading(false)
    if (pageAfterFilter === 1) {
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

  const callProductListAPI = () => {
    setLoading(true)
    let obj = {
      limit: 12,
      page: pageAfterFilter,
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
      promotional: filterData['promotional']
    };
    props.actions.productListSubCategoryAction(
      obj,
      onSuccessProduct,
      onError,
    );
  }
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
  const handleAddCart = (id, count, unitId) => {
    let obj = {
      ids: id,
      quantity: count,
      unitId: unitId,
    };
    props.actions.addCartAction(obj, onSuccessAddCart, onErrorAddCart);
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

  //Product search
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [searchData, setSearchData] = useState([])
  const handleSearch = (e) => {
    setIsSearch(true)
    let filterData = productDataAfterFilter.filter((data) => data?.title.toLowerCase().includes(search.toLowerCase()))
    setSearchData(filterData)
  }
  const handleSearchClear = () => {
    setIsSearch(false)
    setSearchData([])
    setSearch('')
  }
  const render = () => {
    if (productState.network && (loading)) {
      return (
        <View style={styles.indicator}>
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
    }
  }
  return (
    <SafeAreaView style={styles.listContainer}>
      {/* <SearchBarLocal
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        handleSearchClear={handleSearchClear}
      /> */}
      {!network?.isConnected && <NoInternet />}
      <KeyboardAwareFlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ zIndex: -1 }}
        data={isSearch ? searchData : productDataAfterFilter}
        renderItem={({ item }) => (
          <ProductListFilterItem
            item={item}
            dataUrl={API_CONSTANTS.IMG_PREFIX}
            onPress={handleProductDetail}
            handleAddCart={handleAddCart}
            handleAddBuying={handleAddBuyingClick}
          />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => isSearch ? null : handleFilterPagination()}
        ListFooterComponent={() => render()}
        ListEmptyComponent={() =>
          renderEmpty()
        }
      />
      <RBSheet
        ref={rBSheet}
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
            size={22}
            color="#000"
            onPress={() => handleAddBuyingPopUp()}
          />
        </View>
        <Text style={styles.listName}>{strings.common.selectBuyingList}</Text>
        <View style={styles.closeToggle}>
          <Icon
            name="close"
            type="antdesign"
            size={22}
            color="#000"
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

export default connect(null, mapDispatchToProps)(ProductListingFilterView);