/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { SearchBar } from '../../components';
import { SearchItem } from './components';
import { styles } from './searchProductList.style';

const products = [
  {
    id: 1,
    img: require('../../assets/images/carot.jpg'),
    title: '2B Micro Leaves Broccoli 40g cadch hs hyscd sjb',
  },
  {
    id: 2,
    img: require('../../assets/images/sweet-corn.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 3,
    img: require('../../assets/images/chips.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 4,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 5,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 6,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 7,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 8,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 9,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 10,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
  {
    id: 11,
    img: require('../../assets/images/beat-root.jpg'),
    title: '2B Micro Leaves Broccoli 40g',
  },
];

export default function SearchProductListView() {
  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={styles.searchResult}>
        <SearchBar
          handleSelectedSuggestion={() => null}
          handleClear={() => null}
        />
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ zIndex: -1 }}
        data={[]}
        renderItem={({ item }) => (
          <SearchItem item={item} />
        )}
      />
    </SafeAreaView>
  );
}
