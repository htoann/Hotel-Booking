import ReactMapGL, {
    GeolocateControl,
    Marker,
    NavigationControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, {useEffect, useRef, useState} from 'react'
import Geocoder from './Geocoder'
import {mapboxAccessToken} from '../../utils/config'
import {LocationState} from '../join/MapInput'

const AddLocation = ({
    location,
    setLocation
}: { location: LocationState, setLocation: React.Dispatch<React.SetStateAction<LocationState>> }) => {
    const {lat, lng} = location

    return (
        <div>
            <ReactMapGL
                mapboxAccessToken={mapboxAccessToken}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 6
                }}
                style={{height: '50vh'}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {lat && lng && <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={(e) =>
                        setLocation({
                            lng: e.lngLat.lng,
                            lat: e.lngLat.lat
                        })
                    }
                />}
                <NavigationControl position="bottom-right"/>
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    onGeolocate={(e) => {
                        setLocation({
                            lng: e.coords.longitude,
                            lat: e.coords.latitude
                        })
                    }
                    }
                />
                <Geocoder setLocation={setLocation}/>
            </ReactMapGL>
        </div>
    )
}

export default AddLocation
