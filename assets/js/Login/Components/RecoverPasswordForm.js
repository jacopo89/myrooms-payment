import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import React, {useState} from "react";
import {Schema} from 'rsuite';
import {RegistrationBox} from "../../styledComponents/CustomComponents";
import TextField from "./TextField";
import {usePasswordRecovery} from "../../Backend/useBackend";
import {useHistory} from "react-router-dom";



export default function RecoverPasswordForm(){
    const { StringType } = Schema.Types;
    const model = Schema.Model({
        recoveryKey: StringType()
            .isRequired('This field is required.')
    });

    const [formValue, setFormValue] = useState();

    const history = useHistory();
    const [status, passwordRecoveryHandler] = usePasswordRecovery();
    const passwordRecovery = (formValue) => {
        const formData = new FormData();
        Object.keys(formValue).forEach((key)=> formData.append(key, formValue[key] ));
        passwordRecoveryHandler(formData);
    }



    const recoverPasswordForm = (<Form
        model={model}
        formValue={formValue}
        onChange={(formValue)=>{console.log(formValue); setFormValue(formValue) }}
        onSubmit={()=>passwordRecovery(formValue)}>
        <TextField name="recoveryKey" label="Your email or MoreThanAJob username" />
        <ButtonToolbar>
            <Button appearance="primary" type="submit" >Submit</Button>
            <Button appearance="default" onClick={()=> history.push("/login")}>Login</Button>
        </ButtonToolbar>
    </Form>);

    const recoverPasswordFinalMessage =  <p>An email has been sent. Please, follow the instructions.</p>;
    const render = (status) ? recoverPasswordFinalMessage : recoverPasswordForm;

    return (<RegistrationBox>
        <div>
            <h3>Recover Password</h3>
        </div>
        <div>
        {render}
        </div>
    </RegistrationBox>);

}