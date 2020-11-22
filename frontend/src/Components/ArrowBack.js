import React from 'react';
import {Button} from "rsuite";
import arrow_back from "../images/arrow_back.svg";


const ArrowBack = (props) => {
    if (props.actualPage === 0) {
        return null
    }

    return <Button className="Btn Left-arrow" onClick={() => {
        props.changeActualPage(props.actualPage - 1 )
        // actions.increment()
    }}>
        <img src={arrow_back} alt='' width="75" height="75"/>
    </Button>

        ;
};

export default ArrowBack;