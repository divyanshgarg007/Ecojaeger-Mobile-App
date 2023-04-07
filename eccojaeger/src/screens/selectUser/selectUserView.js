/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './selectUser.style';
import { setToken } from '../../utilities/utils';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { strings } from '../../localization';


function SelectUserView(props) {
  const network = useSelector(state => state.rootReducers?.productState.network);
  const authState = useSelector((state) => state.rootReducers?.authState);
  return (
    <View>
      <SelectDropdown
        data={authState?.buyingList?.data?.data}
        renderDropdownIcon={() => (
          <Icon size={20} name="chevron-down" type="entypo" />
        )}
        disabled={(authState?.buyingList?.data?.data?.length === 1)}
        buttonTextStyle={styles.userselectItem}
        buttonStyle={styles.userselectBtn}
        rowTextStyle={styles.userdropDownBoxItem}
        rowStyle={styles.userdropDownBox}
        defaultButtonText={props?.selectedData && props?.selectedData !== undefined ? props?.selectedData : 'Select Shop'}
        //selectedRowTextStyle={{ color: '#E04D01' }}
        onSelect={(selectedItem, index) => {
          if (network?.isConnected) {
            props.toggleOverlay();
            setToken('buyerId', selectedItem?.id?.toString());
            props.actions.setAccountId(selectedItem?.id?.toString());
            //props.actions.resetProductListPaginationInfo()

          } else {
            alert(strings.common.offlineMessage)
          }

        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
      />
    </View>
  );
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(SelectUserView);
