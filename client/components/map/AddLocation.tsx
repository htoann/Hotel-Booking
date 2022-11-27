import ReactMapGL, {
    GeolocateControl,
    Marker,
    NavigationControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import Geocoder from './Geocoder'
import {mapboxAccessToken} from '../../utils/config'
import {AddressFormProps} from '../join/AddressForm'

const AddLocation = ({
    address,
    updateFields
}: AddressFormProps) => {
    const {lat, lng} = address

    return (
        <div>
            <ReactMapGL
                mapboxAccessToken={mapboxAccessToken}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 10
                }}
                style={{height: '50vh'}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {lat && lng && <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={(e) =>
                        updateFields({
                            address: {
                                ...address,
                                lng: e.lngLat.lng,
                                lat: e.lngLat.lat
                            }
                        })
                    }
                />}
                <NavigationControl position="bottom-right"/>
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    onGeolocate={(e) => {
                        updateFields({
                            address: {
                                ...address,
                                lng: e.coords.longitude,
                                lat: e.coords.latitude
                            }
                        })
                    }
                    }
                />
                <Geocoder address={address} updateFields={updateFields}/>
            </ReactMapGL>
        </div>
    )
}

export default AddLocation
