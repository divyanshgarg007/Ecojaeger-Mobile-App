/* eslint-disable prettier/prettier */
import { PRODUCT_ACTION_TYPES } from './actionsType';
import * as productServices from '../../services/productServices';
import { saveProductItems } from '../../services/db-service';

const productListRequest = () => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_REQUEST,
  };
};

const productListSuccess = data => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};

const productListFailure = error => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_FAILURE,
    payload: error,
  };
};

export const categoryListAction = (data, onSuccess, onError) => async dispatch => {
  dispatch(productListRequest());
  try {
    const responseData = await productServices.categoryList(data);
    if (responseData?.data) {

      dispatch(productListSuccess(responseData));
      onSuccess(true)
    } else {
      dispatch(productListFailure(responseData.errors));
      onError(false)
    }
  } catch (error) {
    dispatch(productListFailure(error?.response?.data));
    onError(false)
  }
};
//Synced data
const productListLoadRequest = (data) => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_REQUEST,
    payload: data
  };
};

export const productListLoadSuccess = data => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_SUCCESS,
    payload: data,
  };
};

const productListLoadFailure = error => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_FAILURE,
    payload: error,
  };
};

export const productListLoadAction = (data, success, error) => async dispatch => {
  dispatch(productListLoadRequest(data));
  try {
    const responseData = await productServices.productList(data);
    if (responseData?.status === true) {
      // if (responseData.data.products?.length > 0) {
      //   success(responseData)
      // }
      success(responseData)
      //dispatch(productListLoadSuccess(responseData));
      //responseData.data.products
    } else {
      dispatch(productListLoadFailure(responseData?.errors));
      error(responseData)
    }
  } catch (error) {
    dispatch(productListLoadFailure(error?.response?.data));
    error(error)
  }
};
/// product details
export const productDetailsAction = (data, onSuccess, onFailure) => async dispatch => {
  try {
    const responseData = await productServices.productDetails(data);
    if (responseData?.status === true) {
      onSuccess(responseData);
    } else {
      onFailure(responseData);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};
//Category
const productListCategoryRequest = () => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_REQUEST,
  };
};

const productListCategorySuccess = data => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_SUCCESS,
    payload: data,
  };
};

const productListCategoryFailure = error => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_FAILURE,
    payload: error,
  };
};

export const productListCategoryAction = (data) => async dispatch => {
  dispatch(productListCategoryRequest());
  try {
    const responseData = await productServices.productList(data);
    if (responseData?.status === true) {
      dispatch(productListCategorySuccess(responseData));
    } else {
      dispatch(productListCategoryFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(productListCategoryFailure(error?.response?.data));
  }
};

//Product list sub-category
export const productListSubCategoryAction = (data, onSuccess, onFailure, page) => async dispatch => {
  try {
    const responseData = await productServices.productList(data);
    if (responseData?.status === true) {
      onSuccess(responseData, page);
    } else {
      onFailure(responseData.errors);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};
///network check
const networkActionRequest = data => {
  return {
    type: PRODUCT_ACTION_TYPES.NETWORK_REQUEST,
    payload: data,
  };
};
export const networkAction = (data) => async dispatch => {
  dispatch(networkActionRequest(data));
};

//Page count
const pageActionRequest = data => {
  return {
    type: PRODUCT_ACTION_TYPES.PAGE_REQUEST,
    payload: data,
  };
};
export const pageAction = (data) => async dispatch => {
  dispatch(pageActionRequest(data));
};

//Product auto suggestion
export const searchAutoSuggestionAction = (data, onSuccess, onFailure) => async dispatch => {
  try {
    const responseData = await productServices.searchAutoSuggestion(data);
    if (responseData?.status === true) {
      onSuccess(responseData);
    } else {
      onFailure(responseData.errors);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};

//Product search
export const searchAction = (data, onSuccess, onFailure, page, category_id) => async dispatch => {
  try {
    const responseData = await productServices.search(data, page + 1, category_id);
    if (responseData?.statusCode === 200) {
      onSuccess(responseData, page);
    } else {
      onFailure(responseData.errors);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};

//Promotion list

export const promotionListAction = (data, onSuccess, onFailure, page) => async dispatch => {
  try {
    const responseData = await productServices.promotionList(data);
    if (responseData?.status === true) {
      onSuccess(responseData, page);
    } else {
      onFailure(responseData.errors);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};

export const saveProductListSyncedTime = data => {
  return {
    type: PRODUCT_ACTION_TYPES.PRODUCT_LIST_SYNC_TIME,
    payload: data,
  };
};

export const resetProductListPaginationInfo = data => {
  return {
    type: PRODUCT_ACTION_TYPES.RESET_PRODUCT_LIST_PAGINATION_INFO,
    payload: data,
  };
};

export const forceSyncProduct = (data) => {
  return {
    type: PRODUCT_ACTION_TYPES.FORCE_SYNC_PRODUCT,
    payload: data,
  };
};

//Sync Api
export const syncAction = (data, onSuccess, onFailure) => async dispatch => {
  try {
    const responseData = await productServices.syncProduct(data);
    if (responseData?.statusCode === "200") {
      onSuccess(responseData);
    } else {
      onFailure(responseData.errors);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};

export const deltaSyncDataAction = (data, onSuccess, onFailure) => async dispatch => {
  try {
    const responseData = await productServices.deltaSyncDataProduct(data);
    if (responseData) {
      onSuccess(responseData);
    } else {
      onFailure(responseData);
    }
  } catch (error) {
    onFailure(error?.response?.data);
  }
};
