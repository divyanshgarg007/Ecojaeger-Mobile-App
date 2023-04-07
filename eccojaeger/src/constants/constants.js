export const API_CONSTANTS = {
    //BASE_URL: "http://78.47.127.107/",//DEV
    //IMG_PREFIX: "http://78.47.127.107",//DEV
    BASE_URL: "http://159.69.20.10/",//PROD
    IMG_PREFIX: "http://159.69.20.10",//PROD
    // BASE_URL: "https://ecco.mindstask.com/",//ECCO
    // IMG_PREFIX: "https://ecco.mindstask.com/",//ECCo
}

export const API_ENDPOINT_BASE_URL = API_CONSTANTS.BASE_URL;
export const API_ENDPOINTS = {
    base_url: API_ENDPOINT_BASE_URL,
    login: API_ENDPOINT_BASE_URL + "/authenticate",
}

export const CHECK_THRESHOLD = 960 //minutes => 16 hrs
export const RESET_THRESHOLD = 7200
export const RESET_THRESHOLD_MILLI = 7200000
export const PAGE_SIZE = 500//200
export const ONE_DAY = 1440//mintes
