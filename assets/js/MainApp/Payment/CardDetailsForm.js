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


const today = new Date();
const year = today.getFullYear() - 1;

const monthData = [
    {
        label: "01",
        value: "1",
    },
    {
        label: "02",
        value: "2",
    },
    {
        label: "03",
        value: "3",
    },
    {
        label: "04",
        value: "4",
    },
    {
        label: "05",
        value: "5",
    },
    {
        label: "06",
        value: "6",
    },
    {
        label: "07",
        value: "7",
    },
    {
        label: "08",
        value: "8",
    },
    {
        label: "09",
        value: "9",
    },
    {
        label: "10",
        value: "10",
    },
    {
        label: "11",
        value: "12",
    },
    {
        label: "12",
        value: "12",
    }]
const tenYears = Array.from({length: 10}, (_, i) => year + i + 1)
const yearData = tenYears.map((year)=> {
    return {label: year, value:year}
})

export default function CardDetailsForm({formRef, formValue, updater}){
    const [cvc, setCvc] = useState('')
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const {StringType, NumberType} = Schema.Types;
    const model = Schema.Model({
        number: StringType().isRequired().containsNumber().maxLength(16),
        name: StringType().isRequired(),
        cvc: StringType().isRequired().maxLength(3),
        expiryMonth: StringType().isRequired(),
        expiryYear: NumberType().isRequired()
    })

    useEffect(()=>{
        setExpiry(month + "/" + year);
    },[month, year])


    const setNumberStripe = (el) => {
        console.log("changing caard num", el);
    }

    const stripePromise = loadStripe('pk_test_JxJrTj6r9rep2skbDSO1SwTM');


    const cardStripe =
        <Elements stripe={stripePromise}>
          <StripeForm formValue={formValue} updater={updater} />
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



function StripeForm({formValue, updater}){
    const stripe = useStripe();
    const elements = useElements();
    console.log("stripe", stripe);

    const onSubmit = () => {
        const cardElem = elements.getElement(CardElement)
        stripe.createToken(cardElem).then(({token})=> console.log("well done", token));

    }

    return <>
        <Form onSubmit={onSubmit}>
           <CardElement />
            <button type="submit">Submit</button>
        </Form>

        </>

}
