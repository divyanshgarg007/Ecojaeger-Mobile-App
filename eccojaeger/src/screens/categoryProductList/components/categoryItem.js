/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Pressable, Alert } from 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { RBSheetView, CustomQuantity } from '../../../components';
import { styles } from '../categoryProductList.style';
import { useSelector } from 'react-redux';
import { getFormattedPrice, getPriceCommon } from '../../../utilities/utils';
import { strings } from '../../../localization';
import FastImage from 'react-native-fast-image'

export default function CategoryItem(props) {
  const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);

  const [unitPrice, setUnitPrice] = useState(
    props?.item?.productUnit && props?.item?.productUnit?.filter(data => data.default === '1')[0],
  );
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState();
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
    <View>
      <View style={styles.cardBox}>
        <View style={styles.productBox}>
          {props?.item?.seasonal === true && (
            <View style={styles.productBadge}>
              <Text style={styles.badgeName}>seasonal</Text>
            </View>
          )}
          <View style={styles.productImageBox}>
            {props?.item?.promotionalProduct === 1 &&
              <Text style={[styles.addPro, styles.upPro]}>A</Text>
            }
            <Pressable onPress={() => network?.isConnected ? props.onPress(props?.item?.id) : alert(strings.common.offlineMessage)}>
              <FastImage
                style={styles.productImage}
                resizeMode="contain"
                source={{
                  uri: props?.dataUrl + '/' + props?.item?.mainImage,
                }}
              />
            </Pressable>
            {props?.item?.newProduct === 1 &&
              <Text style={[styles.addPro, styles.downPro]}>N</Text>
            }
            <Text style={styles.perPrice} numberOfLines={1}>
              {!(props?.item?.quantityRangeData?.length > 0 && props?.item?.quantityRangePriceData?.length > 0) ?
                `${getPriceCommon(props?.item?.defaultPerPriceData)} ${props?.item?.factoryUnitName}`
                :
                `${getFactoryPrice(factoryUnit)?.replace('CHF', '')} ${props?.item?.factoryUnitName}`}
            </Text>
          </View>
          <View style={styles.productInfoBox}>
            {/* <Text style={styles.proCategory}>
              {props?.item?.productCategory}
            </Text> */}
            <Pressable style={{ backgroundColor: 'red' }} onPress={() => network?.isConnected ? props.onPress(props?.item?.id) : alert(strings.common.offlineMessage)}>
              <Text style={styles.proName}>{props?.item?.title}</Text>
            </Pressable>

            <View style={styles.iconSmall}>
              {props?.item?.productCurrentDayRule &&
                <Icon
                  size={20}
                  name="infocirlceo"
                  type="antdesign"
                  color="#009640"
                  containerStyle={styles.actionIcons}
                  onPress={() => showAlert()}
                />
              }
              {authState?.signIn?.data?.data?.tokenNumber &&
                <>
                  <Icon
                    size={20}
                    name="staro"
                    type="antdesign"
                    color="#009640"
                    containerStyle={styles.actionIcons}
                    onPress={() => props.handleAddBuying(props?.item?.id, unitPrice?.id)}
                  />
                  <Icon size={20} name="shoppingcart" type="antdesign" color="#009640"
                    onPress={() => props.handleAddCart(props?.item?.id, count, unitPrice?.id)}
                  />
                </>
              }
            </View>
            <View style={styles.innerBoxs}>
              <Text style={styles.actualPrice}>{getPrice()}</Text>
              <View style={styles.unitInput}>
                <RBSheetView
                  quantity={props?.item?.productUnit}
                  defaultUnit={props?.item?.factoryUnitName}
                  unitPrice={unitPrice}
                  unitPriceName={unitPrice?.name}
                  setUnitPrice={setUnitPrice}
                  disable={false}
                  id={props?.item?.id}
                />
              </View>

            </View>
            <View />
          </View>
          <View style={styles.productQuantity}>
            <CustomQuantity
              count={count}
              setCount={setCount}
              minValue={1}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
