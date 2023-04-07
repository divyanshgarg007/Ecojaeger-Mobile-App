/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { styles } from './components.style';
import GlobalStyle from '../style/globalstyle';
import SearchIcon from '../assets/images/search.png'
import { strings } from '../localization'
import FastImage from 'react-native-fast-image'

export default function SearchBar(props) {
    const [text, setText] = useState("")
    const [dataSuggestion, setDataSuggestion] = useState(null)

    useEffect(() => {
        let arr = []
        props?.suggestionData?.map((data) => {
            let obj = {
                id: data.id,
                title: data.text
            }
            arr.push(obj)
        })
        if (arr.length > 0) {
            setDataSuggestion([...arr])
        }
    }, [props?.suggestionData])


    return (
        <View style={styles.homeSearchContainer}>
            <View style={styles.homeSearchs}>
                <FastImage style={styles.searchImage} source={SearchIcon} resizeMode="contain" />
                <AutocompleteDropdown
                    useFilter={false}
                    clearOnFocus={false}
                    //closeOnBlur={true}
                    closeOnSubmit={true}
                    onSelectItem={item => {
                        item && props.handleSelectedSuggestion(item?.title)
                    }}
                    debounce={400}
                    onChangeText={(text) => {
                        props.handleChangeSuggestion(text)

                    }}
                    onSubmit={item => {
                        item && props.handleSelectedSuggestion(item?.nativeEvent?.text)

                    }}
                    dataSet={dataSuggestion}
                    showChevron={false}
                    showClear={true}
                    emptyResultText={strings.common.noResult}
                    onClear={() => {
                        setText("")
                        props.handleClear()
                    }}
                    suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                    textInputProps={{
                        returnKeyType: 'search',
                        autoFocus: props?.focus,
                        placeholder: strings.common.searchProduct,
                        placeholderTextColor: "'rgba(224, 77, 1, 0.6)'",
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {
                            color: 'rgba(224, 77, 1, 1)',
                            paddingLeft: (45),
                            fontFamily: GlobalStyle.fontSet.Poppins400,
                            fontSize: (16),
                            overflow: 'hidden',
                            padding: 0,
                        },
                    }}
                    inputContainerStyle={styles.inputSearchContainer}
                    containerStyle={styles.searchBox}
                    suggestionsListContainerStyle={styles.searchList}
                    suggestionsListTextStyle={styles.searchListText}
                />
            </View>

        </View>
    );
}
