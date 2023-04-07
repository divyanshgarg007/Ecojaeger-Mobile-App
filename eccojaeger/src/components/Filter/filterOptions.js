/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { strings } from '../../localization';
import { styles } from './filter.style';

export default function FilterOptions(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedSub, setIsExpandedSub] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleSelected = (id, type, ID) => {
        let checkedData = props?.isSelectedChild?.filter(data => data === id);
        if (!(checkedData?.length > 0)) {
            if (type === 'Options') {
                props.setFilterData({ ...props.filterData, [`${id}`]: 1 })
            } else if (type === 'producers' || type === 'Origin') {
                props.setFilterData({ ...props.filterData, [`${type}`]: [...props?.filterData[`${type}`], ID] })
            } else {
                props.setFilterData({ ...props.filterData, [`${type}`]: [...props?.filterData[`${type}`], id] })
            }
            props.setSelectionChild([...props.isSelectedChild, id]);
        } else
            if (checkedData?.length > 0) {
                if (type === 'Options') {
                    props.setFilterData({ ...props.filterData, [`${id}`]: 0 })
                } else if (type === 'producers' || type === 'Origin') {
                    props.setFilterData({ ...props.filterData, [`${type}`]: props?.filterData[`${type}`]?.filter(item => item !== ID) })
                } else {
                    props.setFilterData({ ...props.filterData, [`${type}`]: props?.filterData[`${type}`]?.filter(item => item !== id) })
                }
                props.setSelectionChild(props.isSelectedChild.filter(data => data !== id));
            }
    };
    const handleSelectCategories = () => {
        setIsExpanded(!isExpanded);
    };
    const handleSelectSubCategories = (id) => {
        if (isExpandedSub !== id) {
            setIsExpandedSub(id);
        } else {
            setIsExpandedSub(null)
        }

    };
    const sortMethod = (data) => {
        let sortedData = data?.sort((a, b) => {
            return a?.name?.localeCompare(b?.name);
        });
        return sortedData
    }

    return (
        <View style={isExpanded ? styles.categoryContainerActive : styles.categoryContainer}>
            <Pressable style={styles.allCategoriesBox} onPress={() => handleSelectCategories()}>
                <Text style={isExpanded ? styles.allCategoriesActive : styles.allCategoriesFilter}>{strings.common.filterOptions}</Text>
                <Icon
                    name={'keyboard-arrow-down'}
                    color={isExpanded ? '#E04D01' : '#E04D01'}
                    size={(25)}
                />
            </Pressable>
            {isExpanded &&
                <View>
                    {props?.filter && sortMethod(props?.filter)?.map((item, index) => (
                        <Pressable onPress={() => handleSelectSubCategories(item.parameterName)} key={index}>
                            <View style={styles.subCategoriesBox} key={index} >
                                <Text style={isExpandedSub === item.parameterName ? styles.subCategoriesActive : styles.subCategories}>{item.name}</Text>
                                <Icon
                                    name={isExpandedSub === item.parameterName ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                    color={isExpandedSub === item.parameterName ? '#E04D01' : '#A0A3BD'}
                                    size={(25)}
                                />
                            </View>
                            {isExpandedSub === item.parameterName && item.parameterName !== 'Options' &&
                                <View>
                                    {item?.values && sortMethod(item?.values)?.map((data, index) => (
                                        <Pressable style={styles.subInnerCategoriesBox} key={index}>
                                            <CheckBox
                                                checked={props.isSelectedChild.includes(data.value)}
                                                onPress={() => handleSelected(data?.value, item.parameterName, data?.id)}
                                                containerStyle={styles.subInnerCheckbox}
                                                checkedIcon={
                                                    <View style={styles.uncheck}>
                                                        <View style={styles.check} />
                                                    </View>
                                                }
                                                uncheckedIcon={<View style={styles.uncheck} />}
                                                checkedColor="red"
                                                style={styles.check}
                                                title={
                                                    <Text style={props.isSelectedChild.includes(data.value) ? styles.subInnerCategoriesActive : styles.subInnerCategories}>{data?.value} ({data?.count})</Text>
                                                }
                                            />
                                        </Pressable>
                                    ))}
                                </View>
                            }
                            {isExpandedSub === item.parameterName && item.parameterName === 'Options' &&
                                <View>
                                    {item?.values?.map((data, index) => (
                                        <View key={index}>{data?.parameterName !== 'New Product' &&
                                            <Pressable style={styles.subInnerCategoriesBox} key={index}>
                                                <CheckBox
                                                    checked={props.isSelectedChild?.includes(data?.parameterName)}
                                                    onPress={() => handleSelected(data?.parameterName, item?.parameterName, data?.id)}
                                                    containerStyle={styles.subInnerCheckbox}
                                                    checkedIcon={
                                                        <View style={styles.uncheck}>
                                                            <View style={styles.check} />
                                                        </View>
                                                    }
                                                    uncheckedIcon={<View style={styles.uncheck} />}
                                                    checkedColor="red"
                                                    style={styles.check}
                                                    title={
                                                        <Text style={props.isSelectedChild?.includes(data?.parameterName) ? styles.subInnerCategoriesActive : styles.subInnerCategories}>{data?.value} ({data?.count})</Text>
                                                    }
                                                />
                                            </Pressable>
                                        }
                                        </View>

                                    ))}
                                </View>
                            }
                        </Pressable>
                    ))}
                </View>
            }
        </View>
    );
}
