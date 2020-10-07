import {Col,Schema, Form, Grid, Row, SelectPicker} from "rsuite";
import TextField from "../../Login/Components/TextField";
import React, {useEffect, useState} from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import {
    CardCvcElement,
    CardElement, CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";

export default function CardDetailsForm({formRef, formValue, updater}){
    const stripePromise = loadStripe('pk_test_JxJrTj6r9rep2skbDSO1SwTM');

    const cardStripe =
        <Elements stripe={stripePromise}>
          <StripeForm updater={updater} />
        </Elements>


    return (
        <div id="PaymentForm">
            {/*<Form ref={formRef} model={model} fluid formValue={formValue} onChange={updater}>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <Cards
                                cvc={cvc}
                                expiry={expiry}
                                focused={focus}
                                name={name}
                                number={number}
                                issuer="visa"
                            />
                        </Col>
                        <Col xs={12}>
                            <TextField maxLength={16} label="Card number" name="number" onChange={setNumber} onFocus={setFocus} />
                            <TextField label="Cardholder name" name="name" onChange={setName} onFocus={setFocus} />
                            <TextField maxLength={3} label="CCV/CVC" name="cvc" onChange={setCvc} onFocus={setFocus} />
                            <div style={{display:"flex", width:"100%"}}>
                                <TextField style={{flexGrow:1}} label="Expiry Month" name="expiryMonth" onChange={setMonth} onFocus={setFocus} accepter={SelectPicker} data={monthData} searchable={false} cleanable={false} />
                                <TextField style={{flexGrow:2}} label="Expiry Year" name="expiryYear" onChange={setYear} onFocus={setFocus} accepter={SelectPicker} data={yearData} searchable={false} cleanable={false} />
                            </div>

                        </Col>
                    </Row>
                </Grid>
            </Form>
*/}
            {cardStripe}
        </div>
    );

}


function StripeForm({updater}){
    const stripe = useStripe();
    const elements = useElements();
    console.log("stripe", stripe);

    const onSubmit = () => {
        const cardElem = elements.getElement(CardElement)
        stripe.createToken(cardElem).then(({token})=> updater(token));

    }

    return <>
        <Form onSubmit={onSubmit}>
           <CardElement />
            <button type="submit">Submit</button>
        </Form>

        </>

}
