/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { CustomButton, CustomTextInput } from '../../components';
import { styles } from './createList.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { strings } from '../../localization'
import { Toasts } from '../../components';

function CreateListView(props) {
  const [value, setValue] = useState('');
  const productState = useSelector(state => state.rootReducers?.productState);
  const [type, setType] = useState(null)
  const [showAlert, setAlert] = useState(false);
  const [message, setMessage] = useState('')

  const onSuccessCreate = (data) => {
    props.navigation.goBack();
  };
  const onErrorCreate = (data) => {
    setAlert(true);
    setMessage('Please input the valid name')
    setType('error')
  };
  const handleHide = () => {
    setAlert(false);
    setMessage('')
    setType(null)
  }
  const handleCreateBuyingList = () => {
    if (productState.network.isConnected && productState.network.isInternetReachable) {
      let obj = {
        name: value,
        requestFrom: 'mob',
        action: 'new'
      };
      props.actions.buyingCreateAction(obj, onSuccessCreate, onErrorCreate);
    } else {
      alert(strings.common.offlineMessage)
    }
  };
  return (
    <View style={styles.createContainer}>
      <Toasts message={message} type={type} show={showAlert} handleHide={handleHide} />
      <Text style={styles.createBox}>{strings.createList.enterListName}</Text>
      <View style={styles.createInputBox}>
        <CustomTextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={setValue}
          placeholder={strings.createList.enterListName}
          placeholderTextColor="#222222"
          value={value}
        />
      </View>

      <CustomButton
        buttonStyle={styles.createBtn}
        titleStyle={styles.titleLight}
        title={strings.actions.addList}
        onPress={() => handleCreateBuyingList()}
      />
    </View>
  );
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(CreateListView);
