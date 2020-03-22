import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import {useHistory} from "react-router-dom";
import {useLogin, useRegister} from "../../Backend/useBackend";
import {useDispatch} from "react-redux";
import * as ActionTypes from "../../Redux/actions";
import { useTranslation } from 'react-i18next';
import LoginForm from "../Components/LoginForm";
export default function Login(){
    const history = useHistory();
    const [loginResponse, postLoginHandler] = useLogin();
    //const { t, i18n } = useTranslation();


    const dispatch = useDispatch();
    const successCallback = () => {

        console.log("Authentication fulfilled");
        dispatch(ActionTypes.switchAuthenticatedStatus());
        history.push("/dashboard");
    };
    const login = (formData) =>
    {
        const finalFormData =  new FormData();
        Object.keys(formData).forEach((key)=> finalFormData.append(key, formData[key] ));
        postLoginHandler(finalFormData, {successCallback: successCallback});
    };
    const goToRegistration = () => history.push("/register");


    const loginProps = {
        registration: true,
        registrationNavigation : goToRegistration,
        loginHandler: login

    }

  return (  <LoginForm loginProps={loginProps} /> )
}