/* eslint-disable prettier/prettier */
import { CART_ACTION_TYPES } from './actionsType';
import * as cartServices from '../../services/cartServices';

///Cart list
const cartListRequest = () => {
  return {
    type: CART_ACTION_TYPES.CART_LIST_REQUEST,
  };
};

const cartListSuccess = data => {
  return {
    type: CART_ACTION_TYPES.CART_LIST_SUCCESS,
    payload: data,
  };
};

const cartListFailure = error => {
  return {
    type: CART_ACTION_TYPES.CART_LIST_FAILURE,
    payload: error,
  };
};

export const cartListAction = type => async dispatch => {
  dispatch(cartListRequest());
  try {
    const responseData = await cartServices.cartList(type);
    if (responseData?.status === true) {
      dispatch(cartListSuccess(responseData));
    } else {
      dispatch(cartListFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(cartListFailure(error?.response?.data));
  }
};

///Add product from buying list to Cart list
export const addCartBuyingAction =
  (data, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.addCartBuying(data);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(cartListAction(1));
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Add product to Cart
export const addCartAction = (data, onSuccess, onError) => async dispatch => {
  try {
    const responseData = await cartServices.addCart(data);
    if (responseData?.status === true) {
      onSuccess(responseData);
      dispatch(cartListAction(1));
    } else {
      onError(responseData.errors);
    }
  } catch (error) {
    onError(error?.response?.data);
  }
};

//Offline: Add product from buying list 
export const addItemToCartOffline = data => {
  return {
    type: CART_ACTION_TYPES.ADD_ITEM_TO_CART_OFFLINE,
    payload: data,
  };
};

export const emptyCartOffline = data => {
  return {
    type: CART_ACTION_TYPES.EMPTY_CART_OFFLINE,
    payload: null,
  };
};

export const replaceCartOffline = data => {
  return {
    type: CART_ACTION_TYPES.REPLACE_CART_OFFLINE,
    payload: data,
  };
};

export const storePlaceOrderStatus = data => {
  return {
    type: CART_ACTION_TYPES.STORE_PLACE_ORDER_STATUS,
    payload: data,
  };
};

///Delete product from Cart
export const removeCartAction =
  (data, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.removeCart(data);
      if (responseData?.status === true) {
        onSuccess(responseData, data.id);
        dispatch(cartListAction(1));
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Add comment
export const addCommentAction =
  (data, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.addComment(data);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(cartListAction(1));
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Order list
const orderListRequest = () => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_REQUEST,
  };
};

const orderListSuccess = data => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_SUCCESS,
    payload: data,
  };
};

const orderListFailure = error => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_FAILURE,
    payload: error,
  };
};

export const orderListAction = data => async dispatch => {
  dispatch(orderListRequest());
  try {
    const responseData = await cartServices.orderList(data);
    if (responseData?.status === true) {
      dispatch(orderListSuccess(responseData));
    } else {
      dispatch(orderListFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(orderListFailure(error?.response?.data));
  }
};
//Load more cart
const orderListLoadRequest = () => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_LOAD_REQUEST,
  };
};

const orderListLoadSuccess = data => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_LOAD_SUCCESS,
    payload: data,
  };
};

const orderListLoadFailure = error => {
  return {
    type: CART_ACTION_TYPES.ORDER_LIST_LOAD_FAILURE,
    payload: error,
  };
};

export const orderListLoadAction = data => async dispatch => {
  dispatch(orderListLoadRequest());
  try {
    const responseData = await cartServices.orderList(data);
    if (responseData?.status === true) {
      dispatch(orderListLoadSuccess(responseData));
    } else {
      dispatch(orderListLoadFailure(responseData.errors));
    }
  } catch (error) {
    dispatch(orderListLoadFailure(error?.response?.data));
  }
};

//Page cart count
const pageCartActionRequest = data => {
  return {
    type: CART_ACTION_TYPES.PAGE_CART_REQUEST,
    payload: data,
  };
};
export const pageCartAction = data => async dispatch => {
  dispatch(pageCartActionRequest(data));
};
///Create order
export const createOrderAction =
  (data, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.createOrder(data);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(cartListAction(1));
        dispatch(pageCartAction(1));
        dispatch(orderListAction(1));
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Reorder from cart list
export const reorderCartAction =
  (orderNumber, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.reorderCart(orderNumber);
      if (responseData?.status === true) {
        onSuccess(responseData);
        dispatch(cartListAction(1));
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

///Cleanup cart
const cleanUpCartListRequest = () => {
  return {
    type: CART_ACTION_TYPES.CLEAN_UP_CART_REQUEST,
  };
};
export const cleanUpCartList = () => async dispatch => {
  dispatch(cleanUpCartListRequest());
};

//Order details
export const orderDetailsAction =
  (orderNumber, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.orderDetails(orderNumber);
      if (responseData?.status === true) {
        onSuccess(responseData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

//Download Cart pdf 
export const downloadCartAction =
  (onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.downloadCart();
      if (responseData?.status === true) {
        onSuccess(responseData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };

//Download Order pdf 
export const downloadOrderAction =
  (id, onSuccess, onError) => async dispatch => {
    try {
      const responseData = await cartServices.downloadOrder(id);
      if (responseData?.status === true) {
        onSuccess(responseData);
      } else {
        onError(responseData.errors);
      }
    } catch (error) {
      onError(error?.response?.data);
    }
  };