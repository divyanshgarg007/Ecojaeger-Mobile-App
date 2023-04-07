/* eslint-disable prettier/prettier */
import { AUTH_ACTION_TYPES } from '../action/actionsType';

const initialState = {
    signIn: {
        loading: false,
        data: null,
        error: null,
    },
    buyingList: {
        loading: false,
        data: null,
        error: null,
    },
    language: 'de',
    accountID: '35765'
};
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.SET_USER_LANGUAGE:
            return { ...state, language: action.payload };

        case AUTH_ACTION_TYPES.SET_ACCOUNT_ID:
            return { ...state, accountID: action.payload ? action.payload : '35765' };

        case AUTH_ACTION_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case AUTH_ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    data: null,
                    loading: false,
                    error: action.payload,
                },
            };

        case AUTH_ACTION_TYPES.USER_LOGGED_OUT:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    data: null,
                    loading: false,
                    error: null,
                },
            };
        ///Buying list reducer
        case AUTH_ACTION_TYPES.BUYER_LIST_REQUEST:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        case AUTH_ACTION_TYPES.BUYER_LIST_SUCCESS:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case AUTH_ACTION_TYPES.BUYER_LIST_FAILURE:
            return {
                ...state,
                buyingList: {
                    ...state.buyingList,
                    data: null,
                    loading: false,
                    error: action.payload,
                },
            };
        ///cleanup
        case AUTH_ACTION_TYPES.LOGIN_CLEANUP_FAILURE:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    data: state.signIn.data,
                    loading: true,
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default productReducer;
