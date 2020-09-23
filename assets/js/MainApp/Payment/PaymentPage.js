import {Panel, Grid, Row, Col, Button, ButtonGroup, Steps} from "rsuite";
import React from "react";
import {PaymentForm} from "./PaymentForm";
import AddonsForm from "./AddonsForm";
import CardDetailsForm from "./CardDetailsForm";
import {DatesBox} from "../RoomRecap/DatesBox";
import useMediaQuery from "react-responsive";

export default function PaymentPage(){

    const [step, setStep] = React.useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const labels = ["Details", "Addons", "Card", "Recap" ]
    const components = [<PaymentForm />, <AddonsForm />, <CardDetailsForm />, <div/>];
    const steps = labels.map((label, index) => <Steps.Item title={label} key={index}> </Steps.Item>)


    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    console.log(isTabletOrMobile);
    return (
        (isTabletOrMobile) ?

                <>
            <Grid style={{width:"100%"}}>
                <Row>
                    <Col xs={12} style={{padding:30}} >
                        <Steps current={step}>
                            {steps}
                        </Steps>
                        <Panel>
                            {components && components[step]}
                        </Panel>

                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={12} style={{height:"100%",backgroundColor:"#F3F3F4"}}>
                        <DatesBox />
                    </Col>
                </Row>
            </Grid>

    </> : <>
                <Grid style={{width:"100%"}}>
                    <Row>
                        <Steps current={step}>
                            {steps}
                        </Steps>
                        <Panel>
                            {components && components[step]}
                        </Panel>

                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next
                            </Button>
                        </ButtonGroup>

                    </Row>
                    <Row>
                        <DatesBox />
                    </Row>
                </Grid>

            </>

    )
}