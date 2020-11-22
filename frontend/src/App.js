import background from './images/background.svg';
import './App.css';
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import React from 'react';
import Screen0 from "./Pages/Screen0";
import Screen1 from "./Pages/Screen1";
import Screen2 from "./Pages/Screen2";
import Screen3 from "./Pages/Screen3";
import Screen4 from "./Pages/Screen4";
import Screen5 from "./Pages/Screen5";

import ArrowNext from "./Components/ArrowNext";
import ArrowBack from "./Components/ArrowBack";
import StepsBar from "./Components/StepsBar"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actualPage: 0,
            buildingId: null,
            buildingPosition: [null, null],
            buildingArea: null,
            buildingAirQuality: null,
            kwhNeeded: 10000,
            installationAge: 30,
            buildingHeat: {
                distanceHeatpipe: 999999
            },
            buildingGas: {
                distanceGaspipe: 999999
            },
        };
        this.parallaxRef = React.createRef();
    }

    changeActualPage = newActualPage => {
        if (newActualPage !== this.state.actualPage) {
            this.parallaxRef.current.scrollTo(newActualPage);
            this.setState({actualPage: newActualPage});
        }
    };

    setBuildingInfo = (id, position, area, airQuality, heat, gas) => {
        this.setState({
            buildingId: id,
            buildingPosition: position,
            buildingArea: area,
            buildingAirQuality: airQuality,
            buildingHeat: heat,
            buildingGas: gas
        })
    };

    render() {
        return (
            <div>
                <div className="Header-bar">
                    <StepsBar changeActualPage={this.changeActualPage}
                              actualPage={this.state.actualPage}>
                    </StepsBar>
                </div>

                <ArrowNext changeActualPage={this.changeActualPage}
                           actualPage={this.state.actualPage}/>

                <ArrowBack changeActualPage={this.changeActualPage}
                           actualPage={this.state.actualPage}/>


                <Parallax className="App Parallax-height" pages={5} scrolling={false} horizontal
                          ref={this.parallaxRef}>
                    <ParallaxLayer offset={-0.5} speed={0}>
                        <img src={background} className="background" alt="background"/>
                    </ParallaxLayer>

                    <Screen0 offset={0}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}/>
                    <Screen1 offset={1}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}
                             setBuildingInfo={this.setBuildingInfo}/>
                    <Screen2 offset={2}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}
                             airQuality={this.state.buildingAirQuality}/>
                    {/*<Screen3 offset={3}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}
                             setBuildingInstallationAge ={(newVal) => this.setState({kwhNeeded: newVal})}/>*/}
                    <Screen4 offset={3}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}
                             setKwhNeeded={(newVal) => this.setState({installationAge: newVal})}/>
                    <Screen5 offset={4}
                             changeActualPage={this.changeActualPage}
                             actualPage={this.state.actualPage}
                             data={this.state}/>

                </Parallax>

            </div>
        );
    }
}

export default App;
