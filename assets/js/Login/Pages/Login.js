import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLogin, useRegister} from "../../Backend/useBackend";
import {useDispatch} from "react-redux";
import * as ActionTypes from "../../Redux/actions";
import LoginForm from "../Components/LoginForm";
import Cookies from "universal-cookie";
import * as Routes from '../../routes';

export default function Login(){
    const history = useHistory();
    const [loginResponse, postLoginHandler] = useLogin();
    //const { t, i18n } = useTranslation();
    const cookies = new Cookies();


    const dispatch = useDispatch();
    const successCallback = (data) => {
        cookies.set('accessToken', data);
        cookies.set('authenticated', true);
        dispatch(ActionTypes.switchAuthenticatedStatus());
        history.push(Routes.dashboard);
    };
    const login = (formData) =>
    {
        const finalFormData =  new FormData();
        Object.keys(formData).forEach((key)=> finalFormData.append(key, formData[key] ));
        postLoginHandler(finalFormData, {successCallback: successCallback});
    };
    const goToRegistration = () => history.push(Routes.registration);


    const loginProps = {
        registration: true,
        registrationNavigation : goToRegistration,
        loginHandler: login

    }

  return (  <LoginForm loginProps={loginProps} /> )
}