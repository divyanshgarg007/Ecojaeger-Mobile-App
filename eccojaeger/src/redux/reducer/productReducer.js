/* eslint-disable prettier/prettier */
import { PRODUCT_ACTION_TYPES } from '../action/actionsType';

const initialState = {
  productList: {
    metaData: [],
    loading: false,
    data: [],
    error: null,
    filterLoading: false
  },
  productListSyncedData: {
    metaData: {},
    loading: false,
    data: [],
    error: null,
    filterLoading: false
  },
  productListCategory: {
    metaData: [],
    loading: false,
    data: [],
    error: null,
  },
  productListSubcategory: {
    metaData: [],
    loading: false,
    data: [],
    error: null,
  },
  network: {},
  page: 0,
  syncedTime: {},
  forceSyncUpdate: 0
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    //Product list reducer
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: true,
          error: null,
          filterLoading: true
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          ...state.productList,
          metaData: action.payload,
          data: action.payload?.data?.categoryData[0],
          loading: false,
          error: null,
          filterLoading: false
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_FAILURE:
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
          error: action.payload,
          filterLoading: false
        },
      };

    // //Product load more
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_REQUEST:
      return {
        ...state,
        productListSyncedData: {
          ...state.productListSyncedData,
          loading: true,
          error: null,
          filterLoading: true,
          check: action.payload
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_SUCCESS:
      return {
        ...state,
        productListSyncedData: {
          ...state.productListSyncedData,
          metaData: action.payload,
          loading: false,
          error: null,
          filterLoading: false
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_LOAD_FAILURE:
      return {
        ...state,
        productListSyncedData: {
          ...state.productListSyncedData,
          loading: false,
          error: action.payload,
          filterLoading: false
        },
      };

    //Product list category
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_REQUEST:
      return {
        ...state,
        productListCategory: {
          ...state.productListCategory,
          loading: true,
          error: null,
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        productListCategory: {
          ...state.productListCategory,
          metaData: action.payload,
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_CATEGORY_FAILURE:
      return {
        ...state,
        productListCategory: {
          ...state.productListCategory,
          loading: false,
          error: action.payload,
        },
      };

    //Product list Sub-category
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_SUBCATEGORY_REQUEST:
      return {
        ...state,
        productListSubcategory: {
          ...state.productListSubcategory,
          loading: true,
          error: null,
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        productListSubcategory: {
          ...state.productListSubcategory,
          metaData: action.payload,
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_SUBCATEGORY_FAILURE:
      return {
        ...state,
        productListSubcategory: {
          ...state.productListSubcategory,
          loading: false,
          error: action.payload,
        },
      };

    ///Network
    case PRODUCT_ACTION_TYPES.NETWORK_REQUEST:
      return {
        ...state,
        network: action.payload
      };
    ///Networkv
    case PRODUCT_ACTION_TYPES.PAGE_REQUEST:
      return {
        ...state,
        page: action.payload
      };
    case PRODUCT_ACTION_TYPES.RESET_PRODUCT_LIST_PAGINATION_INFO:
      return {
        ...state,
        productListSyncedData: {
          ...state.productListSyncedData,
          ...initialState.productListSyncedData,
        },
        ///syncedTime: null
      };
    case PRODUCT_ACTION_TYPES.PRODUCT_LIST_SYNC_TIME:
      return {
        ...state,
        syncedTime: {
          ...state.syncedTime,
          ...action.payload
        }
      };

    case PRODUCT_ACTION_TYPES.FORCE_SYNC_PRODUCT:
      return {
        ...state,
        forceSyncUpdate: state?.forceSyncUpdate ? state.forceSyncUpdate + 1 : 1
      };

    default:
      return state;
  }
};

export default productReducer;
