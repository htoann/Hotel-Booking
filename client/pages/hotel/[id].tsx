import React from 'react'
import {useRouter} from 'next/router'
import {useGetHotelQuery} from '../../services/hotelApi'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {
    MdLocationOn,
    AiFillHeart,
    FaParking,
    AiOutlineWifi,
    MdFamilyRestroom,
    MdAirportShuttle,
    MdSmokeFree,
    Ri24HoursFill
} from '../../utils/icons'
import {Button} from '../../components/core'

const HotelDetailPage = () => {
    const router = useRouter()
    const id = router.query?.id as string
    const {data: hotel, isLoading, error} = useGetHotelQuery(id)

    if (error) {
        // @ts-ignore
        const status = error.status || 404
        return <ErrorPage statusCode={status}/>
    }
    if (isLoading) return <div>Loading</div>
    if (hotel) {
        return (
            <>
                <Head>
                    <title>Booking</title>
                </Head>
                <div className="mt-2 mx-auto max-w-screen-xl overflow-hidden ">
                    <div className="flex">
                        <div className="w-1/5 p-5 bg-sky-400">
                            Search
                        </div>
                        <div className="w-4/5 p-5">
                            <div>
                                <div className="flex gap-x-2">
                                    <p className='first-letter:uppercase text-sm text-white bg-gray-500 w-max px-1.5 py-0.5 rounded'>{hotel.type}</p>
                                    <div className="text-yellow-400">
                                        {hotel.rating}
                                        <span className="star">&#9733;</span>
                                    </div>
                                </div>
                                <h1 className="mb-2 text-xl font-bold">{hotel.title}</h1>
                            </div>
                            <div>
                                <div className="text-secondary flex gap-x-1.5 items-center">
                                    <MdLocationOn/>
                                    <h2 className="text-primary">{hotel.address}</h2>
                                    <p className="text-secondary cursor-pointer">Great location - Show Map</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-4/5 p-5">
                            <p>{hotel.desc}</p>
                            <p>Couples in particular like the location – they rated it
                                <span className="font-bold">{` ${hotel.score} `}</span>
                                for a two-person trip.
                            </p>
                            <div className="mt-2">
                                <h2 className="font-bold text-lg">Most popular facilities</h2>
                                <ul className="flex gap-x-2.5">
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <AiOutlineWifi/>
                                        <p className="text-primary text-base">Free WiFi</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <FaParking/>
                                        <p className="text-primary text-base">Free parking</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdFamilyRestroom/>
                                        <p className="text-primary text-base">Family rooms</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdAirportShuttle/>
                                        <p className="text-primary text-base">Airport shuttle</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdSmokeFree/>
                                        <p className="text-primary text-base">Non-smoking rooms</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <Ri24HoursFill/>
                                        <p className="text-primary text-base">24-hour front desk</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-1/5">
                            <div className="text-black flex flex-col gap-y-2.5 p-2">
                                <h1 className="font-bold">Property Highlights</h1>
                                <div className="flex items-center text-2xl">
                                    <AiFillHeart className="w-1/6"/>
                                    <h2 className="text-sm w-5/6">{hotel.descShort}</h2>
                                </div>
                                <div className="flex items-center text-2xl">
                                    <FaParking className="w-1/6"/>
                                    <h2 className="text-sm w-5/6"> Free private parking available at the hotel</h2>
                                </div>
                                <Button text="Reserve" textColor="text-white" bgColor="bg-primary" fullWidth={true}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 border-t border-current">

                    </div>
                </div>
            </>
        )
    }
    return (
        <div>Some thing is wrong</div>
    )
}

export default HotelDetailPage
