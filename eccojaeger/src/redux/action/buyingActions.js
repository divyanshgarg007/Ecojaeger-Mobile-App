/* eslint-disable prettier/prettier */
import { BUYING_ACTION_TYPES } from './actionsType';
import * as buyingServices from '../../services/buyingServices';

///Create buying list
const buyingCreateRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_CREATE_REQUEST,
  };
};

const buyingCreateSuccess = data => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_CREATE_SUCCESS,
    payload: data,
  };
};

const buyingCreateFailure = error => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_CREATE_FAILURE,
    payload: error,
  };
};

export const buyingCreateAction =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(buyingCreateRequest());
    try {
      const responseData = await buyingServices.buyingCreate(data);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(buyingListAction());
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Buying list
const buyingListRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_REQUEST,
  };
};

const buyingListSuccess = data => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_SUCCESS,
    payload: data,
  };
};

const buyingListFailure = error => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_FAILURE,
    payload: error,
  };
};

export const buyingListAction = data => async dispatch => {
  dispatch(buyingListRequest());
  try {
    const responseData = await buyingServices.buyingList(data);
    if (responseData?.status === true) {
      dispatch(buyingListSuccess(responseData));
    } else {
      dispatch(buyingListFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(buyingListFailure(error?.response?.data));
  }
};

///Remove Buying list data
const buyingRemoveRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_REMOVE_REQUEST,
  };
};

const buyingRemoveSuccess = data => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_REMOVE_SUCCESS,
    payload: data,
  };
};

const buyingRemoveFailure = error => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_REMOVE_FAILURE,
    payload: error,
  };
};

export const buyingRemoveAction =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(buyingRemoveRequest());
    try {
      const responseData = await buyingServices.buyingRemove(data);
      if (responseData?.status === true) {
        onSuccess(responseData, data.id);
        dispatch(buyingListAction());
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Product Buying list data
const buyingProductListRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_REQUEST,
  };
};

const buyingProductListSuccess = data => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_SUCCESS,
    payload: data,
  };
};

const buyingProductListFailure = error => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_FAILURE,
    payload: error,
  };
};


export const buyingProductListAction = (data, sort, onSuccess, onError) => async dispatch => {
  dispatch(buyingProductListRequest());
  try {
    const responseData = await buyingServices.buyingProductList(data.id, sort);
    if (responseData?.status === true) {
      //onSuccess(responseData, data);
      dispatch(buyingProductListSuccess(responseData));
      if (onSuccess) {
        onSuccess(responseData, data);
      }

    } else {
      //onError(responseData.errors);
      dispatch(buyingProductListFailure(responseData.errors));
    }
  } catch (error) {
    //onError(error?.response?.data);
    dispatch(buyingProductListFailure(error?.response?.data));
    if (onError) {
      onError(error?.response?.data);
    }

  }
};

///Remove Product Buying list data
const buyingProductRemoveRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_REQUEST,
  };
};

const buyingProductRemoveSuccess = data => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_SUCCESS,
    payload: data,
  };
};

const buyingProductRemoveFailure = error => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_FAILURE,
    payload: error,
  };
};

export const buyingProductRemoveAction =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(buyingProductRemoveRequest());
    try {
      const responseData = await buyingServices.buyingProductRemove(data);
      dispatch(buyingProductListAction(data, 0))
      if (responseData?.status === true) {
        onSuccess(responseData, data.productId);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };
//props.actions.buyingProductListAction(item, 0);
///Add Product on Buying list

export const buyingAddProductAction =
  (data, onSuccess, onError, buyingData) => async dispatch => {
    try {
      const responseData = await buyingServices.buyingAddProduct(data);
      dispatch(buyingProductListAction(data, 0))
      if (responseData?.status === true) {
        onSuccess(responseData, buyingData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Cleanup cart
const cleanUpBuyingListRequest = () => {
  return {
    type: BUYING_ACTION_TYPES.CLEAN_UP_BUYING_REQUEST,
  };
};
export const cleanUpBuyingList = () => async dispatch => {
  dispatch(cleanUpBuyingListRequest());
};

//Change Buying list item ordering action
const productBuyingListItem = (data, id) => {
  return {
    type: BUYING_ACTION_TYPES.BUYING_PRODUCT_LIST_ITEM,
    payload: data,
    id: id
  };
};

export const buyingChangeOrderingAction =
  (data, onSuccess, onError, buyingData, id) => async dispatch => {
    try {
      const responseData = await buyingServices.buyingChangeOrdering(data);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(productBuyingListItem(buyingData, id))
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

//Download Buying pdf 
export const downloadBuyingAction =
  (id, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await buyingServices.downloadBuying(id);
      if (responseData?.status === true) {
        onSuccess(responseData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

//Update quantity buying list
export const quantityUpdateBuyingAction =
  (id, onSuccess, onError, data) => async dispatch => {
    try {
      const responseData = await buyingServices.quantityUpdate(id);
      dispatch(buyingProductListAction(data, 0))
      if (responseData?.status === true) {
        onSuccess(responseData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };