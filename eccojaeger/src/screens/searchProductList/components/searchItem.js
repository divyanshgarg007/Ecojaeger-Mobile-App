/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import StarIcon from '../../../assets/images/star.png';
import InfoIcon from '../../../assets/images/information.png';
import CartIcon from '../../../assets/images/cart.png';
import GlobalStyle from '../../../style/globalstyle';
import { CustomQuantityInput, CustomUnitPrice } from '../../../components';
import FastImage from 'react-native-fast-image'

export default function SearchItem(props) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemCard}>
        <View style={styles.itemInfo}>
          <Pressable onPress={() => console.log('go to product detail')}>
            <FastImage
              style={styles.productImage}
              resizeMode="contain"
              source={props.item.img} />
          </Pressable>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{props.item.title}</Text>
            <View style={styles.productActions}>
              <Text style={styles.productPrice}>CHF 12.30</Text>
              <FastImage
                style={[styles.productAdd, styles.productSeparate]}
                resizeMode="contain"
                source={InfoIcon} />
              <FastImage
                style={styles.productAdd}
                resizeMode="contain"
                source={CartIcon} />
            </View>
          </View>
          <FastImage
            style={[styles.productAdd, styles.addBuying]}
            resizeMode="contain"
            source={StarIcon} />
        </View>
        <View style={styles.itemActions}>
          <View style={styles.unitBox}>
            <CustomUnitPrice />
          </View>
          <View style={styles.quantityBox}>
            <CustomQuantityInput />
          </View>
        </View>
      </View>
    </View >
  );
}
export const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: (16),
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
    fontSize: 16,
    fontFamily: GlobalStyle.fontSet.Poppins400,
    paddingBottom: (12),
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    color: '#E04D01CC',
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.Poppins500,
    backgroundColor: '#E04D011A',
    paddingHorizontal: (8),
    paddingVertical: (4),
    marginRight: (24),
    borderRadius: 4,
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
  quantityBox: {

  },
});
