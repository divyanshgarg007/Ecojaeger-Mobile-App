/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { FilterItem } from './components';
import { CustomButton } from '../../components';
import { styles } from './productFilter.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { strings } from '../../localization';

function ProductFilterView(props) {
  const [clearAll, setClearAll] = useState(false);
  const [isSelectedChild, setSelectionChild] = useState(
    props?.route?.params?.isSelectedChild,
  );
  const [filter, setFilter] = useState(props?.route?.params?.filter);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState(
    props?.route?.params?.filterData,
  );

  const onClickclearAll = () => {
    props?.route?.params?.handleClearAll();
    props.navigation.goBack();
  };
  const handleFilterClick = () => {
    props?.route?.params?.handleFilter(filterData, isSelectedChild);
    props.navigation.goBack();
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
      TK: 0
    };
    props.actions.productListSubCategoryAction(
      obj,
      onSuccessSubCategory,
      onError,
    );
  };

  return (
    <View style={styles.filterContainer}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#fff" size="small" />
        </View>
      )}
      {filter?.length > 0 && (
        <FlatList
          data={filter}
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
              handleCategoryFilter={handleCategoryFilter}
            />
          )}
          keyExtractor={item => item?.name}
        />
      )}
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

export default connect(null, mapDispatchToProps)(ProductFilterView);
