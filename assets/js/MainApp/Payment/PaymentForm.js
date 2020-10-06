import {Schema, Form, Grid, Row, Col, SelectPicker} from "rsuite";
import React, {useEffect, useRef, useState} from "react";
import TextField from "../../Login/Components/TextField";

export function PaymentForm({formRef, formValue, updater}){

    const {StringType, NumberType} = Schema.Types;

    const prefixes = [
        {
            label: "Italy (+39)",
            value: "0039"
        },
        {
            label: "UK (+44)",
            value: "0044"
        }
    ]

    const model = Schema.Model({
        firstname: StringType().isRequired('Required field'),
        lastname: StringType().isRequired('Required field'),
        email: StringType().isEmail().isRequired('Required field'),
        phone: StringType().isRequired('Required field'),
        street: StringType().isRequired('Required field'),
        city: StringType().isRequired('Required field'),
        state: StringType().isRequired('Required field'),
        zip: StringType().isRequired('Required field'),
        country: StringType().isRequired('Required field'),

    })



    return(
        <Form fluid ref={formRef} model={model} formValue={formValue} onChange={updater}>
        <Grid fluid>
            <h3>Your contact details</h3>
            <Row>
                <Col xs={12}>
                    <TextField name="firstname" label="First name" />
                </Col>
                <Col xs={12}>
                    <TextField name="lastname" label="Last Name"/>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <TextField name="email" label="Email" />
                </Col>
            </Row>
            <h3>Your personal information</h3>
            <Row>
                <Col xs={24}>
                    <TextField name="phone" label="Phone"/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}><TextField name="street" label="Street address" /></Col>
                <Col xs={12}><TextField name="address" label="Address 2" /></Col>
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
    </Form>);

}
