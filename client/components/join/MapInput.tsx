import React, {useEffect, useState} from 'react'
import {AddLocation} from '../map'

export interface LocationState {
    lat?: number;
    lng?: number;
}

const MapInput = () => {
    const [addressName, setAddressName] = useState<string>('')
    const [location, setLocation] = useState<LocationState>({})
    const [isSubmit, setIsSubmit] = useState(false)
    const getLocationAddress = () => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressName}.json?access_token=pk.eyJ1IjoiY29uZ2x5MjgxMCIsImEiOiJjbDZ1amh1eDcxMmNnM2xtc2tyem9hdHd4In0.gq_G-4AHABMh5XgYY2Ng0w`)
            .then((response) => response.json())
            .then((data) => {
                if (data.features[0]) {
                    setLocation({
                        lat: data.features[0].center[1],
                        lng: data.features[0].center[0]
                    })
                    setIsSubmit(true)
                }
            })
    }
    return (
        <div className="flex gap-x-10">
            <form className="w-1/2 my-2.5 flex flex-col gap-x-2.5"
            >
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    placeholder={`Your hotels`}
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                    onBlur={getLocationAddress}
                />
            </form>
            {isSubmit && <div className="w-1/2 p-5">
                <span className="text-sm text-primary">To show the exact address of your home, please mark your location on the map by clicking to your location or search your location
                </span>
                <div className='mt-5'>
                    <AddLocation location={location} setLocation={setLocation}/>
                </div>
            </div>}
        </div>
    )
}

export default MapInput
