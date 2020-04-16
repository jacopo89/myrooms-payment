import React, {useEffect, useState} from "react";
import {useRegister} from "../../Backend/useBackend";
import {useHistory} from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm";
import * as Routes from '../../routes';

export default function Registration(){

    const history = useHistory();
    const [registerResponse, postRegisterHandler] = useRegister();

    const successCallback = () => {
        history.push(Routes.login);
    };

    const register = (formData) => {
        const finalFormData =  new FormData();
        Object.keys(formData).forEach((key)=> finalFormData.append(key, formData[key] ));
        postRegisterHandler(finalFormData, {successCallback: successCallback });
    };

    const registrationProps = {
        registrationHandler : register,
    };

    return ( <RegistrationForm registrationProps={registrationProps}/>);
}