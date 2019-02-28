import axios from "axios";
import objectAssign from 'object-assign';
// import config from '../../config';
// import AppLocalStorage from "./AppLocalStorage";

export const baseHeader = () => {
    return {
        'Content-Type':'application/json;charset=utf-8',
    };
};

export const tokenHeader = () => {
    return {
        // 'Authorization': `${AppLocalStorage.getTypeJWT()} ${AppLocalStorage.getJWT()}`,
        // 'Content-Type':'application/json;charset=utf-8',
    };
};

export const request = (endpoint, method, headers = {}, params = {}, body = {}) => {
    return axios({
        url: endpoint,
        method: method,
        headers: headers,
        params: objectAssign(params),
        data: body
    });
};

export const apiDownLoad = (endpoint, headers = {}, params = {}) => {    
    return axios({
        url: endpoint,
        method: "GET",
        responseType: 'blob', // important
        headers: headers,
        params: objectAssign(params),
    });
};

export const apiGet = (endpoint, headers = {}, params = {}) => {    
    return axios({
        url: endpoint,
        method: "GET",
        headers: headers,
        params: objectAssign(params),
    });
};

export const apiPost = (endpoint, body = {}, headers = {}, params = {}) => {
    return request(endpoint, "POST", objectAssign(baseHeader(), headers), params, body);
};

export const apiPut = (endpoint, body = {}, headers = {}, params = {}) => {
    return request(endpoint, "PUT", objectAssign(baseHeader(), headers), params, body);
};
