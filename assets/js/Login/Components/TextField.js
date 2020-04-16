import {ControlLabel, FormControl, FormGroup} from "rsuite";
import React from "react";

export default function TextField({ name, label, accepter, ...rest }) {
    return (
        <FormGroup>
            <ControlLabel>{label} </ControlLabel>
            <FormControl name={name} accepter={accepter} {...rest} />
        </FormGroup>
    );
}