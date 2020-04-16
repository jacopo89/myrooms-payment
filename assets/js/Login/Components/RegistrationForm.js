import {useState} from "react";
import {Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "rsuite";
import React from "react";

export default function RegistrationForm({registrationProps}){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const formData = {
        email: email,
        password: password
    };

    return ( <Form layout="horizontal">
        <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="name"  />
            <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" onChange={(value) => setEmail(value)} />
            <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" type="password" onChange={(value) => setPassword(value)} />
        </FormGroup>
        <FormGroup>
            <ControlLabel>Textarea</ControlLabel>
            <FormControl rows={5} name="textarea" componentClass="textarea" />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" onClick={()=>registrationProps.registrationHandler(formData)}>Submit</Button>
                <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>);
}