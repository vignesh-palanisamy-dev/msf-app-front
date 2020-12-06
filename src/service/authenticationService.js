import axios from 'axios';
import * as serverUtil from '../utils/serverUtil';
import * as loggerUtil from '../utils/loggerUtil';

function register(datamap) {
    return new Promise((resolve, reject) => {
        axios.post(serverUtil.serverIp() + '/register', {...datamap },{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

function login(user_name, phone_no, password) {
    return new Promise((resolve, reject) => {
        axios.post(serverUtil.serverIp() + '/login', { user_name,phone_no, password },{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

function forgetPassword(user_name, phone_no) {
    return new Promise((resolve, reject) => {
        axios.post(serverUtil.serverIp() + '/forgetPassword', { user_name, phone_no },{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

function updatePassword(user_name, phone_no, password) {
    return new Promise((resolve, reject) => {
        axios.put(serverUtil.serverIp() + '/updatePassword', { user_name, phone_no, password },{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

function logout() {
    return new Promise((resolve, reject) => {
        axios.post(serverUtil.serverIp() + '/logout',{},{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

export { register, login, forgetPassword, updatePassword, logout};
