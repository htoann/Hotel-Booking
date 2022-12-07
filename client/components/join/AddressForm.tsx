import React from 'react'
import {AddLocation} from '../map'

type AddressData = {
    address: {
        name: string;
        lat?: number;
        lng?: number;
    };
}
export type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}

const AddressForm = ({
    address,
    updateFields
}: AddressFormProps) => {
    const getLocationAddress = () => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.name}.json?access_token=pk.eyJ1IjoiY29uZ2x5MjgxMCIsImEiOiJjbDZ1amh1eDcxMmNnM2xtc2tyem9hdHd4In0.gq_G-4AHABMh5XgYY2Ng0w`)
            .then((response) => response.json())
            .then((data) => {
                if (data.features[0]) {
                    updateFields({
                        address: {
                            ...address,
                            lng: data.features[0].center[0],
                            lat: data.features[0].center[1]
                        }
                    })
                }
            })
    }
    return (
        <div className="mt-5 flex flex-col md:flex-row gap-x-10">
            <form className="w-full md:w-1/3 flex flex-col gap-x-2.5"
            >
                <label className="mb-4" htmlFor="address">Address</label>
                <input
                    className="rounded"
                    type="text"
                    id="address"
                    placeholder={`Your hotels`}
                    value={address.name}
                    onChange={(e) => updateFields({
                        address: {
                            ...address,
                            name: e.target.value
                        }
                    })}
                    onBlur={getLocationAddress}
                />
            </form>
            {
                address.lng && address.lng &&
                <div className="w-full md:w-2/3 md:p-5">
                    <span className="text-sm text-primary">
                    To show the exact address of your home, please mark your location on the map by clicking to your location or search your location
                        <span>(You can draw your mark to exact address in the map)</span>
                    </span>
                    <div className='mt-5'>
                        <AddLocation address={address} updateFields={updateFields}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddressForm
