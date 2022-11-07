import {mapboxAccessToken} from '../../utils/config'
import Map, {GeolocateControl, Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapContainer = () => {
    return (
        <>
            <Map
                initialViewState={{
                    longitude: 107.5,
                    latitude: 16.5,
                    zoom: 10
                }}
                style={{width: 600, height: 400}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={mapboxAccessToken}
            >
                <Marker longitude={107.6} latitude={16.45} color="red"/>
                <GeolocateControl/>
            </Map>
        </>
    )
}

export default MapContainer
