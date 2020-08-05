import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/user/';

export const getLsKey = () => {
        return 'token';
    };
    
export const checkJWT = () => {
        return localStorage.getItem(getLsKey())
    };

export const userLogin = (userInformation) => {
        return axios.post(`${API_BASE_URL}login`, userInformation);
};

export const getUserInfo = () => {
        return JSON.parse(localStorage.getItem(getLsKey()));
};

export const getAuthHeader = () => {
        let token = "";
        if (getUserInfo()) {
            token = getUserInfo().token;
        }
       return {headers: {Authorization: 'Bearer ' + token }};
    };

export const userLogout = () => {
        localStorage.removeItem(getLsKey());
};
