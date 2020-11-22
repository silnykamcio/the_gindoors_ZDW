import React from 'react';
import {Button, Steps} from "rsuite";
import arrow_back from "../images/arrow_back.svg";


const StepsBar = (props) => {
    if (props.actualPage === 0) {
        return null
    }

    return <Steps current={props.actualPage - 1}>
        <Steps.Item onClick={() => props.changeActualPage(1)}/>
        <Steps.Item onClick={() => props.changeActualPage(2)}/>
        <Steps.Item onClick={() => props.changeActualPage(3)}/>
        <Steps.Item onClick={() => props.changeActualPage(4)}/>
{/*        <Steps.Item onClick={() => props.changeActualPage(5)}/>*/}
    </Steps>

        ;
};

export default StepsBar;