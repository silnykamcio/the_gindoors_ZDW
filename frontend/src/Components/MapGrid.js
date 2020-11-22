import React, {useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import iconMarker from "./Marker";
import axios from "axios";


const MapGrid = (props) => {
    const [geometry, setGeometry] = useState({});
    const apiUrl = 'http://18.216.14.14:5100'

    let keyxd = 0

    useEffect(() => {
        axios.all([
            // axios.get(apiUrl + '/network/get-geojson-gas'),
            // axios.get(apiUrl + '/network/get-geojson-gas-planned'),
            // axios.get(apiUrl + '/network/get-geojson-heat'),
            // axios.get(apiUrl + '/network/get-geojson-heat-planned'),
        ]).then(response => {
            // console.log(response[0].data)
            // const data1 = response[0].data

            // data1.geometry = JSON.parse(data1.geometry)
            // console.log(data1)

            setGeometry({
                // gas: data1,
                // gasPlanned: JSON.parse(response[1].data.geom[0]),
                // heat: JSON.parse(response[2].data.geom[0]),
                // heatPlanned: JSON.parse(response[3].data.geom[0])
            })
            console.log({
                // gas: data1,
                // gasPlanned: JSON.parse(response[1].data.geom[0]),
                // heat: JSON.parse(response[2].data.geom[0]),
                // heatPlanned: JSON.parse(response[3].data.geom[0])
            })
            keyxd += 1;
        })
    }, [])

    const myStyle = {
        "color": "#ff7800",
        "weight": 5,

    };

    var states = [{
        "type": "Feature",
        "properties": {"party": "Republican"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22, 48.98],
                [-96.58, 45.94],
                [-104.03, 45.94],
                [-104.05, 48.99]
            ]]
        }
    }, {
        "type": "Feature",
        "properties": {"party": "Democrat"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-109.05, 41.00],
                [-102.06, 40.99],
                [-102.03, 36.99],
                [-109.04, 36.99],
                [-109.05, 41.00]
            ]]
        }
    }];

    const [map, setMap] = useState(null);
    return <MapContainer className="MapGrid" center={[51.60282965128718, 18.9332693143455]} zoom={13}
                         scrollWheelZoom={true} whenCreated={setMap}>
        <TileLayer
            // load={() => addWMS(map)}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"/>

        <Marker icon={iconMarker} position={[51.60282965128718, 18.9332693143455]}>

        </Marker>
        {/*{geometry &&*/}
        {/*<GeoJSON key={keyxd} data={geometry.gas} style={myStyle}/>*/}
        {/*}*/}
        {/*<GeoJSON data={geometry.gas} />*/}

    </MapContainer>;
};


export default MapGrid;