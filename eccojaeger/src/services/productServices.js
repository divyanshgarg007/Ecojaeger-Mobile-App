/* eslint-disable prettier/prettier */
import apiInstance from '../config/api/axios';
import { getPrefixUrl } from '../utilities/utils';

export const productList = async (data) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const dataBrand = Object.keys(data['Brand'])
    .map((key) => `&Brand[]=${encodeURIComponent(data['Brand'][key])}`)
    .join('');

  const dataOrigin = Object.keys(data['Origin'])
    .map((key) => `&Origin[]=${encodeURIComponent(data['Origin'][key])}`)
    .join('');

  const dataProducers = Object.keys(data['producers'])
    .map((key) => `&producers[]=${encodeURIComponent(data['producers'][key])}`)
    .join('');

  let orderDate = ''
  if (data['sort']?.id === 'default') {
    orderDate = `&orderDate=${data['sort']?.id}`
  }
  let orderPrice = ''
  if (data['sort']?.id === 'asc' || data['sort']?.id === 'desc') {
    orderPrice = `&orderPrice=${data['sort']?.id}`
  }
  let promotion = data.promotional && data.promotional !== undefined ? 1 : 0

  ////console.log("URL: ", `${getPrefixUrl()}product/list?requestFrom=mob&limit=${data.limit}&page=${data.page}&category=${data.category.toString()}&Glutenfree=${data.Glutenfree}&Laktosefrei=${data.Laktosefrei}&newProduct=${data.newProduct}&promotional=${promotion}&veggie=${data.veggie}&vegan=${data.vegan}&TK=${data.TK}${dataBrand}${dataOrigin}${dataProducers}${orderDate}${orderPrice}`)
  const response = await apiInstance.get(`${getPrefixUrl()}product/list?requestFrom=mob&limit=${data.limit}&page=${data.page}&category=${data.category.toString()}&Glutenfree=${data.Glutenfree}&Laktosefrei=${data.Laktosefrei}&newProduct=${data.newProduct}&promotional=${promotion}&veggie=${data.veggie}&vegan=${data.vegan}&TK=${data.TK}${dataBrand}${dataOrigin}${dataProducers}${orderDate}${orderPrice}`, config);

  return response;
};

export const categoryList = async (data) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`de/delta-sync-category-data`, config);
  return response;
};

export const productDetails = async (id) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`${getPrefixUrl()}product/details/${id}?requestFrom=mob`, config);
  return response;
};

export const searchAutoSuggestion = async (data) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`${getPrefixUrl()}search/suggestion?requestFrom=mob&search_text=${data}`, config);
  return response;
};

export const search = async (data, page, category_id) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`${getPrefixUrl()}product/search?requestFrom=mob&search_text=${data}&page=${page}&category_id=${category_id !== undefined ? category_id : ''}`, config);
  return response;
};

///Promotion list
export const promotionList = async (data) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`${getPrefixUrl()}promotional/product?requestFrom=mob&limit=${data.limit}&page=${data.page}`, config);
  return response;
};

//Sync
export const syncProduct = async (data) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const response = await apiInstance.get(`data-sync-last-time?time=${data}`, config);
  return response;
};

export const deltaSyncDataProduct = async (data) => {
  // let config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     accept: 'application/json',
  //   },
  // };
  // const response = await apiInstance.get(`data-sync-last-time?time=${data}`, config);
  // return response;

  let config = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  };
  const dataBrand = Object.keys(data['Brand'])
    .map((key) => `&Brand[]=${encodeURIComponent(data['Brand'][key])}`)
    .join('');

  const dataOrigin = Object.keys(data['Origin'])
    .map((key) => `&Origin[]=${encodeURIComponent(data['Origin'][key])}`)
    .join('');

  const dataProducers = Object.keys(data['producers'])
    .map((key) => `&producers[]=${encodeURIComponent(data['producers'][key])}`)
    .join('');

  let orderDate = ''
  if (data['sort']?.id === 'default') {
    orderDate = `&orderDate=${data['sort']?.id}`
  }
  let orderPrice = ''
  if (data['sort']?.id === 'asc' || data['sort']?.id === 'desc') {
    orderPrice = `&orderPrice=${data['sort']?.id}`
  }
  let promotion = data.promotional && data.promotional !== undefined ? 1 : 0

  ////console.log("URL: ", `${getPrefixUrl()}product/list?requestFrom=mob&limit=${data.limit}&page=${data.page}&category=${data.category.toString()}&Glutenfree=${data.Glutenfree}&Laktosefrei=${data.Laktosefrei}&newProduct=${data.newProduct}&promotional=${promotion}&veggie=${data.veggie}&vegan=${data.vegan}&TK=${data.TK}${dataBrand}${dataOrigin}${dataProducers}${orderDate}${orderPrice}`)
  const response = await apiInstance.get(`de/delta-sync-data?requestFrom=mob&time=${data.time}&limit=${data.limit}&page=${data.page}&category=${data.category.toString()}&Glutenfree=${data.Glutenfree}&Laktosefrei=${data.Laktosefrei}&newProduct=${data.newProduct}&promotional=${promotion}&veggie=${data.veggie}&vegan=${data.vegan}&TK=${data.TK}${dataBrand}${dataOrigin}${dataProducers}${orderDate}${orderPrice}`, config);
  return response;
};
