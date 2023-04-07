/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView } from 'react-native';
import RelatedItemView from './relatedItemView';
export default function RelatedItem(props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {
        props.item.map((item, index) => (
          <RelatedItemView
            key={index}
            item={item}
            handleAddCart={props?.handleAddCart}
            onClickOpenBuyingList={props?.onClickOpenBuyingList}
            handleProductDetail={props?.handleProductDetail}
          />

        ))}
    </ScrollView>
  )
}
