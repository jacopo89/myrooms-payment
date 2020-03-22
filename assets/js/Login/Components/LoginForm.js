import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import React, {useEffect, useState} from "react";

export default function LoginForm({loginProps}){



    const registrationButton = (loginProps.registration) ? <Button appearance="default" onClick={loginProps.registrationNavigation} >Register</Button> : <></>;

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const formData = {
        email: email,
        password: password
    }



    return (<Form>
        <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" onChange={setEmail} />
            <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" onChange={setPassword} />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" onClick={()=> loginProps.loginHandler(formData)}>Submit</Button>
                <Button appearance="default">Cancel</Button>
                {registrationButton}
            </ButtonToolbar>
        </FormGroup>
    </Form>)
}