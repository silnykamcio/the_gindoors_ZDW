import Leaflet from 'leaflet'
import icon from "../images/marker.svg"

const image = new Leaflet.Icon({
    iconUrl: icon,
    iconSize:     [50, 120], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -30]// point from which the popup should open relative to the iconAnchor
})

export default image;