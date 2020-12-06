import axios from 'axios';
import * as serverUtil from '../utils/serverUtil';
import * as loggerUtil from '../utils/loggerUtil';

function viewProfile() {
    return new Promise((resolve, reject) => {
        axios.post(serverUtil.serverIp() + '/viewProfile',{},{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
} 

function updateProfile(updateMap) {
    return new Promise((resolve, reject) => {
        axios.put(serverUtil.serverIp() + '/updateProfile', updateMap,{withCredentials: true, credentials: 'include'}).then(function (response) {
            resolve(loggerUtil.handleResponse(response));
        }).catch(error => reject(loggerUtil.handleError(error)));
    });
}

export { viewProfile, updateProfile};
