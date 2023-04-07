/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import ListIcon from '../../assets/images/listIcon.png';
import { Button, Card } from 'react-native-elements';
import { styles } from './myList.style';
import FastImage from 'react-native-fast-image'

export default function MyListView() {
  return (
    <View style={styles.mylistContainer}>
      <Card containerStyle={styles.mylistcardBox}>
        <Text style={styles.mylistText}>My Lists</Text>
        <FastImage style={styles.mylistInfoBox} source={ListIcon} />
        <View>
          <Text style={styles.mylistname}>NO LIST CREATED YET....</Text>
          <Text style={styles.mylistCategory}>
            No worries. Start saving as you shop by selecting the add List and
            create your List.
          </Text>
        </View>
        <View>
          <Button buttonStyle={styles.mylistBtn} title="ADD LIST" />
        </View>
      </Card>
    </View>
  );
}
