import React from 'react'

type HotelData = {
    name: string;
    title: string;
    desc: string;
    descShort: string;
    distance: string;
}

type HotelInfoFormProps = HotelData & {
    updateFields: (fields: Partial<HotelData>) => void
}

const HotelInfoForm = ({
    name,
    title,
    desc,
    descShort,
    updateFields,
    distance
}: HotelInfoFormProps) => {
    return (
        <div className="mt-5 p-5 flex flex-col gap-y-5 w-full md:w-1/2 mx-auto border rounded-lg">
            <div className="flex flex-col">
                <label htmlFor="" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Name
                    <span className="text-red-500"> *</span>
                </label>
                <input
                    className="rounded"
                    type="text"
                    required
                    value={name}
                    onChange={e => updateFields({name: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Title
                    <span className="text-red-500"> *</span>
                </label>
                <input
                    className="rounded"
                    type="text"
                    required
                    value={title}
                    onChange={e => updateFields({title: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor=""
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Description
                    <span className="text-red-500"> *</span>
                </label>
                <textarea
                    className="rounded"
                    rows={4}
                    required
                    value={desc}
                    onChange={e => updateFields({desc: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Description short
                    <span className="text-red-500"> *</span>
                </label>
                <input
                    className="rounded"
                    type="text"
                    required
                    value={descShort}
                    onChange={e => updateFields({descShort: e.target.value})}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Distance
                    <span className="text-red-500"> *</span>
                </label>
                <input
                    className="rounded"
                    type="text"
                    required
                    value={distance}
                    onChange={e => updateFields({distance: e.target.value})}
                />
            </div>
        </div>
    )
}

export default HotelInfoForm
