import React, {useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker,TileLayer, WMSTileLayer} from "react-leaflet";
import L from 'leaflet';
import iconMarker from "./Marker";


const MapPollution = (props) => {
    const [map, setMap] = useState(null);
    return <MapContainer className="MapPollution" center={[51.60282965128718, 18.9332693143455]} zoom={15} scrollWheelZoom={true} whenCreated={setMap}>
        <TileLayer
            // load={() => addWMS(map)}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"/>

        <WMSTileLayer
            url="http://18.216.14.14:8080/geoserver/cite/wms"
            opacity={0.4}
            /*transparent*/
            srs="EPSG:2180"
            format="image/png"
            layers="cite:pm10_raster"
        />
        <Marker  icon={iconMarker} position={[51.60282965128718, 18.9332693143455]}>

        </Marker>
    </MapContainer>;
};

// function addWMS(map){
//     console.log('jest');
//     L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
//         layers: 'TOPO-OSM-WMS'
//     }).addTo(map);
// }

export default MapPollution;