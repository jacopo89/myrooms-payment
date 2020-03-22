import axios from 'axios/index';

const instance = axios.create({
    baseURL: 'http://',
    headers: {
        'Content-Type': 'application/json'
    }
});


const BackendClient = (token = null, responseType=null)=>
    {
        return (axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authentication': token

            },
            responseType: responseType
        }));
    };






export default instance;
export {BackendClient};
