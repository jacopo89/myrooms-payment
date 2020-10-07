import {Panel, Grid, Row, Col, Button, ButtonGroup, Steps} from "rsuite";
import {useParams} from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";
import {PaymentForm} from "./PaymentForm";
import AddonsForm from "./AddonsForm";
import CardDetailsForm from "./CardDetailsForm";
import {DatesBox} from "../RoomRecap/DatesBox";
import useMediaQuery from "react-responsive";
import useFetch from "use-http";

export default function PaymentPage(){

    const {ulid} = useParams();
    const { get, post, response, loading, error } = useFetch('http://10.10.203.81');
    const [paymentObject, setPaymentObject] = useState({amount:0});
    const [fullAmount, setFullAmount] = useState(paymentObject.amount);

    useEffect(()=>{
        get("/api/get-payment/" + ulid).then(response  => setPaymentObject(response));
    },[]);

    useEffect(()=>{
        setFullAmount(value => value + paymentObject.amount);
    },[paymentObject]);

    const labels = ["Details","Addons", "Card" ]

    const [step, setStep] = useState(0);

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > labels.length ? labels.length : nextStep);
    };

    const [info, setInfo] = useState();
    const [cardInfo, setCardInfo] = useState();
    const [addonsInfo, setAddonsInfo] = useState({addons:[]});

    const [myR, setMyR] = useState();


    async function submitPayment() {
        const formData = new FormData();
        formData.append('info', JSON.stringify(info));
        formData.append('cardInfo', JSON.stringify(cardInfo));
        formData.append('addonsInfo', JSON.stringify(addonsInfo));
        const data = await post('/api/payment/booking', formData)
        if (response.ok) (setMyR(data))
        else{

        }
    }





    const paymentFormRef = useRef();
    const addonsFormRef = useRef();
    const cardDetailsFormRef = useRef();

    const onPrevious = () => onChange(step - 1);

    const addons = [
        {
            name: "experience",
            value: "My rooms experience",
            title: "My rooms experience",
            price: 99
        },
        {
            name: "lock",
            value: "Lock",
            title: "Lock",
            price: 40
        }]

    const components = [
        {
            component: <PaymentForm formRef={paymentFormRef} formValue={info} updater={setInfo} />,
            validator: ()=>paymentFormRef.current.check()
        },
        {
            component: <AddonsForm formValue={addonsInfo} updater={setAddonsInfo} addons={addons} />,
            //validator: ()=>addonsFormRef.current.check()
        },
        {
            component: <CardDetailsForm formRef={cardDetailsFormRef} formValue={cardInfo} updater={setCardInfo} />
        }
        ];

    useEffect(()=>{
        let selectedPrices = [0];
        const selectedAddons = addons.filter((addon)=> addonsInfo.addons.includes(addon.name));
        if(selectedAddons.length!==0){
            selectedPrices = selectedAddons.map((addon)=> addon.price);
        }
        const addonsCost = selectedPrices.reduce((accumulator, currentValue) => accumulator + currentValue);
        setFullAmount(paymentObject.amount + addonsCost);
    },[addonsInfo])


    const onNext = (step) => {
        console.log("step", step);
        if(components[step].validator){
            if(components[step].validator()){
                if(step===labels.length-1){
                    submitPayment();
                }else{
                    onChange(step + 1);
                }

            }
        }else{
            if(step===labels.length-1){
                submitPayment();
            }else{
                onChange(step + 1);
            }
        }
    }

    const steps = labels.map((label, index) => <Steps.Item title={label} key={index}> </Steps.Item>)

    return (
        <>
            <Grid style={{width:"100%"}}>
                <Row>
                    <Col xs={16} style={{padding:30, height:"100vh"}} >
                        <div style={{display:"flex", justifyContent:"center", padding:40}}>
                            <img src="/assets/imgs/myrooms-horizontal.png" alt="myrooms-logo" width={100} />
                        </div>
                        <div style={{padding:40}}>
                            <Steps current={step}>
                                {steps}
                            </Steps>
                            <Panel>
                                {components && components[step].component}
                            </Panel>

                            <ButtonGroup style={{float:"right"}}>
                                {step!==0 && <Button style={backButtonStyle} onClick={onPrevious} disabled={step === 0}>
                                    Previous
                                </Button>}
                                <Button style={buttonStyle} onClick={()=>onNext(step)}>
                                    {(step===labels.length -1) ? "Confirm": "Next" }
                                </Button>
                            </ButtonGroup>
                        </div>

                    </Col>
                    <Col xs={8} style={{backgroundColor:"#F3F3F4", height:"100vh"}}>
                        <div>Total to pay: £ {fullAmount}</div>
                        <DatesBox checkin={paymentObject.checkin} checkout={paymentObject.checkout} />
                        <div>{myR}</div>
                    </Col>
                </Row>
            </Grid>
    </>)
}

const buttonStyle = {
    fontSize:"1rem",
    lineHeight:"1.6rem",
    minWidth:222,
    padding:16,
    backgroundColor: "#ff7977",
    color: "white",

}

const backButtonStyle = {
    fontSize:"1rem",
    lineHeight:"1.6rem",
    minWidth:222,
    padding:16,
    color: "#ff7977",
}