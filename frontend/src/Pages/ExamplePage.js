import React from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import ExampleComponent from "../Components/ExampleComponent";
import house from "../images/house.svg";


const ExamplePage = (props) => {
    return (<>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <img src={house} className="house" alt="house"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={1}>
                <ExampleComponent changeActualPage={props.changeActualPage} actualPage={props.actualPage}/>
            </ParallaxLayer>
        </>
    )
};

export default ExamplePage;
