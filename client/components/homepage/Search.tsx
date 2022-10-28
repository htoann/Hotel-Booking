import React from 'react'
import Button from '../core/Button'

const Search = () => {
    return (
        <div className="w-full bg-primary">
            <div className=" mx-auto max-w-screen-xl relative ">
                <div className="text-white mx-2 mt-16 mb-20">
                    <h1 className="text-5xl font-bold ">
                        Find your next stay
                    </h1>
                    <h3 className="mt-2 text-2xl font-thin">
                        Search deals on hotels, homes, and much more...</h3>
                </div>
                <div className="absolute z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-max mx-auto bg-secondary flex items-end justify-center gap-x-2.5 p-2">
                        <label className="">
                            <span className="text-black">Location</span>
                            <input className="form-input block " placeholder="Where are you going?"/>
                        </label>
                        <label className="">
                            <span>Check In</span>
                            <input type="date" className="form-input block"/>
                        </label>
                        <label className="">
                            <span>Check Out</span>
                            <input type="date" className="form-input block"/>
                        </label>
                        <label className="">
                            <span>Room</span>
                            <input type="number" className="form-input block"/>
                        </label>
                        <div>
                            <Button text="Search" textColor="text-white" bgColor="bg-lightPrimary"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search
