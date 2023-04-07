/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../../localization';
import { styles } from '../contactUs.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/action';
import { NoInternet } from '../../../components';

function ContactInfo(props) {
  const network = useSelector(state => state.rootReducers?.productState.network);
  return (
    <View style={styles.contactInfoBox}>
      {!network?.isConnected && <NoInternet />}
      <Text style={styles.contactInfoTitle}>
        {strings.common.contactInfo}
      </Text>
      <Text style={styles.contactDetails}><Text style={styles.label}>{strings.common.phone}:</Text> 081 303 84 84</Text>
      <Text style={styles.contactDetails}>
        <Text style={styles.contactDetails}><Text style={styles.label}>{strings.common.email}:</Text></Text> bestellung@ecco-jaeger.ch
      </Text>
      <Text style={styles.contactDetails}>
        <Text style={styles.label}>{strings.common.address}:</Text> ecco-jäger Früchte und Gemüse AG, Chriesilöserstrasse 65, 7310 Bad Ragaz, Schweiz
      </Text>
    </View>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(null, mapDispatchToProps)(ContactInfo);