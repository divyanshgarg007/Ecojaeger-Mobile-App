/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Categories } from './components';
import { styles } from './homeNew.style';
import { BackButton } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { NAVIGATION } from '../../constants';

const HomeChildNewView = (props) => {
    const handleCategories = (item) => {
        if (item?.sub?.length > 0) {
            props.navigation.push(NAVIGATION.homeNewChild, { item: item });
        } else {
            props.navigation.navigate(NAVIGATION.productLists, { item: item });
        }
    }

    const onClickBack = () => {
        props.navigation.pop(1)
    }

    const getView = () => {
        return (
            <Categories
                banner={false}
                bannerKey={1}
                onPress={(item) => handleCategories(item)}
                articles={null}
                filterData={props.route.params.item.sub}
                handleProductDetail={() => {
                    //console.log("")
                }}
                onRefresh={() => {
                    //console.log("")
                }}
                isFetching={false}
            />
        )
    }

    return (
        <SafeAreaView style={styles.homeContainer}>
            <Header onClickBack={() => onClickBack()} categoryData={props.route.params.item} />
            {
                getView()
            }
        </SafeAreaView>
    );
}

const Header = (props) => {
    return (
        <View style={styles.navigationView} >
            <BackButton onClick={() => props.onClickBack()} style={styles.backIcon} />
            <Text style={styles.navigationLabel}>{props?.categoryData?.name}</Text>
        </View >
    );
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(HomeChildNewView);

