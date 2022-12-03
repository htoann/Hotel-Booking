import Link from 'next/link'
import React, {useState} from 'react'
import Button from '../core/Button'

const Search = () => {
    const [city, setCity] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    return (
        <div className="w-full bg-primary">
            <div className=" mx-auto container px-4 lg:px-6 relative ">
                <div className="text-white mx-2 mt-16 mb-48 sm:mb-32 lg:mb-28">
                    <h1 className="text-5xl font-bold ">Find your next stay</h1>
                    <h3 className="mt-2 text-2xl font-thin">
                        Search deals on hotels, homes, and much more...
                    </h3>
                </div>
                <div
                    className="
                    absolute z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    container px-4 lg:px-6 xl:px-40
                    "
                >
                    <div
                        className="mx-auto w-full rounded bg-secondary flex flex-wrap items-end justify-center gap-2.5 p-2 pb-5">
                        <div className="">
                            <span className="text-black">Location</span>
                            <input
                                value={city}
                                className="form-input block rounded"
                                placeholder="Where are you going?"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <span>Check In</span>
                            <input type="date" className="form-input block rounded"/>
                        </div>
                        <div className="">
                            <span>Check Out</span>
                            <input type="date" className="form-input block rounded"/>
                        </div>
                        <div className="">
                            <span>Room</span>
                            <input type="number" className="form-input block rounded"/>
                        </div>

                        <Link
                            href={`search/${city}`}
                            className={!city ? 'pointer-events-none cursor-not-allowed' : ''}
                        >
                            <div>
                                <Button
                                    text="Search"
                                    textColor="text-white"
                                    bgColor="bg-lightPrimary"
                                />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
