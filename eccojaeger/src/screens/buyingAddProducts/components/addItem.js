/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import StarIcon from '../../../assets/images/star.png';
import InfoIcon from '../../../assets/images/information.png';
import CartIcon from '../../../assets/images/cart.png';
import GlobalStyle from '../../../style/globalstyle';
import { CustomQuantityInput, CustomUnitPrice } from '../../../components';
import { useSelector } from 'react-redux';
import { strings } from '../../../localization';
import { getFormattedPrice, getPriceCommon } from '../../../utilities/utils';
import FastImage from 'react-native-fast-image'

export default function AddItem(props) {
  const network = useSelector(state => state.rootReducers?.productState.network);
  const [unitPrice, setUnitPrice] = useState(props?.item?.productUnit && props?.item?.productUnit?.filter((data) => data.default === '1')[0]);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState();
  const [selectedBuyingData, setSelectedBuyingData] = useState(false)
  const authState = useSelector(state => state.rootReducers?.authState);
  const [factoryUnit, setFactoryUnit] = useState()

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
  useEffect(() => {
    if (props?.item?.quantityRangeData?.length > 0 && props?.item?.quantityRangePriceData?.length > 0) {
      let priceIndex = findPrice(props?.item?.quantityRangeData, count * parseFloat(unitPrice?.unitPrices))
      if (priceIndex === -1) {
        setPrice(parseFloat(props?.item?.quantityRangePriceData[props?.item?.quantityRangePriceData?.length - 1]) * count * parseFloat(unitPrice?.unitPrices))
        setFactoryUnit(props?.item?.quantityRangePriceData[props?.item?.quantityRangePriceData?.length - 1])
      } else {
        setPrice(count * parseFloat(props?.item?.quantityRangePriceData[priceIndex]) * parseFloat(unitPrice?.unitPrices))
        setFactoryUnit(props?.item?.quantityRangePriceData[priceIndex])
      }
    } else {
      let dataPrice = props?.item?.sellPrice?.replace('CHF', '')

      if (unitPrice?.default === "1") {
        setPrice(count * parseFloat(dataPrice));
      }
      else {
        let unitValue = props?.item?.productUnit && props?.item?.productUnit?.filter((data) => data.default === '1')[0]?.unitPrices
        let perUnitPrice = dataPrice / unitValue
        setPrice(count * parseFloat(unitPrice?.unitPrices) * parseFloat(perUnitPrice));
      }
    }
  }, [count, unitPrice]);

  const handleAddBuying = () => {
    setSelectedBuyingData(true)
    if (network?.isConnected) {
      props.handleAddBuying(props?.item, unitPrice)
    } else {
      alert('You are offline.')
    }

  }

  const getPrice = () => {
    return getFormattedPrice(price)
  };

  const getFactoryPrice = (data) => {
    return getFormattedPrice(parseFloat(data))
  };

  const showAlert = () => {
    return Alert.alert(
      "",
      props?.item?.productCurrentDayRule,
      [
        {
          text: 'OK',
        },
      ],
    );
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemCard}>
        <View style={styles.itemInfo}>
          {props.item.seasonal === true &&
            <View style={styles.productBadge}>
              <Text style={styles.badgeName} numberOfLines={1}>{strings.common.seasonal}</Text>
            </View>
          }
          {props?.item?.promotionalProduct === 1 &&
            <View style={styles.upPro}>
              <Text style={[styles.addPro]}>A</Text>
            </View>
          }
          <Pressable onPress={() => network?.isConnected ? props.onPress(props?.item?.id) : alert(strings.common.offlineMessage)}>
            <FastImage
              style={styles.productImage}
              resizeMode="contain"
              source={{
                uri: props?.dataUrl + '/' + props.item?.mainImage,
              }} />
          </Pressable>
          {props?.item?.newProduct === 1 &&
            <View style={styles.downPro}>
              <Text style={[styles.addPro]}>N</Text>
            </View>
          }
          <View style={styles.productInfo}>
            <Pressable onPress={() => network?.isConnected ? props.onPress(props?.item?.id) : alert(strings.common.offlineMessage)}>
              <Text style={styles.productName}>{props.item.title}</Text>
            </Pressable>
            <View style={styles.productActions}>
              {(props?.item?.promotionalProduct === 1) &&
                <Text style={styles.promotionPerPrice} numberOfLines={1}>
                  {getFactoryPrice(props?.item?.listPrice)}
                </Text>

              }
              <Text style={styles.productPrice}>{getPrice()}</Text>
              {props?.item?.productCurrentDayRule &&
                <Pressable onPress={showAlert}>
                  <FastImage
                    style={[styles.productAdd, styles.productSeparate]}
                    resizeMode="contain"
                    source={InfoIcon} />
                </Pressable>
              }
              <Pressable onPress={() => props.handleAddCart(props?.item, count, unitPrice, price)}>
                <FastImage
                  style={styles.productAdd}
                  resizeMode="contain"
                  source={CartIcon} />
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.addBuying} onPress={() => handleAddBuying()}>
            <FastImage
              style={styles.productAdd}
              resizeMode="contain"
              source={StarIcon} />
          </Pressable>
        </View>
        <View style={styles.itemActions}>
          <View style={styles.unitBox}>
            <CustomUnitPrice
              quantity={props?.item?.productUnit}
              defaultUnit={props?.item?.factoryUnitName}
              unitPrice={unitPrice}
              unitPriceName={unitPrice?.name}
              setUnitPrice={setUnitPrice}
              disable={false}
              id={props?.item?.id}
              item={props?.item}
              cart={false}
              unit={!(props?.item?.quantityRangeData?.length > 0 && props?.item?.quantityRangePriceData?.length > 0) ?
                `${getPriceCommon(props?.item?.defaultPerPriceData)}/${props?.item?.factoryUnitName}`
                :
                `${getFactoryPrice(factoryUnit)?.replace('CHF', '')}/${props?.item?.factoryUnitName}`}
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
      </View>
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
    borderRadius: 2,
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
  productBadge: {
    position: 'absolute',
    top: (0),
    left: (0),
    zIndex: 1111,
  },
  badgeName: {
    backgroundColor: '#009640',
    color: '#fff',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingHorizontal: (10),
    fontSize: (12),
    borderRadius: (3),
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
  promotionPerPrice: {
    color: '#E04D01CC',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginRight: (15),
    borderRadius: (2),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
