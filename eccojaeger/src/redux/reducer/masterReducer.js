/* eslint-disable prettier/prettier */
import { MASTER_ACTION_TYPES } from '../action/actionsType';

const initialState = {
    sliderList: {
        loading: false,
        data: null,
        error: null,
    },
    stepData: false
};
const masterReducer = (state = initialState, action) => {
    switch (action.type) {
        case MASTER_ACTION_TYPES.SLIDER_DATA_REQUEST:
            return {
                ...state,
                sliderList: {
                    ...state.sliderList,
                    data: null,
                    loading: true,
                    error: null,
                },
            };
        case MASTER_ACTION_TYPES.SLIDER_DATA_SUCCESS:
            return {
                ...state,
                sliderList: {
                    ...state.sliderList,
                    data: action.payload,
                    loading: false,
                    error: null,
                },
            };

        case MASTER_ACTION_TYPES.SLIDER_DATA_FAILURE:
            return {
                ...state,
                sliderList: {
                    ...state.sliderList,
                    data: null,
                    loading: false,
                    error: action.payload,
                },
            };
        case MASTER_ACTION_TYPES.SET_STEP:
            return {
                ...state,
                stepData: action.payload,
            };
        default:
            return state;
    }
};

export default masterReducer;
