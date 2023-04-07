/* eslint-disable prettier/prettier */
import apiInstance from '../config/api/axios';
import { getPrefixUrl } from '../utilities/utils';

export const sliderList = async () => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    };
    const response = await apiInstance.get(`${getPrefixUrl()}slider`, config);
    return response;
};

