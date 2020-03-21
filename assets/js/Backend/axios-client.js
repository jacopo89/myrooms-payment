import axios from 'axios/index';
import useCookies from "./hooks/useCookies";
import {useSelector} from "react-redux";

const [accessToken, username, authenticated] = useCookies();

const instance = axios.create({
    baseURL: 'http://',
    headers: {
        'Content-Type': 'application/json'
    }
});


const BackendClient = (token, responseType=null)=>
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
export {DynamicBackendClient};
