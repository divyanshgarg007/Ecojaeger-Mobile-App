/* eslint-disable prettier/prettier */
import { AUTH_ACTION_TYPES } from './actionsType';
import * as authServices from '../../services/authServices';
import { setToken } from '../../utilities/utils';

export const resetProductListPaginationInfo = data => {
  return {
    type: AUTH_ACTION_TYPES.RESET_PRODUCT_LIST_PAGINATION_INFO,
    payload: data,
  };
};

export const setUserLanguage = data => {
  return {
    type: AUTH_ACTION_TYPES.SET_USER_LANGUAGE,
    payload: data,
  };
};

export const setAccountId = data => {
  return {
    type: AUTH_ACTION_TYPES.SET_ACCOUNT_ID,
    payload: data,
  };
};

const loginRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_REQUEST,
  };
};

const loginSuccess = data => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
    payload: error,
  };
};

export const loginAction = data => async dispatch => {
  dispatch(loginRequest());
  try {
    const responseData = await authServices.login(data);
    if (responseData?.status === true) {
      dispatch(loginSuccess(responseData));
      setToken('token', responseData?.data?.tokenNumber);
    } else {
      dispatch(loginFailure(responseData));
    }
  } catch (error) {
    dispatch(loginFailure(error?.response?.data));
  }
};
/// cleanup
const loginErrorRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGIN_CLEANUP_FAILURE,
  };
};
export const loginErrorAction = () => async dispatch => {
  dispatch(loginErrorRequest());
};

///Buyer List
const buyerListRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.BUYER_LIST_REQUEST,
  };
};

const buyerListSuccess = data => {
  return {
    type: AUTH_ACTION_TYPES.BUYER_LIST_SUCCESS,
    payload: data,
  };
};

const buyerListFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.BUYER_LIST_FAILURE,
    payload: error,
  };
};

export const buyerListAction = data => async dispatch => {
  dispatch(buyerListRequest());
  try {
    const responseData = await authServices.buyerList(data);
    if (responseData?.status === true) {
      dispatch(buyerListSuccess(responseData));
      setToken('buyerId', responseData?.data[0]?.id?.toString())
      ///actions.resetProductListPaginationInfo()
      //dispatch(resetProductListPaginationInfo(responseData));
    } else {
      dispatch(buyerListFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(buyerListFailure(error?.response?.data));
  }
};

//USER LOGOUT ACTION
export const logoutAction = () => {
  return {
    type: AUTH_ACTION_TYPES.USER_LOGGED_OUT,
    payload: undefined,
  };
};