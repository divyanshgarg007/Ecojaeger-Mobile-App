/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CustomQuantity, RBSheetView } from '../../../components';
import FastImage from 'react-native-fast-image'
import { styles } from '../productDetail.style';
import { useSelector } from 'react-redux';
import StarIcon from '../../../assets/images/star.png';
import CartIcon from '../../../assets/images/cart.png';
import { API_CONSTANTS } from '../../../constants/constants';
import { getFormattedPrice, getPriceCommon } from '../../../utilities/utils';

export default function RelatedItemView(props) {
    const authState = useSelector(state => state.rootReducers?.authState);
    const [unitPrice, setUnitPrice] = useState(props?.item?.productUnit && props?.item?.productUnit?.filter((data) => data.default === '1')[0]);
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
    //Add cart
    const handleAddCart = (item) => {
        let obj = {
            ids: item?.id,
            quantity: count,
            unitId: unitPrice?.id,
        };
        props.handleAddCart(obj);
    };


    return (
        <View style={styles.relatedBox}>
            <View style={styles.moreBox}>
                <View style={styles.relatedImageBox}>
                    <Pressable onPress={() => props?.handleProductDetail(props?.item?.id)}>
                        <FastImage
                            style={styles.relatedProdImage}
                            resizeMode="contain"
                            source={{ uri: `${API_CONSTANTS.IMG_PREFIX}` + '/' + props?.item?.mainImage }} />
                    </Pressable>
                    <Text style={[styles.perPrice, styles.relatedPer]} numberOfLines={1}>
                        {!(props?.item?.quantityRangeData?.length > 0 && props?.item?.quantityRangePriceData?.length > 0) ?
                            `${getPriceCommon(props?.item?.defaultPerPriceData)} ${props?.item?.factoryUnitName}`
                            :
                            `${getFactoryPrice(factoryUnit)?.replace('CHF', '')} ${props?.item?.factoryUnitName}`}
                    </Text>
                </View>

                {
                    authState?.signIn?.data?.data?.tokenNumber &&
                    <View style={styles.contentBox}>
                        <Pressable onPress={() => props?.onClickOpenBuyingList(props?.item?.id, unitPrice?.id)}>
                            <FastImage style={[styles.productAdd]}
                                resizeMode="contain"
                                source={StarIcon} />
                        </Pressable>
                        <Pressable style={styles.cartIconRelated} onPress={() => handleAddCart(props?.item)}>
                            <FastImage style={[styles.productAdd]}
                                resizeMode="contain"
                                source={CartIcon} />
                        </Pressable>
                    </View>
                }
                <View style={styles.quantityBox}>
                    <CustomQuantity
                        count={count}
                        setCount={setCount}
                        minValue={1}
                    />
                </View>
            </View>
            <View style={styles.relatedBottom}>
                <Text style={styles.relatedProdPrice}>{getPrice()}</Text>
                <View style={styles.relatedUnit}>
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

        </View>
    )
}