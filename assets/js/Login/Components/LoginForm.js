import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {RegistrationBox} from "../../styledComponents/CustomComponents";
import * as Routes from '../../routes';

export default function LoginForm({loginProps}){

    const history = useHistory();
    const registrationButton = (loginProps.registration) ? <Button appearance="default" onClick={loginProps.registrationNavigation} >Register</Button> : <></>;

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const formData = {
        email: email,
        password: password
    }



    return (
        <RegistrationBox>
        <Form>
        <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" onChange={setEmail} />
        </FormGroup>
        <FormGroup>
            <ControlLabel><div style={{display:"flex", justifyContent:"space-between"}}><span>Password</span> <Link to={Routes.passwordRecovery}>Forgot password?</Link> </div></ControlLabel>
            <FormControl name="password" type="password" onChange={setPassword} />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" onClick={()=> loginProps.loginHandler(formData)}>Submit</Button>
                <Button appearance="default" onClick={()=> history.push(Routes.changePassword)}>Cancel</Button>
                {registrationButton}
            </ButtonToolbar>
        </FormGroup>
    </Form>
        </RegistrationBox>)
}