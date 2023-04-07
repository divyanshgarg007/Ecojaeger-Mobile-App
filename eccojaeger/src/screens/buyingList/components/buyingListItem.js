/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../buyingList.style';
import { AlertDialog, BuyingModal } from '../../../components';
import { NAVIGATION } from '../../../constants';
import { strings } from '../../../localization';
import StarIcon from '../../../assets/images/star.png';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/action';
import { Toasts } from '../../../components';
import FastImage from 'react-native-fast-image'

function BuyingListItem(props) {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editRenameAlert, setEditRenameAlert] = useState(false);
  const [action, setAction] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState(null);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const network = useSelector(state => state.rootReducers?.productState.network);
  const toggleEditRename = (action) => {
    if (network?.isConnected) {
      if (action === 'rename') {
        setValue(props?.item?.name);
      }
      setEditRenameAlert(true);
      setAction(action);
    } else {
      showAlert()
    }

  };
  const toggleAction = () => {
    setEditRenameAlert(!editRenameAlert);
    setValue('');
    setAction('');
  };

  //Rename or copy list
  const onSuccessCreate = (data) => {
    setEditRenameAlert(!editRenameAlert);
    setValue('');
    setAction('');
    setAlert(true);
    setMessage(data.message);
    setType('success');
  };
  const onErrorCreate = (data) => {
    setAlert(true);
    setMessage('Please input the valid name');
    setType('error');
  };
  const handleHide = () => {
    setAlert(false);
    setMessage('');
    setType(null);
  };
  const handleAction = (action) => {
    if (action === 'rename') {
      let obj = {
        name: value,
        requestFrom: 'mob',
        action: 'rename',
        buyingId: props.item?.id,
      };
      props.actions.buyingCreateAction(obj, onSuccessCreate, onErrorCreate);
    } else if (action === 'copy') {
      let obj = {
        name: value,
        requestFrom: 'mob',
        action: 'copy',
        buyingId: props.item?.id,
      };
      props.actions.buyingCreateAction(obj, onSuccessCreate, onErrorCreate);
    }
  };
  const toggleAlert = () => {
    setDeleteAlert(!deleteAlert);
  };
  const toggleAlertDelete = () => {
    if (network?.isConnected) {
      toggleAlert()
    } else {
      showAlert()
    }
  }
  const handleDeleteMethod = () => {
    setDeleteAlert(!deleteAlert);
    props.handleDeleteBuyingMethod(props.item);
  };
  const showAlert = () => {
    return Alert.alert(
      "Alert",
      strings.common.offlineMessage,
      [
        {
          text: 'OK',
        },
      ],
    );
  };
  return (
    <SafeAreaView>
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <View style={styles.buycardBox}>
        <View style={styles.buyproductBox}>
          <Pressable style={styles.buyproductInfoBox} onPress={props.onPress}>
            <FastImage style={[styles.productAdd]}
              resizeMode="contain"
              source={StarIcon} />
            <Text style={styles.buyproName}>{props.item?.name}</Text>
          </Pressable>
          <View style={styles.listActions}>
            <View style={styles.downIcon}>
              <Icon
                size={(20)}
                name="edit"
                type="antdesign"
                onPress={() => toggleEditRename('rename')}
                color="#E04D01CC"
              />
            </View>
            <View style={styles.downIcon}>
              <Icon
                size={(20)}
                name="copy1"
                type="antdesign"
                onPress={() => toggleEditRename('copy')}
                color="#E04D01CC"
              />
            </View>
            <View style={styles.downIcon}>
              <Icon
                size={(20)}
                name="delete"
                type="antdesign"
                onPress={() => toggleAlertDelete()}
                color="#E04D01CC"
              />
            </View>
          </View>
        </View>
      </View>
      <AlertDialog
        visible={deleteAlert}
        toggleOverlay={toggleAlert}
        title={strings.common.delete}
        cancel={strings.actions.no}
        delete={strings.actions.yes}
        deleteMethod={handleDeleteMethod}
      />
      <BuyingModal
        toggleOverlay={toggleAction}
        visible={editRenameAlert}
        action={action}
        handleAction={handleAction}
        title={props.item?.name}
        value={value}
        setValue={setValue}
      />
    </SafeAreaView>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(BuyingListItem);
