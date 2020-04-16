import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import React from "react";
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

    const history = useHistory();
    const [status, passwordRecoveryHandler] = usePasswordRecovery();
    const passwordRecovery = (data) => passwordRecoveryHandler(data);

    const recoverPasswordForm = (<Form model={model} onSubmit={passwordRecovery}>
        <TextField name="recoveryKey" label="Your email or MoreThanAJob username" />
        <ButtonToolbar>
            <Button appearance="primary" >Submit</Button>
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