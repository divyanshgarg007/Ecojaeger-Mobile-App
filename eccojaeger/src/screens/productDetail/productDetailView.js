/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Alert, Pressable, Linking } from 'react-native';
import { CustomQuantityInput, CustomButton, ProductGraph, DietaryHabit, CustomUnitPrice } from '../../components';
import { RelatedItem } from './components';
import { styles } from './productDetail.style';
import { Toasts, BuyingModal, NoInternet } from '../../components';
import { Icon } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoIcon from '../../assets/images/information.png';
import { ActionCreators } from '../../redux/action';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image'
import StarIcon from '../../assets/images/star.png';
import { strings } from '../../localization';
import { API_CONSTANTS } from '../../constants/constants';
import { getFormattedPrice, getPriceCommon } from '../../utilities/utils';
import { NAVIGATION } from '../../constants';
import { SafeAreaView } from 'react-native';
function ProductDetailView(props) {
  const rBSheet = useRef();

  const [unitPrice, setUnitPrice] = useState(props?.route?.params?.data?.productUnit?.filter((data) => data.default === '1')[0]);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState();

  const [type, setType] = useState(null);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [addProductBuyingData, setAddProductBuying] = useState();
  const productState = useSelector(state => state.rootReducers?.productState);
  const authState = useSelector(state => state.rootReducers?.authState);
  const buyingState = useSelector((state) => state.rootReducers?.buyingState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  const [factoryUnit, setFactoryUnit] = useState()


  /////

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <>
          {authState?.signIn?.data?.data?.tokenNumber ?
            <Pressable onPress={() => onClickOpenBuyingList(props?.route?.params?.data.id, unitPrice?.id)}>
              <FastImage source={StarIcon} style={styles.iconSize} />
            </Pressable> : ''
          }
        </>
      ),
    });
  });

  useEffect(() => {
    if (props?.route?.params?.data?.quantityRangeData?.length > 0 && props?.route?.params?.data?.quantityRangePriceData?.length > 0) {
      let priceIndex = findPrice(props?.route?.params?.data?.quantityRangeData, count * parseFloat(unitPrice?.unitPrices))
      if (priceIndex === -1) {
        setPrice(parseFloat(props?.route?.params?.data?.quantityRangePriceData[props?.route?.params?.data?.quantityRangePriceData?.length - 1]) * count * parseFloat(unitPrice?.unitPrices))
        setFactoryUnit(props?.route?.params?.data?.quantityRangePriceData[props?.route?.params?.data?.quantityRangePriceData?.length - 1])
      } else {
        setPrice(count * parseFloat(props?.route?.params?.data?.quantityRangePriceData[priceIndex]) * parseFloat(unitPrice?.unitPrices))
        setFactoryUnit(props?.route?.params?.data?.quantityRangePriceData[priceIndex])
      }
    } else {
      let dataPrice = props?.route?.params?.data?.sellPrice?.replace('CHF', '')
      if (unitPrice?.default === "1") {
        setPrice(count * parseFloat(dataPrice));
      }
      else {
        let unitValue = props?.route?.params?.data?.productUnit && props?.route?.params?.data?.productUnit?.filter((data) => data.default === '1')[0]?.unitPrices
        let perUnitPrice = dataPrice / unitValue
        setPrice(count * parseFloat(unitPrice?.unitPrices) * parseFloat(perUnitPrice));
      }
    }

  }, [count, unitPrice]);

  function findPrice(array, search) {
    var indexes = [],
      len = array.length,
      i,
      index = array.indexOf(search);

    if (~index) {
      return index;
    }

    if (search < array[0]) {
      return -1;
    }

    for (i = 1; i < len; i++) {
      if (parseFloat(array[i]) > search) {
        return i - 1;
      }
      else if (parseFloat(array[i]) === search) {
        return i;
      }
    }

    return -1;
  }

  //Add cart
  const onSuccessAddCart = (data) => {
    setAlert(true);
    setMessage(strings.common.addToCartSuccess);
    props.navigation.navigate("tab-cart")
    setType('success');
  };
  const onErrorAddCart = (data) => {
    setAlert(true);
    setMessage(data.message);
    setType('error');
  };
  const handleAddCart = () => {
    let obj = {
      ids: props?.route?.params?.data?.id,
      quantity: count,
      unitId: unitPrice?.id,
    };
    props.actions.addCartAction(obj, onSuccessAddCart, onErrorAddCart);
  };
  const handleAddCartRelatedItem = (item) => {
    let obj = {
      ids: item?.ids,
      quantity: item?.quantity,
      unitId: item?.unitId,
    };
    props.actions.addCartAction(obj, onSuccessAddCart, onErrorAddCart);
  };
  const handleHide = () => {
    setAlert(false);
    setMessage('');
    setType(null);
  };

  const getPrice = () => {
    return getFormattedPrice(price)
  };
  const getFactoryPrice = (data) => {
    return getFormattedPrice(parseFloat(data))
  };
  const showAlert = () => {
    return Alert.alert(
      "",
      props?.route?.params?.data?.currentDayProductRule,
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  ///Add product to buying list
  const onClickOpenBuyingList = (productId, unitId) => {
    if (productState.network && !buyingState?.buyingList?.data) {
      props.actions.buyingListAction();
    }
    setAddProductBuying({ productId: productId, unitId: unitId });
    rBSheet.current.open();
  };

  const onSuccessAddProductBuying = (data, obj) => {
    setAlert(true);
    setMessage(data?.message);
    setType('success');
  };

  const onErrorAddProductBuying = (data) => {
    setAlert(true);
    setMessage(data?.message);
    setType('error');
  };

  const handleAddBuying = (buyingId) => {
    let obj = {
      productId: addProductBuyingData.productId,
      id: buyingId,
      unitId: unitPrice?.id,
    };
    rBSheet.current.close();
    props.actions.buyingAddProductAction(obj, onSuccessAddProductBuying, onErrorAddProductBuying);
  };

  const showGraph = () => {
    if (props.route.params.data?.seasonCh?.length > 0 || props.route.params.data?.seasonEu?.length > 0 || props.route.params.data?.seasonOs?.length > 0) {
      return true
    }

    return false
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
  ///Product details
  const onSuccessProductDetail = (data) => {
    props.navigation.push(NAVIGATION.productDetail, { data: data?.data?.product });
  };
  const onErrorProductDetail = (data) => {
    //console.log(data)
  };
  const handleProductDetail = (data) => {
    props.actions.productDetailsAction(data, onSuccessProductDetail, onErrorProductDetail);
  };

  const showCol = (text) => {
    if (text === "Season Tip" || text === "Saison-Tipp" || text === "Entfernung Anbaugebiet, Produktion" || text === "Distance Producing Region, Production") {
      return true
    }
    return false
  }

  let infoDetailsData = Object.entries(props?.route?.params?.data?.infoDetails)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {!network?.isConnected && <NoInternet />}
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <ScrollView>
        <View style={styles.productDetailContainer}>
          <View style={styles.imageCardBox}>
            <FastImage
              style={styles.productImage}
              resizeMode="contain"
              source={{ uri: `${API_CONSTANTS.IMG_PREFIX}` + '/' + props?.route?.params?.data?.mainImage }}
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{props?.route?.params?.data?.title}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {(props?.route?.params?.data?.promotionalProduct === 1) &&
                <Text style={styles.promotionPerPrice} numberOfLines={1}>
                  {getFactoryPrice(props?.route?.params?.data?.listPrice)}
                </Text>

              }
              <Text style={styles.productPrice}>{getPrice()}</Text>
            </View>
            <View style={styles.itemActions}>
              <View style={styles.unitBox}>
                <CustomUnitPrice
                  quantity={props?.route?.params?.data?.productUnit}
                  defaultUnit={props?.route?.params?.data?.factoryUnitName}
                  unitPrice={unitPrice}
                  unitPriceName={unitPrice?.name}
                  setUnitPrice={setUnitPrice}
                  disable={false}
                  id={props?.route?.params?.data?.id}
                  item={props?.route?.params?.data}
                  unit={!(props?.route?.params?.data?.quantityRangeData?.length > 0 && props?.route?.params?.data?.quantityRangePriceData?.length > 0) ?
                    `${getPriceCommon(props?.route?.params?.data?.defaultPerPriceData)}/${props?.route?.params?.data?.factoryUnitName}`
                    :
                    `${getFactoryPrice(factoryUnit)?.replace('CHF', '')}/${props?.route?.params?.data?.factoryUnitName}`}
                />
              </View>
              <View style={styles.quantityBox}>
                <CustomQuantityInput
                  unitPrice={unitPrice}
                  count={count}
                  setCount={setCount}
                  minValue={0}
                />
              </View>
            </View>
            <View style={styles.aboutInfo}>
              <View style={styles.aboutProduct}>
                <View style={styles.specificationHead}>
                  <Text style={styles.aboutProText}>{strings.common.productSpecifications}</Text>
                  {props?.route?.params?.data?.currentDayProductRule.length > 0 &&
                    <Pressable onPress={showAlert}>
                      <FastImage
                        style={styles.productAdd}
                        resizeMode="contain"
                        source={InfoIcon} />
                    </Pressable>
                  }
                </View>
                {props?.route?.params?.data?.itemNumber.length > 0 &&
                  <View style={styles.addBreak}>
                    <Text style={styles.addTextHeading}>{strings.common.artcileNo}:</Text>
                    <Text style={styles.descText}>{props?.route?.params?.data?.itemNumber}</Text>
                  </View>
                }
                {props?.route?.params?.data?.origin.length > 0 &&
                  <View style={styles.addBreak}>
                    <Text style={styles.addTextHeading}>{strings.common.origin}:</Text>
                    <Text style={styles.descText}>{props?.route?.params?.data?.origin}</Text>
                  </View>
                }
                {props?.route?.params?.data?.packagingInfo.length > 0 &&
                  <View style={styles.addBreak}>
                    <Text style={styles.addTextHeading}>{strings.common.packagingInfo}:</Text>
                    <Text style={styles.descText}>{props?.route?.params?.data?.packagingInfo}</Text>
                  </View>
                }
                {infoDetailsData.map((data, index) => {
                  if (showCol(data[0])) {
                    return (
                      <View key={index} style={[styles.addBreakCol]}>
                        <Text style={styles.addTextHeadingCol}>{data[0]}:</Text>
                        <Text style={styles.descTextCol}>{data[1]}</Text>
                      </View>
                    )
                  } else {
                    return <View key={index} style={styles.addBreak}>
                      <Text style={styles.addTextHeading}>{data[0]}:</Text>
                      <Text style={styles.descText}>{data[1]}</Text>
                    </View>
                  }
                })}

                {props?.route?.params?.data?.bestBefore.length > 0 &&
                  <View style={styles.addBreak}>
                    <Text style={styles.addTextHeading}>{strings.common.bestBefore}:</Text>
                    <Text style={styles.descText}>{props?.route?.params?.data?.bestBefore} {strings.common.days}</Text>
                  </View>
                }

              </View>
              {props?.route?.params?.data?.description.length > 0 &&
                <View style={styles.aboutProduct}>
                  <Text style={styles.aboutProText}>{strings.common.aboutProduct}</Text>
                  <Text style={styles.descText}>{props?.route?.params?.data?.description}</Text>
                </View>
              }
              {props?.route?.params?.data?.features.length > 0 &&
                <View style={styles.aboutProduct}>
                  <Text style={styles.aboutProText}>{strings.common.features}</Text>
                  <Text style={styles.descText}>{props?.route?.params?.data?.features}</Text>
                </View>
              }
              {(props?.route?.params?.data?.externalLink && props?.route?.params?.data?.externalLink.length > 0) &&
                <Pressable style={styles.aboutProduct}>
                  <Text style={styles.detailsLink}
                    onPress={() => Linking.openURL(props?.route?.params?.data?.externalLink)}>
                    {strings.common.seeProductDetails}{' ->'}
                  </Text>
                </Pressable>
              }
              {(props?.route?.params?.data?.pdfDocument && props?.route?.params?.data?.pdfDocument.length > 0) &&
                <Pressable style={styles.aboutProduct}>
                  <Text style={styles.detailsLink}
                    onPress={() => Linking.openURL(`${API_CONSTANTS.IMG_PREFIX}` + props?.route?.params?.data?.pdfDocument)}>
                    {strings.common.itemSheetSpecification}{' ->'}
                  </Text>
                </Pressable>
              }
            </View>
          </View>
        </View>
        {authState?.signIn?.data?.data?.tokenNumber &&
          <View style={styles.addCartBox}>
            <CustomButton
              buttonStyle={styles.createBtn}
              titleStyle={styles.titleLight}
              title={strings.actions.addCart}
              onPress={() => handleAddCart()}
            />
          </View>
        }
        <RBSheet
          ref={rBSheet}
          height={(250)}
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
              color="#000"
              onPress={() => handleAddBuyingPopUp()}
            />
          </View>
          <Text style={styles.listName}>{strings.common.selectBuyingList}</Text>
          <View style={styles.closeToggle}>
            <Icon
              name="close"
              type="antdesign"
              size={(22)}
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
              );
            })

            }
          </ScrollView>
        </RBSheet>
        {(props?.route?.params?.data?.glutenfree ||
          props?.route?.params?.data?.laktosefrei ||
          props?.route?.params?.data?.tk ||
          props?.route?.params?.data?.vegan ||
          props?.route?.params?.data?.veggie) &&
          <View style={styles.addCartBox}>
            <Text style={styles.aboutProText}>{strings.common.dietaryHabit}</Text>
            <DietaryHabit data={props?.route?.params?.data} />
          </View>
        }

        {
          showGraph() &&
          <View style={styles.addCartBox}>
            <Text style={styles.aboutProText}>{strings.common.seasonality}</Text>
            <ProductGraph data={props?.route?.params?.data} />
          </View>
        }
        {props?.route?.params?.data?.realtedProducts?.length > 0 &&
          <View style={styles.relatedProduct}>
            <Text style={styles.relatedText}>{strings.common.relatedProducts}</Text>
            <RelatedItem
              item={props?.route?.params?.data?.realtedProducts}
              setUnitPrice={setUnitPrice}
              unitPrice={unitPrice}
              handleAddCart={handleAddCartRelatedItem}
              onClickOpenBuyingList={onClickOpenBuyingList}
              handleProductDetail={handleProductDetail}
            />
          </View>
        }
        <BuyingModal
          toggleOverlay={toggleBuyingAction}
          visible={isShowBuyingModal}
          action={'add'}
          handleAction={handleAddBuyingAction}
          value={valueBuying}
          setValue={setValueBuying}
        />
      </ScrollView>

    </SafeAreaView>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(ProductDetailView);
