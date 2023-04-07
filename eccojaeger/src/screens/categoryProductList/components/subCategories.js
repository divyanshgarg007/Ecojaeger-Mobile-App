/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { styles } from '../categoryProductList.style';

export default function SubCategories(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let subCategories = []
  subCategories.push('All')
  props.item?.values?.subCategories?.map((data) => {
    subCategories.push(data.name)
  })

  const handleChange = (value) => {
    let data
    if (value === 0) {
      data = props.item?.values?.currentCategories
    } else {
      data = props.item?.values?.subCategories[value - 1]
    }
    props.handleChangeCategory(data)
  }
  return (
    <View style={{ height: 60 }} >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.subCategoryContainer}>
        <ButtonGroup
          buttons={subCategories}
          selectedIndex={selectedIndex}
          onPress={value => {
            setSelectedIndex(value);
            handleChange(value)
          }}
          containerStyle={styles.buttonContainer}
          innerBorderStyle={styles.innerBtn}
          buttonStyle={styles.categoriesBtn}
          buttonContainerStyle={styles.containerButton}
          textStyle={styles.btnText}
          selectedButtonStyle={styles.selectedBtn}
        />
      </ScrollView>
    </View>
  );
}
