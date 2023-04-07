/* eslint-disable prettier/prettier */
import apiInstance from '../config/api/axios';
import { getPrefixUrl } from '../utilities/utils';

export const buyingCreate = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}create/buying/list`, data, config);
    return response;
};

export const buyingList = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}buying/list?requestFrom=mob`, data, config);
    return response;
};

export const buyingRemove = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}delete/buying/list`, data, config);
    return response;
};

export const buyingProductList = async (id, sort) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}buying/list/product/${id}?requestFrom=mob&&alphabetical=${sort}`, config);
    return response;
};


export const buyingProductRemove = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}remove/product/from/buying/list`, data, config);
    return response;
};

export const buyingAddProduct = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}add/buying/list/product`, data, config);
    return response;
};

//Change Buying list item ordering action
export const buyingChangeOrdering = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}buyinglist/itemOrdering`, data, config);
    return response;
};

/// Download buying

export const downloadBuying = async (id) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}print-buying-list/${id}`, config);
    return response;
};

//Quantity update 

export const quantityUpdate = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}update/buying/product/unit`, data, config);
    return response;
};