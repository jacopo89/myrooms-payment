import {FormGroup, FormControl, Panel, Col, Form, Grid, Row, Checkbox, CheckboxGroup} from "rsuite";
import TextField from "../../Login/Components/TextField";
import React from "react";

export default function AddonsForm({ref,formValue, updater, addons}){



    const addonsPanel = addons.map((addon, index)=> <AddonsCard key={index} addon={addon}/> )

    return (
        <Grid fluid>
            <Form fluid ref={ref} formValue={formValue} onChange={updater}>
                <FormGroup>
                    <FormControl accepter={CheckboxGroup} name="addons">
                        {addonsPanel}
                    </FormControl>
                </FormGroup>
            </Form>
        </Grid>)
}




function AddonsCard({addon}){
    const {description, name, title, price} = addon;
    return <Panel style={{width:"100%"}} header={<AddonsCardTitle addon={addon} />} collapsible>
        {description}
    </Panel>
}

function AddonsCardTitle({addon}){
    const {description, name, title, price} = addon;

    const checkBoxTitle = title + " £ " + price;

    return <Checkbox defaultChecked value={name}>{checkBoxTitle}</Checkbox>

}