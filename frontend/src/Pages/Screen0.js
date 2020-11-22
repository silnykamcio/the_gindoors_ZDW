import React from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import city from "../images/city.svg";
import herb from "../images/zdunskaWolaHerb.png";
import {Button, Col, FlexboxGrid, Icon, Input, InputGroup} from "rsuite";

const CustomInputGroupWidthButton = ({placeholder, ...props}) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder}/>
        <InputGroup.Button>
            <Icon icon="search"/>
        </InputGroup.Button>
    </InputGroup>
);

const Screen0 = (props) => {
    return (<>
            <ParallaxLayer offset={props.offset} speed={0.3}>
                <img src={city} className="start" alt="house"/>
            </ParallaxLayer >
            <ParallaxLayer offset={props.offset} speed={0.3}>
                <img src={herb} className="herb" alt="herb"/>
            </ParallaxLayer >
            <ParallaxLayer offset={props.offset} speed={0.15}>
                <div style={{marginTop: "50px", paddingBottom: "20px"}}>
                    <h1 className="k1">
                        STOP SMOG
                    </h1>
                    <h4 className="k2 k2v2">
                        W Zduńskiej Woli!
                    </h4>
                    <h4 className="k2 k2v2">
                        Zastanawiasz się, czy wymienić piec węglowy na inne źródło ciepła? <br/>
                        Bardzo dobrze trafiłeś!
                        <br/><br/>
                        Udostępniamy Ci prosty w obsłudze kalkulator, dzięki któremu zobaczysz jakie masz
                        możliwości <br/>
                        w zasięgu Twojego domu oraz otrzymasz przybliżone koszta inwestycji.
                    </h4>
                    <Button className="More" onClick={() => {
                        props.changeActualPage(props.actualPage + 1)
                    }}> <a className="k3">Kontynuuj</a>
                    </Button>
                </div>
                <div style={{overflow: "auto", height: "100%"}}>
                    <FlexboxGrid justify="end" align="top">
                        <FlexboxGrid.Item componentClass={Col} colspan={8} lg={9} md={20} sm={20} xs={20}>
                            <div className="screen1-map">

                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={5} lg={4} md={2} sm={2} xs={2}/>
                    </FlexboxGrid>
                </div>

            </ParallaxLayer>
        </>
    )
};

export default Screen0;