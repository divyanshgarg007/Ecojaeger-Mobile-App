/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';
import { CustomButton, CustomTextInput } from '../../components';
import { styles } from './login.style';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { Toasts } from '../../components';
import { strings } from '../../localization';
import { Overlay } from 'react-native-elements';

function LoginView(props) {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const authState = useSelector(state => state.rootReducers?.authState);

  const [type, setType] = useState(null);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const login = () => {
    if (value.length > 0 && password.length > 0) {
      setLoading(true)
      Keyboard.dismiss();
      let obj = {
        username: value,
        password: password,
      };
      props.actions.loginAction(obj);
    }
  }

  useEffect(() => {
    if (authState?.signIn?.data?.data) {
      setLoading(false)
      props.actions.buyerListAction();
      props.actions.resetProductListPaginationInfo()
      props.actions.buyingListAction()
      props.navigation.goBack();
    } else if (authState?.signIn?.error) {
      setAlert(true);
      setMessage(authState?.signIn?.error?.message);
      setType('error');
      setLoading(false)
    }

  }, [authState?.signIn]);

  useEffect(() => {
    return () => {
      props.actions.loginErrorAction();
      setAlert(false);
      setMessage('');
      setType(null);
    };
  }, []);
  const handleHide = () => {
    setAlert(false);
    setMessage('');
    setType(null);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toasts message={message} type={type} show={alert} handleHide={handleHide} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginBox}>{strings.actions.login}</Text>
        <View style={styles.loginInputBox}>
          <CustomTextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={setValue}
            placeholder={strings.common.emailUserName}
            value={value}
            placeholderTextColor="#222222"
          />
        </View>
        <View style={[styles.loginInputBox, styles.fieldSpace]}>
          <CustomTextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={setPassword}
            placeholder={strings.common.password}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#222222"
          />
        </View>
        <CustomButton
          loading={loading}
          buttonStyle={styles.loginBtn}
          titleStyle={styles.actionTitle}
          title={strings.actions.login}
          onPress={() => login()}
        />
      </View>
    </SafeAreaView>

  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(LoginView);
