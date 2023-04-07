/* eslint-disable prettier/prettier */
import apiInstance from '../config/api/axios';
import { getPrefixUrl } from '../utilities/utils';

export const addCartBuying = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}add/buyingList/to/cart`, data, config);
    return response;
};

export const cartList = async (type) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };

    const response = await apiInstance.get(`${getPrefixUrl()}cart/product?requestFrom=mob&orderSeparately=${type}`, config);
    return response;
};

export const addCart = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}cart/add-to-cart`, data, config);
    return response;
};

export const removeCart = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}cart/remove-from-cart`, data, config);
    return response;
};

export const addComment = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.post(`${getPrefixUrl()}cart/save-comment`, data, config);
    return response;
};
//create order
export const createOrder = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };

    const response = await apiInstance.post(`${getPrefixUrl()}order/create-order`, data, config);
    return response;
};

///orderlist
export const orderList = async (page) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}order/List?requestFrom=mob&page=${page}`, config);
    return response;
};
///Reorder
export const reorderCart = async (orderNumber) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}re-order/${orderNumber}?requestFrom=mob`, config);
    return response;
};

///Order details
export const orderDetails = async (orderNumber) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}order/details/${orderNumber}?requestFrom=mob`, config);
    return response;
};

/// Download cart

export const downloadCart = async (orderNumber) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}print-cart`, config);
    return response;
};

/// Download Order

export const downloadOrder = async (id) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}print-order/${id}`, config);
    return response;
};