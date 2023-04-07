/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { styles } from './components.style';
import { Icon } from 'react-native-elements';
import SearchIcon from '../assets/images/search.png';
import { strings } from '../localization';
import CustomTextInput from './customTextInput';
import FastImage from 'react-native-fast-image'

export default function SearchBarLocal(props) {
    let dataSuggestion = [];
    props?.suggestionData?.map((data) => {
        let obj = {
            id: data.id,
            title: data.text,
        };
        dataSuggestion.push(obj);
    });
    return (
        <View style={styles.homeSearchContainer}>
            <View style={styles.localSearch}>
                <FastImage style={styles.searchImageLocal} source={SearchIcon} resizeMode="contain" />
                <CustomTextInput
                    style={styles.searchInput}
                    keyboardType="default"
                    placeholder={strings.common.searchProduct}
                    placeholderTextColor="rgba(224, 77, 1, 1)"
                    onChangeText={(text) => props.handleSearch(text)}
                    value={props?.search}
                    onSubmitEditing={(obj) => props?.handleSearch(obj.nativeEvent.text)}
                />
                <Icon
                    size={(20)}
                    name="close"
                    type="antdesign"
                    color="#E04D01CC"
                    onPress={() => props?.handleSearchClear()}
                />
            </View>

        </View>
    );
}
