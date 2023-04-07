/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
// import { SearchBar } from '../../components';
import { CategoryItem, SubCategories } from './components';
import { styles } from './categoryProductList.style';
import { NAVIGATION } from '../../constants';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { EmptyMessage } from '../../components';
import { Toasts, BuyingModal } from '../../components';
import BackIcon from '../../assets/images/back.png';
import FilterIcon from '../../assets/images/filter.png';
import { strings } from '../../localization';
import { API_CONSTANTS } from '../../constants/constants';
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from 'react-native-fast-image'

function CategoriesProductListView(props) {
  const rBSheet = useRef();
  const [productSubCategory, setProductSubCategoryData] = useState([]);
  const [productSubFilter, setProductSubFilter] = useState([])
  const [metaData, setMetaData] = useState([])
  const [category, setCategory] = useState()
  const [page, setPage] = useState(0)
  const [isSelectedChild, setSelectionChild] = useState([]);
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('')
  const [addProductBuyingData, setAddProductBuying] = useState()

  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const productState = useSelector(state => state.rootReducers?.productState);

  const [filterData, setFilterData] = useState({
    'producers': [],
    'Brand': [],
    'Origin': [],
    'Category': '',
    'Glutenfree': 0,
    'Laktosefrei': 0,
    'New Product': 0,
    'TK': 0,
    'Vegan': 0,
    'Veggie': 0,
  })
  const onSuccessSubCategory = (data) => {
    setLoading(false)
    setProductSubCategoryData(data?.data?.products)
    setProductSubFilter(data?.data?.filters)
    setMetaData(data?.data)
  }
  const onError = (data) => {
    setLoading(false)
    setProductSubCategoryData([])
  }
  useEffect(() => {
    setLoading(true)
    setPage(page + 1)
    let obj = {
      producers: [],
      Brand: [],
      limit: 12,
      page: page + 1,
      category: props?.route?.params?.id,
      Origin: [],
      Glutenfree: 0,
      Laktosefrei: 0,
      newProduct: 0,
      TK: 0,
      vegan: 0,
      veggie: 0
    }
    setCategory(props?.route?.params?.id)
    props.actions.productListSubCategoryAction(obj, onSuccessSubCategory, onError);
  }, []);

  const onSuccessSubCategoryProduct = (data, page) => {
    if (page === 0) {
      setProductSubCategoryData(data?.data?.products)
    } else {
      setProductSubCategoryData([].concat(productSubCategory, data?.data?.products))
    }
    setMetaData(data?.data)
    setLoading(false)
  }
  const handleChangeCategory = (data) => {
    setLoading(true)
    setProductSubCategoryData([])
    setPage(1)
    let obj = {
      limit: 12,
      page: 1,
      category: data?.id,
      producers: filterData['producers'],
      Brand: filterData['Brand'],
      Origin: filterData['Origin'],
      Glutenfree: filterData['Glutenfree'],
      Laktosefrei: filterData['Laktosefrei'],
      newProduct: filterData['New Product'],
      TK: filterData['TK'],
      vegan: filterData['Vegan'],
      veggie: filterData['Veggie']
    }
    setCategory(data?.id)
    props.actions.productListSubCategoryAction(obj, onSuccessSubCategoryProduct, onError, 0);
  }
  const handleFilter = (filterData, isSelectedChild) => {
    setLoading(true)
    setPage(1)
    let obj = {
      limit: 12,
      page: 1,
      category: category,
      producers: filterData['producers'],
      Brand: filterData['Brand'],
      Origin: filterData['Origin'],
      Glutenfree: filterData['Glutenfree'],
      Laktosefrei: filterData['Laktosefrei'],
      newProduct: filterData['New Product'],
      TK: filterData['TK'],
      vegan: filterData['Vegan'],
      veggie: filterData['Veggie']
    }
    setFilterData(filterData)
    setSelectionChild(isSelectedChild)
    props.actions.productListSubCategoryAction(obj, onSuccessSubCategoryProduct, onError, 0);
  }
  const handlePagination = () => {
    if (metaData?.paginationVariables?.totalCount > productSubCategory?.length && !loading) {
      setLoading(true)
      setPage(page + 1)
      let obj = {
        limit: 12,
        page: page + 1,
        category: category,
        producers: filterData['producers'],
        Brand: filterData['Brand'],
        Origin: filterData['Origin'],
        Glutenfree: filterData['Glutenfree'],
        Laktosefrei: filterData['Laktosefrei'],
        newProduct: filterData['New Product'],
        TK: filterData['TK'],
        vegan: filterData['Vegan'],
        veggie: filterData['Veggie']
      }
      props.actions.productListSubCategoryAction(obj, onSuccessSubCategoryProduct, onError, page + 1);
    }
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

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <Pressable onPress={() => props.navigation.navigate(NAVIGATION.categoryFilter,
          {
            filter: productSubFilter,
            category: false,
            handleFilter: handleFilter,
            isSelectedChild: isSelectedChild,
            filterData: filterData
          })}>
          <FastImage source={FilterIcon} style={styles.iconSize} />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable onPress={() => props.navigation.goBack()}>
          <FastImage source={BackIcon} style={styles.iconSize} />
        </Pressable>
      ),
      headerTitle: () => {
        return (
          <Text style={styles.navigatorText}>{props.route.params.name}</Text>
        );
      },
    });
  });
  const render = () => {
    if (loading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      )
    }
  }
  const renderEmpty = () => {
    if (!loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <EmptyMessage title={strings.common.noData} />
        </View>
      );
    }
  }
  ///Product details
  const onSuccessProductDetail = (data) => {
    props.navigation.navigate(NAVIGATION.productDetail, { data: data?.data?.product })
  }
  const onErrorProductDetail = (data) => {
    //console.log(data)
  }
  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail)
  }
  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

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
    props.actions.buyingAddProductAction(obj, onSuccessAddProductBuying, onErrorAddProductBuying)
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
  return (
    <>
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <View style={styles.homeContainer}>
        <SubCategories
          item={productSubFilter[0]}
          handleChangeCategory={handleChangeCategory}
        />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={loading && productSubCategory?.length === 0 ? [] : productSubCategory}
          renderItem={({ item }) => (
            <CategoryItem
              dataUrl={API_CONSTANTS.IMG_PREFIX}
              item={item}
              onPress={handleProductDetail}
              handleAddCart={handleAddCart}
              handleAddBuying={handleAddBuyingClick}
            />
          )}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={() => handlePagination()}
          ListFooterComponent={() => (
            render()
          )}
          ListEmptyComponent={() =>
            renderEmpty()
          }
        />
      </View>

      <RBSheet
        ref={rBSheet}
        // height={300}
        openDuration={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 30,
            paddingTop: 20,
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
    </>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoriesProductListView);
