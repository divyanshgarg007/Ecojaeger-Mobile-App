/* eslint-disable prettier/prettier */
import axios from 'axios';
import { getToken } from '../../utilities/utils';
import { getBaseUrl } from '../../utilities/utils';
import { API_CONSTANTS } from '../../constants/constants';

const apiInstance = axios.create({
  baseURL: API_CONSTANTS.BASE_URL, // for development
  // baseURL: API_CONSTANTS.BASE_URL', // for production
});

apiInstance.interceptors.request.use(async config => {
  let token1, accountId
  await getToken('token').then(data => { token1 = data })
  await getToken('buyerId').then(data => { accountId = data })
  config.headers.tokenNumber = token1 && token1 !== undefined ? token1 : '';
  config.headers.buyerAccountId = accountId && accountId !== undefined ? accountId : '35765';
  ////console.log("HEADER: ", config.headers)
  return config;
});

apiInstance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default apiInstance;
