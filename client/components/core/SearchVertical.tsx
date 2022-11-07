import React from 'react'
import Button from './Button'

const SearchVertical = () => {
    return (
        <div className="w-full h-full p-5 bg-secondary">
            <h1 className="font-semibold text-primary text-2xl">Search</h1>
            <div className="w-full mx-auto flex flex-col items-start justify-center gap-y-2.5">
                <label className="w-full">
                    <span className="text-black">Location</span>
                    <input className="form-input block w-full " placeholder="Where are you going?"/>
                </label>
                <label className="w-full">
                    <span>Check In</span>
                    <input type="date" className="form-input block w-full"/>
                </label>
                <label className="w-full">
                    <span>Check Out</span>
                    <input type="date" className="form-input block w-full"/>
                </label>
                <label className="w-full">
                    <span>Room</span>
                    <input type="number" className="form-input block w-full"/>
                </label>
                <div className="w-full">
                    <Button text="Search" textColor="text-white" bgColor="bg-lightPrimary" fullWidth={true}/>
                </div>
            </div>
        </div>
    )
}

export default SearchVertical
