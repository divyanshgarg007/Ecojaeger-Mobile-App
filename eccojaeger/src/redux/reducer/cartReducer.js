/* eslint-disable prettier/prettier */
import { CART_ACTION_TYPES } from '../action/actionsType';

const initialState = {
    cartList: {
        loading: false,
        data: null,
        offlineCart: [],
        placeOrderStatus: null,
        error: null,
    },
    orderList: {
        metaData: [],
        loading: false,
        data: null,
        error: null,
    },

    pageCart: 0,
};
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART_OFFLINE:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    offlineCart: [...state.cartList.offlineCart, ...action.payload]
                },
            };

        case CART_ACTION_TYPES.EMPTY_CART_OFFLINE:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    offlineCart: []
                },
            };

        case CART_ACTION_TYPES.REPLACE_CART_OFFLINE:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    offlineCart: action.payload
                },
            };

        case CART_ACTION_TYPES.STORE_PLACE_ORDER_STATUS:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    placeOrderStatus: action.payload
                },
            };

        case CART_ACTION_TYPES.CART_LIST_REQUEST:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    //data: null,
                    loading: true,
                    error: null,
                },
            };
        case CART_ACTION_TYPES.CART_LIST_SUCCESS:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case CART_ACTION_TYPES.CART_LIST_FAILURE:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    //data: null,
                    loading: false,
                    error: action.payload,
                },
            };
        case CART_ACTION_TYPES.ORDER_LIST_REQUEST:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    metaData: [],
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        case CART_ACTION_TYPES.ORDER_LIST_SUCCESS:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    metaData: action.payload,
                    data: action.payload.data.orders,
                    loading: false,
                    error: null,
                },
            };
        case CART_ACTION_TYPES.ORDER_LIST_FAILURE:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    metaData: [],
                    data: null,
                    loading: false,
                    error: action.payload,
                },
            };
        //Order load more
        case CART_ACTION_TYPES.ORDER_LIST_LOAD_REQUEST:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    metaData: [],
                    data: state.orderList.data,
                    loading: true,
                    error: null,
                },
            };
        case CART_ACTION_TYPES.ORDER_LIST_LOAD_SUCCESS:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    metaData: action.payload,
                    data: [].concat(state.orderList.data, action.payload.data.orders),
                    loading: false,
                    error: null,
                },
            };
        case CART_ACTION_TYPES.ORDER_LIST_LOAD_FAILURE:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    data: [],
                    metaData: [],
                    loading: false,
                    error: action.payload,
                },
            };
        case CART_ACTION_TYPES.PAGE_CART_REQUEST:
            return {
                ...state,
                pageCart: action.payload,
            };
        case CART_ACTION_TYPES.CLEAN_UP_CART_REQUEST:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    loading: false,
                    data: null,
                    error: null,
                },
                orderList: {
                    ...state.orderList,
                    metaData: [],
                    loading: false,
                    data: null,
                    error: null,
                },
                pageCart: 0,
            };

        // Logout reducer
        case CART_ACTION_TYPES.USER_LOGGED_OUT:
            return {
                ...state,
                cartList: {
                    ...state.cartList,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default cartReducer;
