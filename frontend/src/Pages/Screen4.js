import React, {useEffect, useState} from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import house from "../images/house.svg";
import {InputNumber, Panel, Radio, RadioGroup} from "rsuite";
import Nav from "@rsuite/responsive-nav";
import houseDimensions from "../images/houseDimensions.svg";


const Screen4 = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [kwh, setKwh] = useState(10000);
    const [kg, setKg] = useState(1000);
    const [area, setArea] = useState(400);
    const [checkTrigger, setCheckTrigger] = useState("blur");

    useEffect(() => {
        if (activeTab === '1') {
            console.log("kwh")
            props.setKwhNeeded(kwh)
        }
    }, [kwh])


    return (<>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <img src={houseDimensions} className="houseDimensions" alt="houseDimensions"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <h1>Zapotrzebowanie budynku</h1>
                <div style={{}}>
                    <Panel shaded style={{
                        width: "50vw", position: "absolute",
                        top: "150px",
                        left: "50%",
                        transform: "translate(-50%, 0%)",
                    }}>
                        <Nav activeKey={activeTab} onSelect={(selected) => setActiveTab(selected)} appearance="subtle"
                             justified moreText="Inne">
                            <Nav.Item eventKey="1">Znam wartość w kWh</Nav.Item>
                            <Nav.Item eventKey="2">Wiem ile opału zużywałem w poprzednim roku</Nav.Item>
                            <Nav.Item eventKey="3">Chcę wyliczyć zapotrzebowanie budynku</Nav.Item>
                        </Nav>
                        <Panel style={{display: activeTab === '1' ? 'block' : 'none'}}>
                            <div style={{margin: 'auto'}}>
                                <h4 className="Margin">Jakie jest łączne roczne zapotrzebownie na energię Twojego domu w kWh?</h4>
                                <InputNumber step={1000} style={{width: 200, margin: 'auto'}}
                                             value={kwh}
                                             onChange={(value) => setKwh(value)}/>
                            </div>
                        </Panel>
                        <Panel style={{display: activeTab === '2' ? 'block' : 'none'}}>
                            <div style={{}}>
                                <h4 className="Margin">Zaznacz Twoje obecne źródło ciepła:</h4>
                                <div >
                                    <RadioGroup
                                        style={{"text-align": "left"}}
                                        className="Source"
                                        appearance="default"
                                        value={checkTrigger}
                                        onChange={newCheckTrigger => {
                                            setCheckTrigger(
                                                newCheckTrigger
                                            );
                                        }}
                                >
                                    <Radio value="blur"><h5>Piec na ekogroszek</h5></Radio>
                                    <Radio value="change"><h5>Piec typu "kopciuch"</h5></Radio>
                                    <Radio value="none"><h5>Elektrownia atomowa</h5></Radio>
                                </RadioGroup>
                                </div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <h4 className="Margin">Ile opału zużyłeś w poprzednim roku w kg?</h4>
                                <InputNumber step={1000} style={{width: 200, margin: 'auto'}}
                                             value={kg}
                                             onChange={(value) => setKg(value)}/>
                            </div>
                        </Panel>
                        <Panel style={{display: activeTab === '3' ? 'block' : 'none'}}>
                            <div style={{margin: 'auto'}}>
                                <h4 className="Margin">Jaka jest Twoja powierzchnia budynku w m2?</h4>
                                <InputNumber step={1} style={{width: 200, margin: 'auto'}}
                                             value={area}
                                             onChange={(value) => setArea(value)}/>
                            </div>
                            <div>
                                <h4 className="Margin">W którym roku został wybudowany Twój budynek?</h4>
                                <div>
                                    <RadioGroup
                                        style={{"text-align": "left"}}
                                        className="Year"
                                        appearance="default"
                                        value={checkTrigger}
                                        onChange={newCheckTrigger => {
                                            setCheckTrigger(
                                                newCheckTrigger
                                            );
                                        }}
                                    >
                                        <Radio value="przed1992"><h5>Wybudowany przed 1982 (bez izolacji cieplnej)</h5></Radio>
                                        <Radio value="lata8090"><h5>W latach 80. i 90. ubiegłego wieku</h5></Radio>
                                        <Radio value="koniec90"><h5>Od końca lat 90. ubiegłego wieku (dom dobrze izolowany)</h5></Radio>
                                        <Radio value="po2017"><h5>Po 2017r. (dom zbudowany zgodnie w obowiązującymi wymaganiami)</h5></Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </Panel>
                    </Panel>
                </div>
            </ParallaxLayer>
        </>
    )
};

export default Screen4;
