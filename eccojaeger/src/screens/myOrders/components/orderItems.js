/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CustomButton } from '../../../components';
import { NAVIGATION } from '../../../constants';
import { styles } from '../myOrders.style';
import { strings } from '../../../localization';
import { useSelector } from 'react-redux';
import { getPriceApi } from '../../../utilities/utils'
import moment from 'moment';

export default function OrderItems(props) {
  const authState = useSelector(state => state.rootReducers?.authState);

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>
          {strings.common.orderNumber} {props.item?.orderNumber}
        </Text>
        <Text style={styles.historySubTitle}>
          {strings.common.orderedOn}: {moment(props.item?.orderDate).format(authState.language === 'de' ? 'DD.MM.YYYY' : 'DD-MM-YYYY')}
        </Text>
        <Text style={styles.historySubTitle}>
          {strings.common.deliverOn}: {moment(props.item?.deliveryDate).format(authState.language === 'de' ? 'DD.MM.YYYY' : 'DD-MM-YYYY')}
        </Text>
        <View style={styles.historyTotal}>
          <Text style={styles.totalHistory}>{strings.common.total}{' '}
            {(props.item?.currency)}{' '}{props.item?.totalPrice}{' '}
            {strings.common.for}{' '}{props.item?.itemCount}{' '}
            {strings.common.items}
          </Text>
        </View>
        <View style={styles.orderActions}>
          <View style={styles.spaceBtns}>
            <CustomButton
              title={strings.actions.view}
              buttonStyle={styles.btnLight}
              titleStyle={styles.titleDark}
              onPress={() => {
                props.handleOrderDetails(props?.item);
              }}
            />
          </View>
          <View style={styles.spaceBtns}>
            <CustomButton
              title={strings.actions.reOrder}
              buttonStyle={styles.btnGreen}
              titleStyle={styles.titleLight}
              onPress={() => props?.handleReorder(props?.item?.orderId)}
            />
          </View>
        </View>
        {/* <View style={styles.printBtn}>
          <CustomButton
            title={strings.actions.print}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.actionTitle}
            onPress={() => props?.handleDownload(props?.item?.orderId)}
          />
        </View> */}
      </View>
    </Card>
  );
}
