/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from './faqs.style';
import FaqsData from '../../assets/mocData/faqsData.json';
import { strings } from '../../localization';

export default function FaqsView() {

  return (
    <ScrollView style={styles.faqsContainer}  contentContainerStyle={{   flex: 1, alignItems: 'center',
    justifyContent: 'center',}}>
    <Text style={styles.contactBox}>{strings.common.noData}</Text>
            {/* {FaqsData.map((item, index) => (
      <View key={index} style={styles.faqsBox}>
        <Text style={styles.faqTitle}>{item.title}</Text>
        <Text style={styles.faqdescription}>{item.description}</Text>
      </View>
        ))} */}
    </ScrollView>
  );
}
