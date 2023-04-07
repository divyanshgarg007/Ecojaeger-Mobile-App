/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import GlobalStyle from '../../../style/globalstyle';
import { Icon } from 'react-native-elements';
// import { styles } from '../cart.style';
import { CustomUnitPrice, AlertDialog, CustomTextArea } from '../../../components';
import AddComment from './addComment';
import { strings } from '../../../localization';
import CustomDatePicker from './customDatePicker';
import moment from 'moment'
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/action';
import { Toasts } from '../../../components';
import QuantityInputCart from './quantityInputCart'
import { API_CONSTANTS } from '../../../constants/constants';
import { getFormattedPrice, getPriceCommon, getPriceApi } from '../../../utilities/utils';
import FastImage from 'react-native-fast-image'
const CartItem = (props) => {
  const [visible, setVisible] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [cartId, setCartId] = useState(null)
  const [data, setData] = useState(null)

  const [value, setValue] = useState('');

  const [type, setType] = useState(null)
  const [alertToast, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const [valueComment, setValueComment] = useState('');
  const [commentWithOrder, setCommentWithOrder] = useState('');


  const authState = useSelector(state => state.rootReducers?.authState);
  const cartState = useSelector(state => state.rootReducers?.cartState);
  const network = useSelector(state => state.rootReducers?.productState.network);

  const toggleOverlay = () => {
    setVisible(!visible);
    setValueComment('')
  };

  const toggleAlert = (id) => {
    setCartId(id)
    setDeleteAlert(!deleteAlert);
  };
  const handleDeleteMethod = () => {
    setDeleteAlert(!deleteAlert);
    props.handleRemoveCartMethod(cartId)
    setCartId(null)
  }
  ///Add comment
  const onSuccessAddComment = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('success')
    toggleOverlay()
    setData(null)
    setValueComment('')
  }
  const onErrorAddComment = (data) => {
    setAlert(true);
    setMessage(data.message)
    setType('error')
    toggleOverlay()
    setData(null)
    setValueComment('')
  }
  const handleAddComment = (value) => {
    if (props.networkStatus.isConnected && props.networkStatus.isInternetReachable) {
      let obj = {
        id: data.id,
        unit: data.unit,
        comment: value,
        requestFrom: 'mob',
      }
      props.actions.addCommentAction(obj, onSuccessAddComment, onErrorAddComment)
    } else {
      alert(strings.cart.offlineTitle)
    }
  }
  ///Quantity update
  const onSuccessQuantityUpdate = (data) => {
    //console.log(data)
  }
  const onErrorQuantityUpdate = (data) => {
    //console.log(data)
  }
  const handleQuantityUpdate = (value, item) => {
    if (item?.productId) {
      //This means product is added in offine mode
      var prictObj = item.item.productUnit.find((obj) => obj.id === item.unitId)
      if (prictObj) {
        //item.item.totalPriceNumeric = parseFloat(prictObj.price) * value
        item.item.totalPriceNumeric = item?.item?.quantityRangeData?.length > 0 && item?.item?.quantityRangePriceData?.length > 0 ?
          (getCartPriceOffline(item?.item?.quantityRangeData, item?.item?.quantityRangePriceData, value, item?.selectedUnit))
          : (parseFloat(item.item.totalPriceNumeric) / item.count * value)
        item.count = value
        item.item.count = value
        var objs = cartState?.cartList?.offlineCart
        props.actions.replaceCartOffline(objs)
      }
    } else {
      if (props.networkStatus.isConnected && props.networkStatus.isInternetReachable) {
        let obj = {
          id: item.id,
          unit: item.unit,
          quantity: value,
          requestFrom: 'mob',
        }
        props?.setLoading(true)
        props.actions.addCommentAction(obj, onSuccessQuantityUpdate, onErrorQuantityUpdate)
      } else {
        alert(strings.cart.offlineTitle)
      }
    }
  }
  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }

  const getPrice = (price) => {
    if (props?.data.date === "offline") {
      if (props.data?.data?.length > 0) {
        //let fObj = props.data.data[0]
        let oPrice = 0
        props.data.data.map((fObj) => {
          oPrice += parseFloat(fObj.item.totalPriceNumeric)
        })
        return getFormattedPrice(parseFloat(oPrice))
      }
    } else {
      return getFormattedPrice(price)
    }
  }

  const handleCommentWithOrder = (text, date) => {
    setCommentWithOrder(text)

    props.setCartData(
      props.cartData?.map((shareholder, sidx) => {
        if (shareholder?.date !== date) {
          return shareholder
        } else {
          return {
            ...shareholder, [`comment-${date}`]: text,
          }
        }
      }),
    )
  }

  const handleDateWithOrder = (dateStr, date) => {
    //receiving date format => YYYY-MM-DD
    let date1 = moment(dateStr, "YYYY-MM-DD").format("DD-MM-YYYY")
    let date2 = moment(dateStr, "YYYY-MM-DD").format("DD.MM.YYYY")
    props.setCartData(
      props.cartData?.map((shareholder, sidx) => {
        if (shareholder?.date !== date) {
          return shareholder
        } else {
          Object.keys(shareholder).map((key) => {
            if (key.includes('deliveryDate')) {
              delete shareholder[key]
            }
          })
          return {
            ...shareholder,
            [`deliveryDate_${date}`]: date2,
            'deliveryDate': date
          }
        }
      }),
    )
  }
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

  const getCartFactoryUnitOffline = (quantityRangeData, quantityRangePriceData, count, unit) => {
    let priceIndex = findPrice(quantityRangeData, count * unit?.unitPrices)
    if (priceIndex === -1) {
      return quantityRangePriceData[quantityRangePriceData?.length - 1]
    } else {
      return quantityRangePriceData[priceIndex]
    }
  }
  const getCartPriceOffline = (quantityRangeData, quantityRangePriceData, count, unit) => {
    let priceIndex = findPrice(quantityRangeData, count * unit?.unitPrices)
    if (priceIndex === -1) {
      return (quantityRangePriceData[quantityRangePriceData?.length - 1] * count * parseFloat(unit?.unitPrices)).toFixed(2)
    } else {
      return (quantityRangePriceData[priceIndex] * count * parseFloat(unit?.unitPrices)).toFixed(2)
    }
  }
  const getItem = () => {
    return (
      <>
        <View style={styles.orderDate}>
          <Text style={styles.totalTitle}>{strings.common.orderDate}:</Text>
          <Text style={styles.totalDetail}>{props?.date}</Text>
        </View>
        <CustomDatePicker
          date={props?.data?.date ? moment(props.data.date, 'DD/MM/YYYY').format('YYYY-MM-DD') : null}
          accountDeliverDays={props?.accountDeliverDays}
          holidayData={props?.dateHolidayList}
          onDateSelect={(dateStr) => {
            //alert(dateStr)
            handleDateWithOrder(dateStr, props?.data?.date)
          }}
        />
        {props?.data?.data?.map((data, index) => (
          <View style={styles.itemContainer} key={index}>
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Pressable onPress={() => network?.isConnected ? props.onPress(data?.id) : alert(strings.common.offlineMessage)}>
                  <FastImage
                    source={{ uri: `${API_CONSTANTS.IMG_PREFIX}` + data?.mainImage }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </Pressable>
                <View style={styles.productInfo}>
                  <Pressable onPress={() => network?.isConnected ? props.onPress(data?.id) : alert(strings.common.offlineMessage)}>
                    <Text style={styles.productName}>{data?.title}</Text>
                  </Pressable>

                  <View style={styles.productActions}>
                    {/* <View style={styles.individualPrice}>
                      <Text style={styles.infoTitle}>{strings.common.price}:</Text>
                      <Text style={styles.productPrice}>
                        {data?.defaultPerPriceData.replace('CHF', '')}/{data.factoryUnitName}</Text>
                    </View> */}
                    <View style={styles.iconSmall}>
                      <Icon
                        size={(20)}
                        name="message1"
                        type="antdesign"
                        color="#E04D01CC"
                        onPress={() => {
                          toggleOverlay()
                          if (!visible) {
                            setData(data)
                          }
                        }}
                        containerStyle={styles.actionIcons}
                      />
                      <Icon
                        size={(20)}
                        name="delete"
                        type="antdesign"
                        color="#E04D01CC"
                        onPress={() => toggleAlert(data)}
                      />
                    </View>
                  </View>
                  <View style={styles.infoItems}>
                    <Text style={styles.infoTitle}>{strings.common.totalPrice}:</Text>
                    <Text style={styles.infoDetail}>{data?.totalPrice}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.unitBox}>
                  <CustomUnitPrice
                    unitPriceName={data?.unit}
                    disable={true}
                    unit={`${getPriceCommon(data?.defaultPerPriceData)}/${data.factoryUnitName}`}
                    cart={true}
                  />
                </View>
                <View style={styles.quantityBox}>
                  <QuantityInputCart
                    selectedUnit={data?.unit}
                    count={data?.count}
                    handleQuantityUpdate={(value, item) => {
                      handleQuantityUpdate(value, item)
                    }}
                    item={data}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}

        <View>
          <View style={styles.totalPrice}>
            <Text style={styles.totalTitle}>{strings.common.subTotal}:</Text>
            <Text style={styles.totalDetail}>{getPrice(props?.data?.price)}</Text>
          </View>
          <CustomTextArea
            style={styles.commentInput}
            placeholder={strings.common.addComment}
            value={props?.data[`comment-${props?.data?.date}`]}
            onChangeText={text => handleCommentWithOrder(text, props?.data?.date)}
            numberOfLines={4}
          />
        </View>
        <AddComment
          toggleOverlay={toggleOverlay}
          visible={visible}
          handleAddComment={handleAddComment}
          setValueComment={setValueComment}
          valueComment={valueComment}
        />
      </>
    )
  }

  const getOfflineItem = () => {
    return (
      <>
        {props?.data?.data?.map((data, index) => (
          <View style={styles.itemContainer} key={index}>
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>

                <Pressable onPress={() => network?.isConnected ? props.onPress(data?.id) : alert(strings.common.offlineMessage)}>
                  <FastImage
                    source={{ uri: `${API_CONSTANTS.IMG_PREFIX}` + data.item?.mainImage }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </Pressable>
                <View style={styles.productInfo}>
                  <Pressable onPress={() => network?.isConnected ? props.onPress(data?.id) : alert(strings.common.offlineMessage)}>
                    <Text style={[styles.productName, { color: 'gray' }]}>{data?.item.title}</Text>
                  </Pressable>

                  <View style={styles.productActions}>
                    <View style={styles.iconSmall}>
                      <Icon
                        size={(20)}
                        name="delete"
                        type="antdesign"
                        color="#707070"
                        onPress={() => toggleAlert(data)}
                      />
                    </View>
                  </View>
                  <View style={styles.infoItems}>
                    <Text style={[styles.infoTitle, { color: 'gray' }]}>{strings.common.totalPrice}:</Text>
                    <Text style={[styles.infoDetail, { color: 'gray' }]}>CHF {data?.item?.quantityRangeData?.length > 0 && data?.item?.quantityRangePriceData?.length > 0 ?
                      (getCartPriceOffline(data?.item?.quantityRangeData, data?.item?.quantityRangePriceData, data?.item?.count, data?.selectedUnit))
                      : parseFloat(data?.item.totalPriceNumeric).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.unitBox}>
                  <CustomUnitPrice
                    unitPriceName={data?.unit}
                    disable={true}
                    unit={`${getPriceCommon(data?.item?.quantityRangeData?.length > 0 && data?.item?.quantityRangePriceData?.length > 0 ? getCartFactoryUnitOffline(data?.item?.quantityRangeData, data?.item?.quantityRangePriceData, data?.item?.count, data?.selectedUnit) : data?.item?.defaultPerPriceData)}/${data.item.factoryUnitName}`}
                    cart={true}
                  />
                </View>
                <View style={styles.quantityBox}>
                  <QuantityInputCart
                    count={data?.count}
                    selectedUnit={data?.selectedUnit?.name}
                    handleQuantityUpdate={(value, item) => {
                      handleQuantityUpdate(value, item)
                      props.updateOffline()
                    }}
                    item={data}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}

        <View>
          <View style={styles.totalPrice}>
            <Text style={styles.totalTitle}>{strings.common.subTotal}:</Text>
            <Text style={styles.totalDetail}>{getPrice(props?.data?.price)}</Text>
          </View>
          {/* <CustomTextArea
            style={styles.commentInput}
            placeholder={strings.common.addComment}
            value={value}
            onChangeText={text => setValue(text)}
            numberOfLines={4}
          /> */}
        </View>
        <AddComment
          toggleOverlay={toggleOverlay}
          visible={visible}
          handleAddComment={handleAddComment}
        />
      </>
    )
  }

  return (
    <>
      <Toasts message={message} type={type} show={alertToast} handleHide={handleHide} />

      <View style={styles.productContainer}>
        {
          props?.data?.date === "offline" ?
            getOfflineItem() :
            getItem()
        }

        <AlertDialog visible={deleteAlert} toggleOverlay={toggleAlert} deleteMethod={handleDeleteMethod}
          title={strings.common.delete} cancel={strings.actions.no} delete={strings.actions.yes} />
      </View>
    </>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(CartItem);

export const styles = StyleSheet.create({
  itemContainer: {
    // paddingHorizontal: (15),
  },
  orderDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E04D0133',
    paddingVertical: (10),
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    paddingBottom: (0),
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
    marginTop: (10),
    width: '100%',
  },
  unitBox: {
    flex: 1,
  },
  quantityBox: {

  },
  iconSmall: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: (8),
    marginBottom: (10),
  },
  infoTitle: {
    color: '#222222',
    fontSize: (15),
    fontFamily: GlobalStyle.fontSet.Poppins500,
    marginRight: (5),
  },
  actionIcons: { marginRight: (35) },
  infoItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (7),
  },
  infoDetail: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginLeft: (5),
  },
  totalPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: (10),
  },
  totalTitle: {
    color: '#222222',
    fontSize: (15),
    fontFamily: GlobalStyle.fontSet.Poppins600,
  },
  totalDetail: {
    color: '#222222',
    fontSize: (14),
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingLeft: (5),
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: (10),
    textAlignVertical: 'top',
    fontSize: (14),
    color: '#222222',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    marginTop: (10),
    marginBottom: (10),
    flex: 1,
  },
});
