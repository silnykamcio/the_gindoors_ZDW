import React from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import house from "../images/house.svg";
import {Col, FlexboxGrid, Icon, Input, InputGroup} from "rsuite";
import Map from '../Components/Map.js'

const CustomInputGroupWidthButton = ({placeholder, ...props}) => (
    <InputGroup {...props} inside>
        <Input placeholder={placeholder}/>
        <InputGroup.Button>
            <Icon icon="search"/>
        </InputGroup.Button>
    </InputGroup>
);

const Screen1 = (props) => {
    return (<>
            <ParallaxLayer offset={props.offset} speed={0.3}>
                <img src={house} className="house" alt="house"/>
                <h4 style={{position: "absolute", bottom: "2vh", right: "10vh"}}>
                    * Nie przechowujemy Twoich danych
                </h4>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.15}>
                <div style={{marginTop: "50px", paddingBottom: "20px"}}>
                    <h1 className="k1">
                        PODAJ ADRES ZAMIESZKANIA
                    </h1>
                    <h4 className="k2" style={{marginTop: "15px"}}>
                        W celu sprawdzenia do jakiego źródła energii masz dostęp *
                    </h4>
                </div>
                <div style={{overflow: "auto", height: "100%"}}>
                    <FlexboxGrid justify="end" align="top">
                        <FlexboxGrid.Item componentClass={Col} colspan={8} lg={9} md={20} sm={20} xs={20}>
                            <div className="screen1-map">
                                {/*<CustomInputGroupWidthButton size="lg" placeholder="Podaj adres"*/}
                                {/*                             style={{marginBottom: "30px"}}/>*/}

                                <div>
                                    <Map setBuildingInfo={props.setBuildingInfo}/>
                                </div>
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={5} lg={4} md={2} sm={2} xs={2}/>
                    </FlexboxGrid>
                </div>

            </ParallaxLayer>
        </>
    )
};

export default Screen1;
