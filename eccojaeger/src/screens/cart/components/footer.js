/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { CustomButton, CustomTextArea } from '../../../components';
import { Icon } from 'react-native-elements';
import GlobalStyle from '../../../style/globalstyle';
// import { styles } from '../cart.style';
import { useSelector } from 'react-redux';
import { strings } from '../../../localization';
import { getFormattedPrice } from '../../../utilities/utils';

export default function Footer(props) {
  const [value, setValue] = useState('');

  const authState = useSelector(state => state.rootReducers?.authState);

  const getPrice = (price) => {
    return getFormattedPrice(price)

  };
  return (
    <View>
      <View style={styles.cartFooter}>
        <View style={styles.totalPriceCart}>
          <Text style={styles.totalTitle}>{strings.common.totalProducts}:</Text>
          <Text style={styles.totalDetail}>{props.productCount}</Text>
        </View>
        <View style={styles.totalPriceCart}>
          <Text style={styles.totalTitle}>{strings.common.totalPrice}:</Text>
          <Text style={styles.totalDetail}>{getPrice(props?.totalPrice)}</Text>
        </View>
      </View>
      <CustomButton
        title={strings.actions.checkout}
        buttonStyle={styles.btnGreen}
        titleStyle={styles.titleLight}
        onPress={() => props.handleCheckOut()}
      />
      {/* <CustomButton
        title={strings.actions.print}
        buttonStyle={styles.btnGreenPrint}
        titleStyle={styles.actionTitle}
        onPress={() => props.handleDownload()}
      /> */}
      {props.cartData?.length > 0 &&
        <CustomButton
          title={strings.actions.clearAll}
          buttonStyle={styles.btnLight}
          titleStyle={styles.titleDark}
          onPress={() => props.handleClearAll()}
        />
      }
    </View>
  );
}
export const styles = StyleSheet.create({
  cartFooter: {
    borderTopColor: '#E04D0133',
    borderTopWidth: 1,
    paddingTop: (15),
    paddingBottom: (15),
  },
  totalPriceCart: {
    marginTop: (10),
    flexDirection: 'row',
    alignItems: 'center',
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
  btnGreen: {
    backgroundColor: '#E04D0199',
    width: '100%',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#E04D0199',
    marginTop: (20),
    marginBottom: (15),
    borderRadius: (8),
  },
  btnLight: {
    backgroundColor: '#E04D011A',
    height: (42),
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#D9DBE9',
    width: '100%',
    borderRadius: (8),
  },
  titleLight: {
    fontFamily: GlobalStyle.fontSet.Poppins700,
    fontSize: (16),
    color: '#FFFFFF',
  },
  titleDark: {
    color: '#E04D01',
    fontFamily: GlobalStyle.fontSet.Poppins400,
    fontSize: (16),
  },
});