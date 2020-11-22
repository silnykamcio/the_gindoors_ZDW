import React from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import housePollution from "../images/housePollution.svg";
import {Col, FlexboxGrid} from "rsuite";
import MapPollution from "../Components/MapPollution";


const Screen2 = (props) => {
    return (<>
            <ParallaxLayer offset={props.offset} speed={0.5}>
                <img src={housePollution} className="housePollution" alt="housePollution"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.1}>
                <div style={{marginTop: "50px", paddingBottom: "20px"}}>
                    <h1 className="k1">
                        STAN POWIETRZA W TWOJEJ OKOLICY
                    </h1>
                </div>
                <div style={{overflow: "auto", height: "100%", marginTop: "20px"}}>
                    <FlexboxGrid justify="start" align="middle" className="screen2-container">
                        <FlexboxGrid.Item componentClass={Col} colspan={5} lg={3} md={2} sm={2} xs={2}/>
                        <FlexboxGrid.Item componentClass={Col} colspan={8} lg={8} md={20} sm={20} xs={20}>
                            <div>
                                <MapPollution/>
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={8} lg={8} md={24} sm={24} xs={24}
                                          style={{marginTop: "20px"}}>
                            <FlexboxGrid justify="center" align="middle">
                                <FlexboxGrid.Item componentClass={Col} colspan={6} lg={12} md={20} sm={20} xs={20}>
                                    <h1 style={{color: "#22577A", fontSize: "55px"}}>PM 10</h1>
                                    <h2 style={{color: "#de4e4e", fontSize: "45px"}}>{props.airQuality} ug/m3</h2>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item componentClass={Col} colspan={12} lg={9} md={20} sm={20} xs={20}>
                                    <h1 style={{color: "#22577A", fontSize: "55px"}}>Dopuszczalna norma</h1>
                                    <h2 style={{color: "#67bf5a", fontSize: "45px"}}>50 ug/m3</h2>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </div>

            </ParallaxLayer>
        </>
    )
};

export default Screen2;
