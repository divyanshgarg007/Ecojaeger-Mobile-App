/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { styles } from './categories.style';
import { CategoryListItem } from './components';
import { NAVIGATION } from '../../constants';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { NoInternet } from '../../components';

const cardGap = 10;
const cardWidth = parseInt(Dimensions.get('window').width - cardGap * 4) / 3;

function CategoriesView(props) {
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [value, setValue] = useState(0);
  const productState = useSelector(state => state.rootReducers?.productState);
  const authState = useSelector(state => state.rootReducers?.authState);

  useEffect(() => {
    callAPI()
  }, []);

  useEffect(() => {
    if (productState?.productListCategory?.data?.data) {
      setProductCategoryData(productState?.productListCategory?.data?.data);
    }
  }, [productState?.productListCategory?.data]);

  useEffect(() => {
    if (authState?.language) {
      callAPI()
    }
  }, [authState?.language]);

  const callAPI = () => {
    let obj = {
      producers: [],
      Brand: [],
      limit: 12,
      page: 1,
      category: '',
      Origin: [],
      Glutenfree: 0,
      Laktosefrei: 0,
      newProduct: 0,
      TK: 0,
      vegan: 0,
      veggie: 0,
    };
    props.actions.productListCategoryAction(obj);
  }

  var dataS = productCategoryData && productCategoryData?.filters && productCategoryData?.filters[0]?.values?.subCategories
  return (
    <View>
      {productState.network ?
        <FlatGrid
          //itemDimension={130}
          data={dataS ? dataS : []}
          style={styles.gridView}
          itemDimension={cardWidth}
          //staticDimension={cardWidth}
          fixed
          spacing={10}
          renderItem={({ item }) => (
            <CategoryListItem onPress={() => {
              props.navigation.navigate(NAVIGATION.categoriesProductList, {
                name: item.name, id: item.id,
              });
            }}
              item={item} />
          )}
        /> : <NoInternet />}

    </View>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoriesView);
