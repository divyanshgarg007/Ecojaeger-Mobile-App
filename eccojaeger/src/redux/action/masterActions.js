/* eslint-disable prettier/prettier */
import { MASTER_ACTION_TYPES } from './actionsType';
import * as masterServices from '../../services/masterServices';

///Cart list
const sliderListRequest = () => {
    return {
        type: MASTER_ACTION_TYPES.SLIDER_DATA_REQUEST,
    };
};

const sliderListSuccess = data => {
    return {
        type: MASTER_ACTION_TYPES.SLIDER_DATA_SUCCESS,
        payload: data,
    };
};

const sliderListFailure = error => {
    return {
        type: MASTER_ACTION_TYPES.SLIDER_DATA_FAILURE,
        payload: error,
    };
};

export const sliderListAction = type => async dispatch => {
    dispatch(sliderListRequest());
    try {
        const responseData = await masterServices.sliderList(type);
        if (responseData?.status === true) {
            dispatch(sliderListSuccess(responseData));
        } else {
            dispatch(sliderListFailure(responseData.errors));
        }
    } catch (error) {
        dispatch(sliderListFailure(error?.response?.data));
    }
};

export const setStepAction = data => {
    return {
        type: MASTER_ACTION_TYPES.SET_STEP,
        payload: data,
    };
};