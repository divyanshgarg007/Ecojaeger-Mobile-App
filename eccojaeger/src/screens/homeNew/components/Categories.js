/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';
import { Banner, CategoryItem } from './index';
import { useSelector } from 'react-redux';

const Categories = React.memo((props) => {
  const network = useSelector(state => state.rootReducers?.productState.network);
  let sortedData = props.filterData.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return (
    <FlatList
      ListHeaderComponent={() => props.banner ? <Banner articles={props.articles} handleProductDetail={props?.handleProductDetail} /> : null}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ zIndex: -1 }}
      data={sortedData}
      renderItem={({ item }) => (
        <CategoryItem item={item} onPress={(item) => props.onPress(item)} />
      )}
      refreshing={props?.isFetching}
      onRefresh={() => network.isConnected ? props?.onRefresh() : null}
    />
  );
})

export default Categories;
