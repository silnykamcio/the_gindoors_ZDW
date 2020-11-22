import React from 'react';
import {Button} from "rsuite";
import arrow_next from "../images/arrow_next.svg";


const ArrowNext = (props) => {
    if (props.actualPage === 0 || props.actualPage === 4) {
        return null
    }

    return <Button className="Btn Right-arrow" onClick={() => {
        props.changeActualPage(props.actualPage + 1 )
        // actions.increment()
    }}>
        <img src={arrow_next} alt='' width="75" height="75"/>
    </Button>

        ;
};

export default ArrowNext;