import React from 'react';
import {ParallaxLayer} from "react-spring/renderprops-addons";
import house from "../images/house.svg";
import workers from "../images/workers.svg";
import charts from "../images/charts.svg";
import {Col, FlexboxGrid, Panel} from "rsuite";
import MapGrid from "../Components/MapGrid";

import BarChart from "@rsuite/charts/lib/charts/BarChart";
import Bars from "@rsuite/charts/lib/series/Bars";
// import Scatter from "@rsuite/charts/lib/series/Scatter";
import YAxis from "@rsuite/charts/lib/components/YAxis";
import XAxis from "@rsuite/charts/lib/components/XAxis";

const Screen5 = (props) => {
    let data = [["Zakup jednostki grzewczej", 10000, 7000, 8000, 11000], ["Wymiana instalacji", 15000, 13000, 14000, 16000], ["W sumie", 25000, 20000, 22000, 27000]];
    let data2 = [["Roczne koszty", 10000, 7000, 8000, 11000]];
    let data4 = [["Nakład pieniężny na start", 20000, 23000, 21000, 17000]];
    let data5 = [["Czas po jakim się zwróci", 15, 21, 14, 13]];
    const conditions = {
        minimumGasDistance: 15,
        minimumHeatDistance: 15
    }

    const pipes = () => {
        if (props.data.buildingHeat.distanceHeatpipe < conditions.minimumGasDistance) {
            return (<React.Fragment>
                    <p className={"casualText"}>Wspaniale - możesz wykorzystać <b>przyłącze ciepłownicze</b>! Jest to
                        rekomendowane źródło ciepła dla Ciebie - zwróc na nie szczególną uwagę w dalszej analizie.</p>
                    <h4 style={{marginTop: "50px"}}>Długość
                        przyłącza: {props.data.buildingHeat.distanceHeatpipe.toFixed(2)} m</h4>
                </React.Fragment>
            )
        } else if (props.data.buildingGas.distanceGaspipe < conditions.minimumGasDistance) {
            return (<React.Fragment>
                    <p className={"casualText"}>Wspaniale - możesz wykorzystać <b>przyłącze gazowe</b>! Jest to
                        rekomendowane źródło ciepła dla Ciebie - zwróc na nie szczególną uwagę w dalszej analizie.</p>
                    <h4 style={{marginTop: "50px"}}>Długość
                        przyłącza: {props.data.buildingGas.distanceGaspipe.toFixed(2)} m</h4>
                </React.Fragment>
            )
        }

        return (
            <p className={"casualText"}>Niestety z naszych danych wynika, że najbliższe
                przyłącza
                znajdują się zbyt daleko Twojego domu i nie ma planów, aby w najbliższych latach
                miało to ulec zmianie. Nie szkodzi! Znajdziemy inny sposób, by ocieplić Twój
                dom.</p>
        )
    }

    return (<>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <img src={workers} className={"workers"}
                     alt="workers"/>
                <img src={charts} className={"charts"}
                     alt="charts"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <img src={house} style={{height: "20vh", position: "absolute", left: "5vh", bottom: "5vh", display: "none"}}
                     alt="house"/>
            </ParallaxLayer>
            <ParallaxLayer offset={props.offset} speed={0.2}>
                <div style={{overflow: "auto", height: "100%"}}>
                    <h1>Wyniki</h1>
                    <Panel shaded className={"finalPage-panel"}>
                        <FlexboxGrid align="middle" justify="center">
                            <FlexboxGrid.Item componentClass={Col} lg={12} md={12} sm={24}>
                                <div>
                                    <MapGrid/>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item componentClass={Col} lg={12} md={12} sm={24}>
                                <h3>Odległość od przyłącza</h3>
                                <div style={{marginTop: "10px"}}>
                                    {pipes()}
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Panel>
                    <Panel shaded className={"finalPage-panel"}>
                        <h3>Koszty wymiany:</h3>
                        <BarChart data={data}>
                            <YAxis axisLabel={value => `${value / 1} zł`} minInterval={1}/>
                            <Bars name="Pompa ciepła" />
                            <Bars name="Piec na biomasę" />
                            <Bars name="Ogrzewanie z prądu" />
                            <Bars name="Piec gazowy" />
                        </BarChart>
                    </Panel>
                    <Panel shaded className={"finalPage-panel"}>
                        <h3>Koszty utrzymania (roczne):</h3>
                        <BarChart horizontal data={data2}>
                            <XAxis axisLabel={value => `${value / 1} zł`} minInterval={1}/>
                            <Bars name="Pompa ciepła" />
                            <Bars name="Piec na biomasę" />
                            <Bars name="Ogrzewanie z prądu" />
                            <Bars name="Piec gazowy" />
                        </BarChart>
                    </Panel>
                    <Panel shaded className={"finalPage-panel"}>
                        <h3>Zobacz czy masz szanse na dotacje:</h3>
                        <h3>Formularz z dotacjami i sumami</h3>
                    </Panel>
                    <Panel shaded className={"finalPage-panel"} style={{marginBottom: "70px"}}>
                        <h3>Podsumowanie:</h3>
                        <h2 style={{marginTop:"20px"}}>Nakład pieniężny na start</h2>
                        <BarChart horizontal data={data4}>
                            <XAxis axisLabel={value => `${value / 1} zł`} minInterval={1}/>
                            <Bars name="Pompa ciepła" />
                            <Bars name="Piec na biomasę" />
                            <Bars name="Ogrzewanie z prądu" />
                            <Bars name="Piec gazowy" />
                        </BarChart>
                        <h2 style={{marginTop:"20px"}}>Czas po jakim się zwróci</h2>
                        <BarChart horizontal data={data5}>
                            <XAxis axisLabel={value => `${value / 1} lat`} minInterval={1}/>
                            <Bars name="Pompa ciepła" />
                            <Bars name="Piec na biomasę" />
                            <Bars name="Ogrzewanie z prądu" />
                            <Bars name="Piec gazowy" />
                        </BarChart>
                    </Panel>
                </div>
            </ParallaxLayer>
        </>
    )
};

export default Screen5;
