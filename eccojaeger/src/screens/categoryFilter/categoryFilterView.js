/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FilterItem } from './components';
import { CustomButton } from '../../components';
import { styles } from './categoryFilter.style';
import { strings } from '../../localization';

export default function CategoryFilterView(props) {
  const [clearAll, setClearAll] = useState(false);
  const [isSelectedChild, setSelectionChild] = useState(
    props?.route?.params?.isSelectedChild,
  );
  const [filterData, setFilterData] = useState(
    props?.route?.params?.filterData,
  );

  const onClickclearAll = () => {
    setSelectionChild([]);
    setFilterData({
      producers: [],
      Brand: [],
      Origin: [],
      Category: '',
      'Glutenfree': 0,
      'Laktosefrei': 0,
      'New Product': 0,
      'TK': 0,
      Vegan: 0,
      Veggie: 0,
    });
    props?.route?.params?.handleFilter(
      {
        producers: [],
        Brand: [],
        Origin: [],
        Category: '',
        'Glutenfree': 0,
        'Laktosefrei': 0,
        'New Product': 0,
        'TK': 0,
        Vegan: 0,
        Veggie: 0,
      },
      [],
    );
    props.navigation.goBack();
  };
  const handleFilterClick = () => {
    props?.route?.params?.handleFilter(filterData, isSelectedChild);
    props.navigation.goBack();
  };
  return (
    <View style={styles.filterContainer}>
      <FlatList
        data={props?.route?.params?.filter}
        renderItem={({ item }) => (
          <FilterItem
            item={item}
            title={item.name}
            isClearAll={clearAll}
            category={props?.route?.params?.category}
            filterData={filterData}
            setFilterData={setFilterData}
            setSelectionChild={setSelectionChild}
            isSelectedChild={isSelectedChild}
          />
        )}
        keyExtractor={item => item?.name}
      />
      <View style={styles.filterActions}>
        <View style={styles.clearBtn}>
          <CustomButton
            title={strings.actions.clearAll}
            buttonStyle={styles.btnLight}
            titleStyle={[styles.actionTitle, styles.titleDark]}
            onPress={() => onClickclearAll()}
          />
        </View>
        <View style={styles.doneBtn}>
          <CustomButton
            title={strings.actions.done}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.actionTitle}
            onPress={() => {
              handleFilterClick();
            }}
          />
        </View>
      </View>
    </View>
  );
}
