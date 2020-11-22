import React, {useEffect, useState} from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import houseDimensions from "../images/houseDimensions.svg";
import {RadioGroup, Radio, InputNumber} from "rsuite";
import {Col, FlexboxGrid} from "rsuite";

const Screen3 = (props) => {
    const [checkTrigger, setCheckTrigger] = useState("blur")
    const [installationAge, setInstallationAge] = useState(30);

    useEffect(() => {
        console.log("installationAge")
        props.setBuildingInstallationAge(installationAge)
    }, [installationAge])

    return (<>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <img src={houseDimensions} className="houseDimensions" alt="houseDimensions"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.8}>
                <h1 className="k1" style={{fontSize: "60px"}}>TWOJA SYTUACJA</h1>
                <h2 className="k2" style={{marginTop: "20px"}}>Zaznacz Twoje obecne źródło ciepła</h2>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={1} style={{height: "100%"}}>

                <FlexboxGrid align="middle" justify="center">
                    <FlexboxGrid.Item componentClass={Col}>
                        <div style={{verticalAlign: "middle"}}>
                            <RadioGroup
                                style={{
                                    marginTop: "150px",
                                    padding: "25px",
                                    paddingRight: "40px",
                                    paddingBottom: "30px",
                                    borderStyle: "solid",
                                    borderWidth: "thin",
                                    borderRadius: "8px"
                                }}
                                appearance="default"
                                value={checkTrigger}
                                onChange={newCheckTrigger => {
                                    setCheckTrigger(
                                        newCheckTrigger
                                    );
                                }}
                            >
                                <Radio value="blur"><h4 className="k2">Piec na ekogroszek</h4></Radio>
                                <Radio value="change"><h4 className="k2">Piec typu "kopciuch"</h4></Radio>
                                <Radio value="none"><h4 className="k2">Elektrownia atomowa</h4></Radio>
                            </RadioGroup>

                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={24}>
                        <h2 className="k2" style={{marginTop: "20px"}}>Ile lat temu została położona Twoja instalacja
                            cieplna</h2>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={24}>
                        <InputNumber step={5} style={{width: 200, margin: 'auto'}}
                                     value={installationAge}
                                     onChange={(value) => setInstallationAge(value)}/>
                    </FlexboxGrid.Item>
                </FlexboxGrid>


            </ParallaxLayer>

        </>
    )
};

export default Screen3;
