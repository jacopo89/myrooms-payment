import {ControlLabel, FormControl, FormGroup} from "rsuite";
import React from "react";

export default function TextField({ name, label, accepter, style, ...rest }) {
    return (
        <FormGroup style={style}>
            <ControlLabel>{label} </ControlLabel>
            <FormControl style={style} name={name} accepter={accepter} {...rest} />
        </FormGroup>
    );
}