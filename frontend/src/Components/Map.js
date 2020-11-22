import React, {useEffect, useMemo, useRef, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, TileLayer} from "react-leaflet";

import iconMarker from "./Marker";
import Geocode from "react-geocode";
import {Icon, Input, InputGroup} from "rsuite";
import axios from "axios";

Geocode.setApiKey("AIzaSyDM_Cn-GJjkvKy7i52KJSpcYdzcm92haD0");
Geocode.setLanguage("pl");
Geocode.setRegion("pl");

const m = [51.5990328, 18.9393251];


function Map(props) {
    const [map, setMap] = useState(null);
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState(m);


    // useEffect(() => {
    //     setPosition(m);
    // }, [])

    useEffect(() => {
        const apiUrl = 'http://18.216.14.14:5100'
        let id, positionApi, area, airQuality, heat, gas;
        // console.log('AAAAAAAAA')
        // console.log(position)
        positionApi = [position.lat, position.lng] // just in case...
        axios.get(apiUrl + '/building/get-id/' + position)
            .then((response) => {
                console.log(response)
                id = response.data.buildingId
                positionApi = [response.data.lat, response.data.lon]

                axios.all([
                    axios.get(apiUrl + '/building/use-area/' + id),
                    axios.get(apiUrl + '/air/quality/building/' + id),

                    axios.get(apiUrl + '/network/get-dist-geom-heat/' + id),
                    axios.get(apiUrl + '/network/get-dist-geom-gas/' + id),

                    // axios.get(apiUrl + '/network/get-geojson-gas'),
                    // axios.get(apiUrl + '/network/get-geojson-gas-planned'),
                    // axios.get(apiUrl + '/network/get-geojson-heat'),
                    // axios.get(apiUrl + '/network/get-geojson-heat-planned'),
                ]).then(response => {
                    area = response[0].data.useArea;
                    airQuality = response[1].data.airQuality;

                    heat = response[2].data;
                    gas = response[3].data;

                    console.log({id, position, area, airQuality});
                    props.setBuildingInfo(id, positionApi, area, airQuality, heat, gas);
                })
            })
    }, [position]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            degeocode(address, setPosition, map);
        }
    };

    return (
        <>
            <InputGroup {...props} style={{marginBottom: "30px"}}>
                <Input placeholder={"Podaj adres"} value={address} onChange={(text) => setAddress(text)}
                       onKeyDown={handleKeyDown}/>
                <InputGroup.Addon className="Cursor" onClick={() => degeocode(address, setPosition, map)} >
                    <Icon icon="search"/>
                </InputGroup.Addon>
            </InputGroup>

            <MapContainer className="Map" center={[51.5990328, 18.9393251]} zoom={13}
                          scrollWheelZoom={true} whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"/>
                <DraggableMarker setAddress={setAddress} setPosition={setPosition} position={position}/>
            </MapContainer>
        </>
    );
}

function DraggableMarker(props) {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const markerPosition = marker.getLatLng()
                    props.setPosition([markerPosition.lat, markerPosition.lng]);
                    console.log(markerPosition);
                    geocode(markerPosition, props.setAddress);
                }
            },
        }),
        [],
    );
    return (
        <Marker
            icon={iconMarker}
            draggable={true}
            eventHandlers={eventHandlers}
            position={props.position}
            ref={markerRef}>
        </Marker>
    )
}

function geocode(position, setAddress) {
    Geocode.fromLatLng(position.lat, position.lng).then(
        response => {
            const address = response.results[0].formatted_address;
            console.log(address);
            setAddress(address);
        },
        error => {
            console.error(error);
        }
    );
}

function degeocode(address, setPosition, map){
    Geocode.fromAddress(address + " Zduńska Wola").then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            setPosition([lat, lng]);
            map.flyTo([lat, lng]);
        },
        error => {
            console.error(error);
        }
    );
}


export default Map;