/* eslint-disable prettier/prettier */
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { store } from '../redux/store/store';
import { API_CONSTANTS } from '../constants/constants';
import { de } from '../localization/de';
import { LocaleConfig } from 'react-native-calendars';

export const network = async () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};

export const getToken = async key => {
  let data = await AsyncStorage.getItem(key);
  return data;
};

export const setToken = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};

export const getBaseUrl = () => {
  // const authState = useSelector(state => state.rootReducers?.authState);
  // let lang = authState?.language ? authState?.language : 'de'
  // return `http://159.69.20.10/${lang}/Api/V1/`
  const state = store.getState();
  const lang = state.rootReducers?.authState?.language ? state.rootReducers?.authState?.language : "de"
  //return `http://159.69.20.10/${lang}/Api/V1/`//production
  return `${API_CONSTANTS.BASE_URL}${lang}/Api/V1/`
};

export const getAccountId = () => {
  const state = store.getState();
  return state.rootReducers?.authState?.accountID
}

export const getPrefixUrl = () => {
  const state = store.getState();
  const lang = state.rootReducers?.authState?.language ? state.rootReducers?.authState?.language : "de"
  return `${lang}/Api/V1/`
};

// export const removeToken = async (key) => {
//   return await AsyncStorage.removeItem(key);
// };

// 14/10/2020
// Norbert said: in de the currency symbol should come before amount and comma(,) replace by decimal(.)
export const getFormattedPrice = (price) => {
  if (price >= 0) {
    const state = store.getState();
    const lang = state.rootReducers?.authState?.language ? state.rootReducers?.authState?.language : "de"
    var ePrice = (price.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // if (lang === "de") {
    //   ePrice = ePrice.replace(/[,.]/g, d => d === ',' ? '.' : ',')
    //   return `${ePrice} CHF`
    // }
    return `CHF ${ePrice}`
  }
  return ""
}

export const getPriceCommon = (data) => {
  if (data) {
    // return data?.replace('CHF', '').replace(',', '.')
    return data?.replace('CHF', '')
  }
  return ""
};

export const getPriceApi = (data) => {
  if (data) {
    return `${data}`
  }
  return ""
};

export const loadCalenderConfig = () => {
  LocaleConfig.locales['de'] = {
    monthNames: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'März', 'Apr', 'Mai', 'Juni', 'Juli.', 'Aug', 'Sept', 'Oct', 'Nov', 'Dez'],
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    today: "heute"
  }

  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Moday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: "today"
  }
}
