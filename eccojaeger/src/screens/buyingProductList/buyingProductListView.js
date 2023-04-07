/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Alert, Pressable, SafeAreaView, Linking, Dimensions, TouchableOpacity } from 'react-native';
import { BuyingProductItem } from './components';
import { styles } from './buyingProductList.style';
import { BackButton, CustomButton } from '../../components';
import { NAVIGATION } from '../../constants';
import AddIcon from '../../assets/images/add.png';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { Toasts, EmptyMessage, NoInternet } from '../../components';
import { strings } from '../../localization';
import { API_CONSTANTS } from '../../constants/constants';
import { Header } from './components';
import FastImage from 'react-native-fast-image'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';


const HEIGHT = Dimensions.get("screen").height

function BuyingProductListView(props) {
  const [productData, setProductData] = useState([]);
  ///Sorting by alphabet
  const [sort, setSort] = useState(0);
  const [sortedData, setSortedData] = useState([])

  const [buyingId, setBuyingID] = useState(props.route.params.data.data.buyingId);
  const [alert, setAlert] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState('');
  const [reset, setReset] = useState(false);
  const [addCartProducts, setAddCartProducts] = useState([]);
  //const [networkStatus, setNetworkStatus] = useState({});

  const network = useSelector(state => state.rootReducers?.productState.network);
  const cartList = useSelector(state => state.rootReducers?.cartState.cartList)
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <Pressable onPress={() => network?.isConnected ? props.navigation.navigate(NAVIGATION.productListing, { handleAddBuying: handleAddBuying, buyingId: props.route.params?.data?.data?.buyingId }) : showAlert()}>
          <FastImage source={AddIcon} style={styles.addIcon} />
        </Pressable>
      ),
      headerLeft: () => (
        <BackButton onClick={() => props.navigation.goBack()} style={styles.backIcon} />
      ),
      headerTitle: () => {
        return (
          <Text style={styles.navigatorText}>{props.route.params.buyingDataItem?.name}</Text>
        );
      },
    });
  })

  useEffect(() => {
    var objs = props.route.params.data.data.products
    objs.map((item, index) => {
      item.key = `item-${index}`
    })
    setProductData(objs)
  }, [])

  useEffect(() => {
    //console.log("addCartProducts: ", addCartProducts)
  }, [addCartProducts])

  useEffect(() => {
    if (sort === 1) {
      let currentData = [...productData]
      currentData.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      setSortedData(currentData)
    }
  }, [sort]);

  useEffect(() => {
    let buyingDataItem = buyingState?.item[buyingId]
    if (buyingDataItem) {
      if (buyingDataItem?.data?.products) {
        var objs = buyingDataItem?.data?.products
        objs.map((item, index) => {
          item.key = `item-${index}`
        })
        setProductData(objs)
      }
    }
  }, [buyingState])

  ///Delete product from buying list
  const onSuccessDeleteProduct = (data, id) => {
    setProductData(productData.filter((data) => data.id !== id));
    setAlert(true);
    setMessage(data.message);
    setType('success')
  }

  const onErrorDeleteProduct = (data) => {
    setAlert(true);
    setMessage(data.message);
    setType('error');
  };

  const handleDeleteMethod = (data, unitId) => {
    let obj = {
      id: buyingId,
      productId: data.id,
      unitId: unitId,
    };
    props.actions.buyingProductRemoveAction(obj, onSuccessDeleteProduct, onErrorDeleteProduct);
  };

  //Buying product list
  const onSuccessBuyingProduct = (data, buyingData) => {
    setProductData(data?.data?.products);
  };

  const onErrorBuyingProduct = (data) => {
    //console.log(data);
  };

  const handleBuyingProductList = (item) => {
    props.actions.buyingProductListAction(item, sort, onSuccessBuyingProduct, onErrorBuyingProduct);
  };

  ///Add product in buying list
  const onSuccessAddProductBuying = (data, obj) => {
    handleBuyingProductList(obj);
    setAlert(true);
    setMessage(data.message);
    setType('success');
  };

  const onErrorAddProductBuying = (data) => {
    setAlert(true);
    setMessage(data.message);
    setType('error');
  };

  const handleAddBuying = (data, buyingId, unitId) => {
    let obj = {
      productId: data?.id,
      id: buyingId,
      unitId: unitId?.id,
    };
    props.actions.buyingAddProductAction(obj, onSuccessAddProductBuying, onErrorAddProductBuying, props.route.params.buyingData);
  };

  ///Product details
  const onSuccessProductDetail = (data) => {
    props.navigation.navigate(NAVIGATION.productDetail, { data: data?.data?.product });
  };

  const onErrorProductDetail = (data) => {
    //console.log(data);
  };

  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail);
  };

  ///Add product to buying list
  const onSuccessAddCartBuying = (data) => {
    setAlert(true);
    setMessage(strings.common.addToCartSuccess);
    setType('success');
    setAddCartProducts([]);
    //setReset(true);
    var pdata = productData;
    setProductData([]);

    props.navigation.navigate('tab-cart');
    setTimeout(() => {
      setProductData([...pdata]);
    }, 500);
  };

  const onErrorAddCartBuying = (data) => {
    setAlert(true);
    setMessage(data.message);
    setType('error');
  };

  const handleAddCartBuying = (data) => {
    let bodyFormData = new FormData()
    let countNonZero = false
    addCartProducts.forEach(data => {
      bodyFormData.append('products[]', data?.productId)
      bodyFormData.append('product-unit[]', data?.buyingId)
      bodyFormData.append('product-qty[]', data?.count)
      if (data.count >= 1 && !countNonZero) {
        countNonZero = true
      }
    })
    if (countNonZero) {
      if (network?.isConnected) {
        props.actions.addCartBuyingAction(bodyFormData, onSuccessAddCartBuying, onErrorAddCartBuying);
      } else {
        //store item in offline redux
        var objs = addCartProducts.filter((item) => item.count > 0)
        if (objs.length > 0) {
          objs.map((obj) => {
            obj.item["type"] = "offline"
            obj.item["unit"] = obj.unit
            obj.item["count"] = obj.count
            obj.item["totalPrice"] = `CHF ${obj.totalPriceNumeric}`
            obj.item["totalPriceNumeric"] = obj.totalPriceNumeric
          })
          props.actions.addItemToCartOffline(objs)
          onSuccessAddCartBuying()
        }
      }
    } else {
      setAlert(true)
      setMessage(strings.common.selectQuantity)
      setType('error')
    }
  }

  const handleCart = (unit, count, item, price) => {
    if (count > 0) {
      let productAvaialbe = false;
      let a = addCartProducts;
      a.forEach(data => {
        if (data.productId === item.id && unit.name === data.unit) {
          data.count = count;
          data.buyingId = unit.id;
          data.totalPriceNumeric = (price).toFixed(2)
          productAvaialbe = true;
        }
      });
      if (productAvaialbe === true) {
        setAddCartProducts(a);
      } else {
        let arr = [...addCartProducts, {
          totalPriceNumeric: (price).toFixed(2),
          unit: unit.name, item: item, unitId: unit.id,
          productId: item.id, buyingId: unit.id, count: count
        }]
        setAddCartProducts(arr);
      }
    }
  }

  const handleHide = () => {
    setAlert(false);
    setMessage('');
    setType(null);
  };

  // Add Cart Item
  const handleAddCart = (item, count, unit, price) => {
    if (count > 0) {
      let obj = {

        unit: unit.name,
        item: item,
        ids: item.id,
        quantity: count,
        unitId: unit.id,
      };
      if (network?.isConnected) {
        props.actions.addCartAction(obj, onSuccessAddCart, onErrorAddCart);
      } else {
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

  const onSuccessBuyingOrderChange = (data) => {
    //console.log("data:", data);
  };

  const onErrorBuyingOrderChange = (data) => {
    //console.log(data);
  };

  const onItemDragEnd = ({ data, from, to }) => {
    setProductData(data);
    var formData = new FormData();
    formData.append('id', props.route.params?.data?.data?.buyingId);
    data.map((obj) => {
      formData.append('productIds[]', obj?.id);
      formData.append('unitIds[]', obj?.defaultUnit);
    });
    props?.actions?.buyingChangeOrderingAction(formData, onSuccessBuyingOrderChange, onErrorBuyingOrderChange, data, props.route.params?.data?.data?.buyingId);
  };

  ///Download cart pdf
  const onSuccessDownload = (data) => {
    let url = `http://${data?.data}`;
    Linking.openURL(url);
  };

  const onErrorDownload = (data) => {
    //console.log(data);
  };

  const handleDownload = () => {
    props.actions.downloadBuyingAction(props.route.params?.data?.data?.buyingId, onSuccessDownload, onErrorDownload);
  };

  ///Update product quantity from buying list

  const onSuccessQuantityUpdate = (data) => {
    //console.log('data', data)
  };

  const onErrorQuantityUpdate = (data) => {
    //console.log(data);
  };
  const handleUpdateQuantity = (item, data, oldUnit) => {
    let bodyFormData = new FormData()
    bodyFormData.append('buyingId', buyingId)
    bodyFormData.append('unitId', data?.id)
    bodyFormData.append('productId', item?.id)
    bodyFormData.append('oldUnitId', oldUnit?.id)
    let obj = {
      id: buyingId
    }
    props.actions.quantityUpdateBuyingAction(bodyFormData, onSuccessQuantityUpdate, onErrorQuantityUpdate, obj);
  };


  const showAlert = () => {
    return Alert.alert(
      "Alert",
      strings.common.offlineMessage,
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  const renderEmpty = () => {
    return (
      <View style={{ height: HEIGHT - 100, alignItems: 'center', justifyContent: 'center' }}>
        <EmptyMessage title={strings.common.noData} />
      </View>
    );
  };

  // const renderItem = useCallback(
  //   ({ item, index, drag, isActive }) => {
  //     return (
  //       <ScaleDecorator>
  //         <Pressable
  //           onLongPress={drag}
  //           disabled={isActive}
  //           style={[
  //             { backgroundColor: isActive ? '#e7e7e7' : '#fff' },
  //           ]}
  //         >
  //           <BuyingProductItem
  //             dataUrl={API_CONSTANTS.IMG_PREFIX}
  //             data={item}
  //             handleDeleteMethod={handleDeleteMethod}
  //             onPress={handleProductDetail}
  //             handleCart={handleCart}
  //             reset={reset}
  //             handleAddCart={handleAddCart}
  //             handleUpdateQuantity={handleUpdateQuantity}
  //           />
  //         </Pressable>
  //       </ScaleDecorator>
  //     );
  //   },
  //   []
  // );

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            { backgroundColor: isActive ? '#e7e7e7' : '#fff' },
          ]}
        >
          <BuyingProductItem
            dataUrl={API_CONSTANTS.IMG_PREFIX}
            data={item}
            handleDeleteMethod={handleDeleteMethod}
            onPress={handleProductDetail}
            handleCart={handleCart}
            reset={reset}
            handleAddCart={handleAddCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.productlistContainer}>
      {!network?.isConnected && <NoInternet />}
      <View style={{ flex: 1 }}>

        <DraggableFlatList
          ListHeaderComponent={() => productData?.length > 0 &&
            <Header
              setSort={setSort}
              sort={sort}
            />}
          // contentContainerStyle={{
          //   flexGrow: 1
          // }}
          initialNumToRender={6}
          data={sort ? sortedData : productData}
          onDragEnd={onItemDragEnd}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          renderItem={renderItem}
          ListEmptyComponent={() =>
            renderEmpty()
          }
        />
      </View>

      <View style={styles.buyingListActions}>
        {productData?.length > 0 &&
          <View style={styles.listActionsCheckout}>
            <CustomButton
              title={strings.actions.addCart}
              buttonStyle={styles.btnGreen}
              titleStyle={styles.titleLight}
              onPress={() => handleAddCartBuying()}
            />
          </View>
        }

      </View>
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
    </SafeAreaView>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(BuyingProductListView);
