import React from 'react'
import {validateInputCity} from '../../utils/validateInputCity'

type HotelData = {
    name: string;
    title: string;
    desc: string;
    descShort: string;
    city: string;
}

type HotelInfoFormProps = HotelData & {
    updateFields: (fields: Partial<HotelData>) => void
}

const HotelInfoForm = ({
    name,
    title,
    desc,
    descShort,
    city,
    updateFields
}: HotelInfoFormProps) => {
    return (
        <div className="p-2.5 flex flex-col gap-y-5">
            <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e => updateFields({name: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={e => updateFields({title: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Description</label>
                <input
                    type="text"
                    required
                    value={desc}
                    onChange={e => updateFields({desc: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Description short</label>
                <input
                    type="text"
                    required
                    value={descShort}
                    onChange={e => updateFields({descShort: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">City</label>
                <input
                    type="text"
                    required
                    value={city}
                    onChange={e => updateFields({city: e.target.value})}
                />
            </div>
        </div>
    )
}

export default HotelInfoForm
