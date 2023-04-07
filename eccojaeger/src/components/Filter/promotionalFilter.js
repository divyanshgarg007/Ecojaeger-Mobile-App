/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from './filter.style';
import { CustomButton } from '../../components';
import { CategoriesFilter, } from '../../components';
import { FilterOptions } from '../../components/Filter';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { strings } from '../../localization';
import GlobalStyle from '../../style/globalstyle';
import normalize from 'react-native-normalize';

function PromotionalFilter(props) {
  const data = [{
    id: 1,
    name: strings.common.promotion,
    type: 'promotional'
  },
  {
    id: 2,
    name: strings.common.newProduct,
    type: 'New Product'
  },
  ];
  const [filter, setFilter] = useState(props?.filter);

  const [loading, setLoading] = useState(false);

  const [isSelectedChild, setSelectionChild] = useState(
    props?.isSelectedChild,
  );
  const [filterData, setFilterData] = useState(
    props?.filterData,
  );
  console.log('filterdata', filterData, isSelectedChild)

  const onClickclearAll = () => {
    props?.handleClearAll();
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
      promotional: 0
    })
    setSelectionChild([])
    //props?.handleClickFilter()
  };
  const handleFilterClick = () => {
    props?.handleFilter(filterData, isSelectedChild);
    props?.handleClickFilter()
  };

  const handleSelectFilterData = (item) => {
    let checkedData = isSelectedChild?.filter(data => data === item?.type)
    if (!(checkedData?.length > 0)) {
      setSelectionChild([...isSelectedChild, item?.type]);
      setFilterData({ ...filterData, [`${item?.type}`]: 1 })
    } else if (checkedData?.length > 0) {
      setSelectionChild(isSelectedChild.filter(data => data !== item?.type));
      setFilterData({ ...filterData, [`${item?.type}`]: 0 })
    }
  };
  const onSuccessSubCategory = data => {
    setFilter(data?.data?.filters);
    setLoading(false);
  };
  const onError = data => {
    setFilter([]);
    setLoading(false);
  };
  const handleCategoryFilter = id => {
    setLoading(true);
    let obj = {
      producers: [],
      Brand: [],
      limit: 12,
      page: 1,
      category: id,
      Origin: [],

      vegan: 0,
      veggie: 0,
      Glutenfree: 0,
      Laktosefrei: 0,
      newProduct: 0,
      TK: 0,
      promotional: 0
    };
    props.actions.productListSubCategoryAction(
      obj,
      onSuccessSubCategory,
      onError,
    );
  };

  return (
    <View style={{
      backgroundColor: '#fff',
      paddingHorizontal: (15),
      marginTop: 15
    }}>
      <ScrollView >
        <View style={styles.filterProducts}>
          {data.map((item, index) => (
            <View style={styles.dataFilter} key={item.id}>
              <CheckBox
                checked={isSelectedChild?.includes(item?.type)}
                onPress={() => handleSelectFilterData(item)}
                containerStyle={styles.filterCheckbox}
                checkedIcon={
                  <View style={styles.uncheck}>
                    <View style={styles.check} />
                  </View>
                }
                uncheckedIcon={<View style={styles.uncheck} />}
                checkedColor="red"
                style={styles.check}
                title={
                  <Text style={isSelectedChild?.includes(item?.type) ? styles.selectedDataName : styles.dataName} numberOfLines={1}>{item.name}</Text>
                }
              />
            </View>
          ))}

        </View>
        <CategoriesFilter
          filter={filter?.filter((data) => data.type === 'Categories')[0]}
          handleCategoryFilter={handleCategoryFilter}
          setSelectionChild={setSelectionChild}
          setFilterData={setFilterData}
          isSelectedChild={isSelectedChild}
          filterData={filterData}
        />
        <FilterOptions
          filter={filter?.filter((data) => data.type !== 'Categories')}
          setSelectionChild={setSelectionChild}
          setFilterData={setFilterData}
          isSelectedChild={isSelectedChild}
          filterData={filterData}
        />

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color="#fff" size="small" />
          </View>
        )}

      </ScrollView>
      <View style={styles.filterActions}>
        <View style={styles.clearBtn}>
          <CustomButton
            title={strings.actions.clearAll}
            buttonStyle={styles.btnLight}
            titleStyle={styles.titleDark}
            onPress={() => onClickclearAll()}
          />
        </View>
        <View style={styles.doneBtn}>
          <CustomButton
            title={strings.actions.done}
            buttonStyle={styles.btnGreen}
            titleStyle={styles.titleLight}
            onPress={() => {
              handleFilterClick();
            }}
          />
        </View>
      </View>
    </View>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(PromotionalFilter);
