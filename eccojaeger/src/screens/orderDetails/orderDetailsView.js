/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { strings } from '../../localization';
import { styles } from './orderDetails.style';
import { getPriceApi } from '../../utilities/utils'
import { NoInternet } from '../../components';

export default function OrderDetailsView(props) {

  const authState = useSelector(state => state.rootReducers?.authState);
  const network = useSelector(state => state.rootReducers?.productState.network);
  let totalPrice = props?.route?.params?.data?.data?.totalPrice;

  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        {!network?.isConnected && <NoInternet />}
        <View style={styles.historyBox}>
          <Text style={styles.historyTitle}>
            {strings.common.products}
          </Text>
          {props?.route?.params?.data?.data?.items?.map((data, index) => {
            return <View style={styles.orderPro} key={index}>
              <Text style={styles.proName}>{data?.title}</Text>
              <Text style={styles.proUnit}>{(data?.unit)}</Text>
              <Text style={styles.proQuantity}>{data?.quantity}</Text>
              {/* {(authState?.language === 'en') ? */}
              <Text style={styles.proPrice}>{data?.currency} {(data?.price)}</Text>
              {/* <Text style={styles.proPrice}>{getPriceApi(data?.price)}</Text> */}
              {/* } */}
            </View>;
          })
          }

          <View style={styles.historyTotal}>
            <Text style={styles.totalHistory}>{strings.common.totalPrice}</Text>
            {/* {(authState?.language === 'en') ?
              <Text style={[styles.totalHistory, styles.prices]}>
                {props?.route?.params?.data?.data?.currency}{' '}
                {(totalPrice)}</Text> :
              <Text style={[styles.totalHistory, styles.prices]}>
                {(totalPrice)}{' '}{props?.route?.params?.data?.data?.currency}</Text>
            } */}
            <Text style={[styles.totalHistory, styles.prices]}>
              {props?.route?.params?.data?.data?.currency}{' '}
              {(totalPrice)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
