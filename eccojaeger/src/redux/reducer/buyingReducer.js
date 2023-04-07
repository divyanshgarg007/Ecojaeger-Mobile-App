/* eslint-disable prettier/prettier */
import { BUYING_ACTION_TYPES } from '../action/actionsType';

const initialState = {
    buyingList: {
        loading: false,
        data: null,
        error: null,
    },
    item: {

    }
};
const buyingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUYING_ACTION_TYPES.BUYING_LIST_REQUEST:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    loading: true,
                    error: null,
                },
            };
        case BUYING_ACTION_TYPES.BUYING_LIST_SUCCESS:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case BUYING_ACTION_TYPES.BUYING_LIST_FAILURE:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    loading: false,
                    error: action.payload,
                },
            };
        case BUYING_ACTION_TYPES.CLEAN_UP_BUYING_REQUEST:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: null,
                    loading: true,
                    error: null,
                },
            };

        case BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_SUCCESS:

            var lItem = { ...state.item }
            lItem[action.payload.data.buyingId] = action.payload

            return {
                ...state,
                item: lItem
            };
        case BUYING_ACTION_TYPES.BUYING_LIST_PRODUCT_FAILURE:
            return {
                ...state,
            };

        case BUYING_ACTION_TYPES.BUYING_PRODUCT_LIST_ITEM:

            var lItem = { ...state.item }
            lItem[action.id].data.products = action.payload

            return {
                ...state,
                item: lItem
            };
        // Logout reducer
        case BUYING_ACTION_TYPES.USER_LOGGED_OUT:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default buyingReducer;
