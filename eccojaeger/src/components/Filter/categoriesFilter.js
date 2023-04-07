/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { styles } from './filter.style';
import { strings } from '../../localization';
import normalize from 'react-native-normalize';
export default function CategoriesFilter(props) {
    const [isExpandedSub, setIsExpandedSub] = useState(false);
    const [isHideFilter, hideFilter] = useState(true);

    const [isSelected, setSelection] = useState(false);

    const handleSelected = (id, type, ID) => {
        let checkedData = props?.isSelectedChild?.filter(data => data === ID);
        if (!(checkedData?.length > 0)) {
            props?.setSelectionChild([...props?.isSelectedChild, ID]);
            props.setFilterData({ ...props.filterData, Category: ID })
        } else
            if (checkedData?.length > 0) {
                props?.setSelectionChild(props?.isSelectedChild.filter(data => data !== ID));
                props.setFilterData({ ...props.filterData, [`${type}`]: props?.filterData[`${type}`]?.filter(item => item !== ID) })
            }
        if (type === 'Categories') {
            props.handleCategoryFilter(ID)
        }
    };

    const [isSubFilterSelected, setSubFilter] = useState(true)
    const sortMethod = (data) => {
        let sortedData = data?.sort((a, b) => {
            return a?.name?.localeCompare(b?.name);
        });
        return sortedData
    }

    let data = props?.filter?.values?.parentCategories ? props?.filter?.values?.parentCategories[0] : props?.filter?.values?.currentCategories
    return (
        <View style={isSelected ? styles.categoryContainerActive : styles.categoryContainer}>
            <Pressable style={styles.allCategoriesBox}
                onPress={isSelected ? () => handleSelected(data.name, props?.filter?.type, data.id) : () => setSelection(!isSelected)}
            >
                <Text style={isSelected ? styles.allCategoriesActive : styles.allCategoriesFilter}>{data?.name}</Text>
                <Icon
                    name={'keyboard-arrow-down'}
                    color={isSelected ? '#E04D01' : '#E04D01'}
                    size={(25)}
                    onPress={() => setSelection(!isSelected)}
                />
            </Pressable>
            {isSelected &&
                <View>
                    {/* PARENT CATEGORIES */}
                    {props?.filter?.values?.parentCategories && sortMethod(props?.filter?.values?.parentCategories)?.map((item, index) => {
                        return <View key={item?.name}>
                            {item.name !== strings.common.allCategories &&
                                <Pressable onPress={() => handleSelected(item?.name, props?.filter?.name, item?.id)} key={item.id}
                                >
                                    <View style={props?.filter?.values?.parentCategories?.length > 1 ? styles.subCategoriesBox : styles.multipleParent} key={item.id} >
                                        <Text style={styles.subCategoriesActive}>{item.name}</Text>
                                        <Icon
                                            name={props?.filter?.values?.parentCategories?.length > 1 ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                            color={props?.filter?.values?.parentCategories?.length > 1 ? '#E04D01' : '#000'}
                                            size={(25)}
                                            iconStyle={props?.filter?.values?.parentCategories?.length > 1 ? styles.onParentActive : styles.onParent}
                                            onPress={props?.filter?.values?.parentCategories?.length - 1 === index ? () => hideFilter(!isHideFilter) : null}
                                        />
                                    </View>
                                </Pressable>
                            }

                        </View>
                    })}
                    {isHideFilter &&
                        <>
                            {/* current */}
                            {props?.filter?.values?.currentCategories?.name !== strings.common.allCategories &&
                                <Pressable
                                    style={props?.filter?.values?.parentCategories?.length > 1 ? styles.boxCurrent : null}
                                >
                                    {!props?.filter?.values?.subCategories &&
                                        <CheckBox
                                            checked={true}
                                            // onPress={() => handleSelectFilterData(subdata.id)}
                                            containerStyle={styles.subInnerCheckbox}
                                            checkedIcon={
                                                <View style={styles.uncheckSubInner}>
                                                    <View style={styles.checkSubInner} />
                                                </View>
                                            }
                                            uncheckedIcon={<View style={styles.uncheckSubInner} />}
                                            checkedColor="red"
                                            style={styles.checkSubInner}
                                            title={
                                                <Text style={!props?.isSelectedChild.includes(props?.filter?.values?.currentCategories?.id) ? styles.currentCatLabelActive : styles.currentCatLabel}>{props?.filter?.values?.currentCategories?.name}</Text>
                                            }
                                        />
                                    }

                                    {props?.filter?.values?.subCategories &&
                                        <Pressable style={styles.currentCategoryBox}>
                                            <Text style={props?.filter?.values?.subCategories ? styles.allCategoriesActive : styles.allCategories}>
                                                {props?.filter?.values?.currentCategories?.name}</Text>
                                            <Icon
                                                name={'keyboard-arrow-down'}
                                                color={props?.isSelectedChild ? '#E04D01' : '#000'}
                                                size={(25)}
                                                onPress={() => setSubFilter(!isSubFilterSelected)}
                                            />
                                        </Pressable>
                                    }

                                </Pressable>
                            }
                            {/* SUB CATEGORIES */}

                            {isSubFilterSelected && props?.filter?.values?.subCategories && sortMethod(props?.filter?.values?.subCategories)?.map((item, index) => (
                                <Pressable key={item.id} onPress={() => handleSelected(item.name, props?.filter?.type, item.id)}
                                    style={props?.filter?.values?.parentCategories?.length > 1 ? styles.subCatTouch : null}
                                >
                                    <View style={styles.subCategoriesBox} key={item.id} >
                                        {props?.filter?.values?.parentCategories && item?.isChildren === 0 &&
                                            <CheckBox
                                                //checked={props?.isSelectedChild.includes(item.name)}
                                                onPress={() => handleSelected(item.name, props?.filter?.type, item.id)}
                                                containerStyle={styles.subInnerCheckbox}
                                                checkedIcon={
                                                    <View style={styles.uncheckSubInner}>
                                                        <View style={styles.checkSubInner} />
                                                    </View>
                                                }
                                                uncheckedIcon={<View style={styles.uncheckSubInner} />}
                                                checkedColor="red"
                                                style={styles.checkSubInner}
                                                title={
                                                    <Text style={styles.subCatLabel}>{item.name}</Text>
                                                }
                                            />
                                        }
                                        {props?.filter?.values?.parentCategories && item?.isChildren === 1 &&
                                            <View style={styles.lastItem}>
                                                <Icon
                                                    name={'keyboard-arrow-down'}
                                                    color={'#E04D01'}
                                                    size={(25)}
                                                    //iconStyle={styles.subIcon}
                                                    onPress={() => handleSelected(item.name, props?.filter?.type, item.id)}
                                                />
                                                <Text style={isExpandedSub === item.id ? styles.allsubCategoriesActive : styles.allsubCategories}>{item.name}</Text>

                                            </View>
                                        }
                                        {!props?.filter?.values?.parentCategories &&
                                            <>
                                                <Text style={isExpandedSub === item.id ? styles.subCategoriesActive : styles.subCategories}>{item.name}</Text>
                                                <Icon
                                                    name={isExpandedSub === item.id ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                                    color={isExpandedSub === item.id ? '#E04D01' : '#A0A3BD'}
                                                    size={(25)}
                                                    iconStyle={isExpandedSub === item.id ? styles.subIconActive : styles.subIcon}
                                                />
                                            </>
                                        }
                                    </View>
                                </Pressable>
                            ))}
                        </>
                    }
                </View>
            }
        </View>
    );
}

