/* eslint-disable prettier/prettier */
import React, { useState, useEffect, memo } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  AlertDialog,
} from '../../../components';
import { strings } from '../../../localization';
import FastImage from 'react-native-fast-image'
import GlobalStyle from '../../../style/globalstyle';
import { CustomQuantityInput, CustomUnitPrice } from '../../../components';
import InfoIcon from '../../../assets/images/information.png';
import CartIcon from '../../../assets/images/cart.png';
import { useSelector } from 'react-redux';
// import { styles } from '../buyingProductList.style';
import { getFormattedPrice, getPriceCommon } from '../../../utilities/utils';

function BuyingProductItem(props) {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [unitPrice, setUnitPrice] = useState(
    props?.data?.productUnit?.filter(
      (data) => data.id === props?.data?.defaultUnit
    )[0]
  );
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState();
  const network = useSelector(state => state.rootReducers?.productState.network);
  const [factoryUnit, setFactoryUnit] = useState();

  useEffect(() => {
    setCount(0);
  }, [props.reset]);

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
      } else if (parseFloat(array[i]) === search) {
        return i;
      }
    }

    return -1;
  }
  useEffect(() => {
    let priceLocal
    if (
      props?.data?.quantityRangeData?.length > 0 &&
      props?.data?.quantityRangePriceData?.length > 0
    ) {
      let priceIndex = findPrice(
        props?.data?.quantityRangeData,
        (count === 0 ? 1 : count) * parseFloat(unitPrice?.unitPrices)
      );
      if (priceIndex === -1) {
        if (count === 0) {
          priceLocal = parseFloat(
            props?.data?.quantityRangePriceData[
            props?.data?.quantityRangePriceData?.length - 1
            ]
          ) *
            1 *
            parseFloat(unitPrice?.unitPrices)
          setPrice(priceLocal);
        } else {
          priceLocal = parseFloat(
            props?.data?.quantityRangePriceData[
            props?.data?.quantityRangePriceData?.length - 1
            ]
          ) *
            count *
            parseFloat(unitPrice?.unitPrices)
          setPrice(priceLocal);
        }
        setFactoryUnit(
          props?.data?.quantityRangePriceData[
          props?.data?.quantityRangePriceData?.length - 1
          ]
        );
      } else {
        if (count === 0) {
          priceLocal = 1 *
            parseFloat(props?.data?.quantityRangePriceData[priceIndex]) *
            parseFloat(unitPrice?.unitPrices)
          setPrice(priceLocal);
        } else {
          priceLocal = count *
            parseFloat(props?.data?.quantityRangePriceData[priceIndex]) *
            parseFloat(unitPrice?.unitPrices)
          setPrice(priceLocal);
        }
        setFactoryUnit(props?.data?.quantityRangePriceData[priceIndex]);
      }
    } else {
      let unitValue = props?.data?.productUnit && props?.data?.productUnit?.filter((data) => data.id === props?.data?.defaultUnit)[0]?.unitPrices
      let dataPrice = props?.data?.sellPrice?.replace('CHF', '')
      let perUnitPrice = dataPrice / unitValue

      if (count === 0) {
        priceLocal = 1 * parseFloat(unitPrice?.unitPrices) * parseFloat(perUnitPrice)
        setPrice(priceLocal);
      } else {
        priceLocal = count * parseFloat(unitPrice?.unitPrices) * parseFloat(perUnitPrice)
        setPrice(priceLocal);
      }
    }
    if (count > 0) {
      props.handleCart(unitPrice, count, props?.data, priceLocal);
    }
  }, [count, unitPrice]);

  const toggleAlert = () => {
    setDeleteAlert(!deleteAlert);
  };
  const handleDeleteMethod = () => {
    setDeleteAlert(!deleteAlert);
    props.handleDeleteMethod(props.data, unitPrice?.id);
  };

  const getPrice = () => {
    return getFormattedPrice(price);
  };
  const getFactoryPrice = (data) => {
    return getFormattedPrice(parseFloat(data));
  };

  const showAlert = () => {
    return Alert.alert(
      "",
      props?.data?.productCurrentDayRule,
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.itemCard}>
          <View style={styles.itemInfo}>
            {props?.data?.promotionalProduct === 1 &&
              <View style={styles.upPro}>
                <Text style={[styles.addPro]}>A</Text>
              </View>
            }
            <Pressable onPress={() => network?.isConnected ? props.onPress(props?.data?.id) : alert(strings.common.offlineMessage)}>
              <FastImage
                source={{
                  uri: props?.dataUrl + '/' + props.data?.mainImage,
                }}
                style={styles.productImage}
                resizeMode="contain"
              />

            </Pressable>
            {props?.data?.newProduct === 1 &&
              <View style={styles.downPro}>
                <Text style={[styles.addPro]}>N</Text>
              </View>
            }
            <View style={styles.productInfo}>
              <Pressable onPress={() => network?.isConnected ? props.onPress(props?.data?.id) : alert(strings.common.offlineMessage)}>
                <Text style={styles.productName}>{props.data.title}</Text>
              </Pressable>
              <View style={styles.productActions}>
                {(props?.data?.promotionalProduct === 1) &&
                  <Text style={styles.promotionPerPrice} numberOfLines={1}>
                    {getFactoryPrice(props?.data?.listPrice)}
                  </Text>

                }
                <Text style={styles.productPrice}>{getPrice()}</Text>
                {props?.data?.productCurrentDayRule &&
                  <Pressable onPress={showAlert}>
                    <FastImage
                      style={[styles.productAdd, styles.productSeparate]}
                      resizeMode="contain"
                      source={InfoIcon} />
                  </Pressable>
                }
                <Pressable onPress={() => props.handleAddCart(props?.data, count, unitPrice, price)}>
                  <FastImage
                    style={[styles.productAdd, styles.productSeparate]}
                    resizeMode="contain"
                    source={CartIcon} />
                </Pressable>
                <Icon
                  size={(20)}
                  name="delete"
                  type="antdesign"
                  onPress={toggleAlert}
                  color="#E04D01CC"
                />
              </View>
            </View>
          </View>
          <View style={styles.itemActions}>
            <View style={styles.unitBox}>
              <CustomUnitPrice
                quantity={props?.data?.productUnit}
                defaultUnit={props?.data?.factoryUnitName}
                unitPrice={unitPrice}
                unitPriceName={unitPrice?.name}
                setUnitPrice={setUnitPrice}
                disable={false}
                id={props?.data?.id}
                item={props?.data}
                isBuying={true}
                cart={false}
                handleUpdateQuantity={props?.handleUpdateQuantity}
                unit={!(props?.data?.quantityRangeData?.length > 0 && props?.data?.quantityRangePriceData?.length > 0) ?
                  `${getPriceCommon(props?.data?.defaultPerPriceData)}/${props?.data?.factoryUnitName}`
                  :
                  `${getFactoryPrice(factoryUnit)?.replace('CHF', '')}/${props?.data?.factoryUnitName}`}
              />
            </View>
            <View style={styles.quantityBox}>
              <CustomQuantityInput
                unitPrice={unitPrice}
                count={count}
                setCount={setCount}
                minValue={0} />
            </View>
          </View>
        </View>
      </View>
      <AlertDialog
        visible={deleteAlert}
        toggleOverlay={toggleAlert}
        title={strings.common.delete}
        cancel={strings.actions.no}
        delete={strings.actions.yes}
        deleteMethod={handleDeleteMethod}
      />
    </View>
  );
}
export const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: (15),
  },
  itemCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E04D0133',
    paddingVertical: (10),
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: (40),
    height: (48),
    borderRadius: (2),
    marginRight: (16),
  },
  productInfo: {
    width: '75%',
  },
  productName: {
    color: '#222222',
    fontSize: (16),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingBottom: (12),
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    color: '#E04D01CC',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    backgroundColor: '#E04D011A',
    paddingHorizontal: (8),
    paddingVertical: (4),
    marginRight: (24),
    borderRadius: (4),
  },
  productSeparate: {
    marginRight: (35),
  },
  productAdd: {
    width: (24),
    height: (24),
  },
  addBuying: {
    position: 'absolute',
    top: (5),
    right: 0,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (15),
    width: '100%',
  },
  unitBox: {
    flex: 1,
  },
  quantityBox: {},
  promotionPerPrice: {
    color: '#E04D01CC',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginRight: (15),
    borderRadius: (2),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  upPro: {
    position: 'absolute',
    left: 1,
    top: 3,
    zIndex: 11111,
  },
  downPro: {
    position: 'absolute',
    left: 1,
    bottom: 0,
    zIndex: 11111,
  },
  addPro: {
    backgroundColor: '#780000',
    color: '#fff',
    fontSize: (12),
    fontFamily: GlobalStyle.fontSet.Poppins600,
    paddingHorizontal: (6),
    paddingVertical: (3),
    width: (20),
    height: (20),
    textAlign: 'center',
    borderRadius: (50),
  },
});

//export default memo(BuyingProductItem);
export default BuyingProductItem

