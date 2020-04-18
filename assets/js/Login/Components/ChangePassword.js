import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup} from "rsuite";
import React, {useState} from "react";
import {Schema} from 'rsuite';
import TextField from "./TextField";
import {RegistrationBox} from "../../styledComponents/CustomComponents";
import {useChangePassword} from "../../Backend/useBackend";
import {useHistory} from "react-router-dom";
import * as Routes from '../../routes';


const { StringType } = Schema.Types;

const model = Schema.Model({
    password: StringType().isRequired('This field is required.'),
    verifyPassword: StringType()
        .addRule((value, data) => {
            console.log(data);

            if (value !== data.password) {
                return false;
            }

            return true;
        }, 'The two passwords do not match')
        .isRequired('This field is required.')
});

export default function ChangePassword(){

    const [formValue, setFormValue] = useState();
    const history = useHistory();

    const [response, submitBackendHandler, loaded, status] = useChangePassword();
    const submitHandler = (formValue) => {
        const formData = new FormData();
        Object.keys(formValue).forEach((key)=> formData.append(key, formValue[key] ));
        submitBackendHandler(formData);
    }


    const renderForm = (<Form
        model={model}
        formValue={formValue}
        onChange={setFormValue}
        onSubmit={()=>submitHandler(formValue)}>
        <TextField name="password" label="New Password" type="password" />
        <TextField name="verifyPassword" label="Type new Password again" type="password" />
        <ButtonToolbar>
            <Button appearance="primary" type="submit" >Save</Button>
            <Button appearance="default" onClick={()=> history.push(Routes.login)}>Login</Button>
        </ButtonToolbar>
    </Form>);

    const recoverPasswordFinalMessage =  <p>Password has been changed</p>;
    const render = (status) ? recoverPasswordFinalMessage : renderForm;

    return (<RegistrationBox>
        <div>
            <h3>Change password</h3>
        </div>
        <div>
            {render}
        </div>
    </RegistrationBox>);

}