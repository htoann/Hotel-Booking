import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {useControl} from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {mapboxAccessToken} from '../../utils/config'
import {AddressFormProps} from '../join/AddressForm'

const Geocoder = ({
    address,
    updateFields
}: AddressFormProps) => {
    const ctrl = new MapBoxGeocoder({
        accessToken: mapboxAccessToken,
        marker: false,
        collapsed: true
    })
    useControl(() => ctrl)
    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates
        updateFields({
            address: {
                ...address,
                lng: coords[0],
                lat: coords[1]
            }
        })
    })
    return null
}

export default Geocoder
