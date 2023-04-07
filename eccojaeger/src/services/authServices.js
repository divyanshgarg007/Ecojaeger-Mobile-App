/* eslint-disable prettier/prettier */
import apiInstance from '../config/api/axios';
import { getPrefixUrl } from '../utilities/utils';

export const login = async (data) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };

    const response = await apiInstance.post(`${getPrefixUrl()}login`, data, config);
    return response;
};

export const buyerList = async () => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}user/account/list`, config);
    return response;
};

