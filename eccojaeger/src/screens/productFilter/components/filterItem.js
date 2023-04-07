/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { styles } from '../productFilter.style';

export default function FilterItem(props) {
  const [isSelected, setSelection] = useState(false);

  const handleSelected = (id, type, ID) => {
    let checkedData = props?.isSelectedChild?.filter(data => data === id);
    if (!(checkedData?.length > 0)) {
      if (type === 'Options') {
        props.setFilterData({ ...props.filterData, [`${id}`]: 1 })
      } else if (type === 'producers' || type === 'Origin') {
        props.setFilterData({ ...props.filterData, [`${type}`]: [...props?.filterData[`${type}`], ID] })
      }
      else if (type === 'Categories') {
        props.setFilterData({ ...props.filterData, Category: ID })
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
    if (type === 'Categories') {
      props.handleCategoryFilter(ID)
    }
  };

  return (
    <View style={styles.innerFilterContainer}>
      {props?.item?.type === "Categories" && props?.category &&
        <Pressable
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
          style={styles.checkboxContainer}>
          <Text style={isSelected ? styles.filterLabelOpen : styles.filterLabel}>
            {props.title}
          </Text>
          <Icon
            name={isSelected ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            color="#000000"
            size={25}
          />
        </Pressable>
      }
      {props?.item?.type !== "Categories" && props?.item?.values?.length > 0 &&
        <Pressable
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
          style={styles.checkboxContainer}>
          <Text style={isSelected ? styles.filterLabelOpen : styles.filterLabel}>
            {props?.title}
          </Text>
          <Icon
            name={isSelected ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            color="#000000"
            size={25}
          />
        </Pressable>
      }
      {isSelected && props?.item?.type === "checkbox" && props?.item?.parameterName !== 'Options' && (
        <View>
          {props?.item?.values?.map((item, index) => (
            <View style={styles.childCheckboxContainer} key={index}>
              <CheckBox
                checked={props.isSelectedChild.includes(item.value)}
                onPress={() => handleSelected(item?.value, props?.item?.parameterName, item?.id)}
                containerStyle={styles.childCheckbox}
                checkedIcon={
                  <View style={styles.uncheck}>
                    <View style={styles.check} />
                  </View>
                }
                uncheckedIcon={<View style={styles.uncheck} />}
                checkedColor="red"
                style={styles.check}
                title={
                  <Text style={[styles.childFilterLabel, styles.noCategory]}>{item?.value}</Text>
                }
              />
            </View>
          ))}
        </View>
      )}
      {isSelected && props?.item?.type === "checkbox" && props?.item?.parameterName === 'Options' && (
        <View>
          {props?.item?.values?.map((item, index) => (
            <View style={styles.childCheckboxContainer} key={index}>
              <CheckBox
                checked={props.isSelectedChild?.includes(item?.parameterName)}
                onPress={() => handleSelected(item?.parameterName, props?.item?.parameterName, item?.id)}
                containerStyle={styles.childCheckbox}
                checkedIcon={
                  <View style={styles.uncheck}>
                    <View style={styles.check} />
                  </View>
                }
                uncheckedIcon={<View style={styles.uncheck} />}
                checkedColor="red"
                style={styles.check}
                title={
                  <Text style={[styles.childFilterLabel, styles.noCategory]}>{item?.value}</Text>
                }
              />
            </View>
          ))}
        </View>
      )}
      {isSelected && props?.item?.type === "Categories" && props?.category && (
        <View>
          {props?.item?.values?.parentCategories && props?.item?.values?.parentCategories.map((data, item) => {
            return <View style={styles.allCategories} key={item}>
              <Icon
                name={'keyboard-arrow-left'}
                color="#000000"
                size={25}
              />

              <Pressable style={styles.appendChilds} onPress={() => handleSelected(data?.value, props?.item?.name, data?.id)}>
                < Text style={!props.isSelectedChild ? styles.childFilterLabelUp : styles.activeCategory}>{data?.name}</Text>
              </Pressable>
            </View>
          })}

          <View style={styles.allCategories}>
            <Icon
              name={'keyboard-arrow-left'}
              color="#000000"
              size={25}
            />

            <Text style={!props.isSelectedChild ? styles.childFilterLabelUp : styles.activeCategory}>{props?.item?.values?.currentCategories?.name}</Text>
          </View>

          {props?.item?.values?.subCategories?.map((item, index) => (
            <Pressable style={styles.filterChilds} key={index} onPress={() => handleSelected(item.name, props?.item?.name, item.id)}>
              <Text style={!props.isSelectedChild.includes(item.id) ? styles.childFilterLabel : styles.activeChild}>{item.name}</Text>
            </Pressable>
          ))}

        </View>
      )
      }
    </View >
  );
}
