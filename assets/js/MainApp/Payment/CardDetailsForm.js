import {Col, Form, Grid, Row} from "rsuite";
import TextField from "../../Login/Components/TextField";
import React from "react";

export default function CardDetailsForm(){
    return (
        <Form fluid>
        <Grid fluid>
            <h3>Your contact details</h3>
            <Row>
                <TextField name="firstname" label="First name" />
            </Row>
            <Row>
                <TextField name="lastname" label="Last Name"/>
            </Row>
            <Row>
                <TextField name="email" label="Email" />
            </Row>
            <h3>Your personal information</h3>
            <Row>
                <TextField name="phone" label="Phone"/>
            </Row>
            <Row>
                <TextField name="street" label="Street address" />
            </Row>
            <Row>
                <TextField name="address" label="Address 2" />
            </Row>
            <Row>
                <Col xs={12}>
                    <TextField name="city" label="City" />
                </Col>
                <Col xs={12}>
                    <TextField name="state" label="State/province" />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <TextField name="zip" label="ZIP" />
                </Col>
                <Col xs={12}>
                    <TextField name="country" label="Country" />
                </Col>
            </Row>
        </Grid>
    </Form>)
}