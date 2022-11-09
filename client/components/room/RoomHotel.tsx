import React from 'react'
import {useGetHotelRoomsQuery} from '../../services/roomApi'
import {FaUser} from '../../utils/icons'
import {Loader} from '../layout'
import {Button} from '../core'

interface Props {
    hotelId: string
}

const RoomHotel = ({hotelId}: Props) => {
    const services = [
        'Free toiletries',
        'Bidet',
        'Toilet',
        'Bathtub or shower',
        'Towels',
        'Linens',
        'Hypoallergenic',
        'Tile/Marble floor',
        'Desk',
        'Sitting area',
        'TV',
        'Slippers',
        'Refrigerator',
        'Telephone',
        'Satellite channels',
        'Hairdryer',
        'Fan',
        'Walk-in closet',
        'Electric kettle',
        'Wardrobe or closet',
        'Dining table',
        'Clothes rack',
        'Toilet paper'
    ]
    const {data: rooms, isLoading} = useGetHotelRoomsQuery(hotelId)
    if (isLoading) {
        return (
            <div className="w-screen flex justify-center"><Loader/></div>
        )
    }
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <div className="flex">
                                <table className="w-10/12">
                                    <thead className="bg-blue-400 text-white">
                                        <tr>
                                            <th scope="col"
                                                className="border border-primary text-sm font-medium px-6 py-2 ">
                                            Room Type
                                            </th>
                                            <th scope="col"
                                                className="border border-primary text-sm font-medium px-6 py-2">
                                            Sleeps
                                            </th>
                                            <th scope="col"
                                                className="border border-primary text-sm font-medium px-6 py-2 ">
                                            Today&apos;s Price
                                            </th>
                                            <th scope="col"
                                                className="border border-primary text-sm font-medium px-6 py-2">
                                            Your Choices
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms?.map(room => (
                                            <tr key={room._id} className="bg-white p-2">
                                                <td className="border border-l-transparent border-r-primary border-y-primary text-sm p-1.5">
                                                    <h2 className="font-semibold underline text-base text-secondary w-max cursor-pointer">{room.title}</h2>
                                                    <p className="my-2 w-max">{room.desc}</p>
                                                    <ul className="text-xs flex flex-wrap gap-x-1.5">
                                                        {services.map((service, index) => (
                                                            <li key={index}>
                                                                <span className="text-green-500">✓</span>{service}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="border border-primary text-sm font-light px-6 py-2 whitespace-nowrap">
                                                    <div className="flex items-center justify-center ">
                                                        {[...Array(room.maxPeople)].map((index) =>
                                                            <FaUser key={index}/>)}
                                                    </div>
                                                </td>
                                                <td className="border border-primary text-sm font-light px-6 py-2 whitespace-nowrap">
                                                    <div>
                                                        <p className="font-semibold">US${room.price}</p>
                                                        <p className="text-primary">Includes taxes and fees</p>
                                                    </div>
                                                </td>
                                                <td className="border border-primary text-sm font-light px-6 py-2 whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-semibold">50% required to cancel</h2>
                                                        <p>
                                                            <span
                                                                className="font-semibold uppercase">NO PREPAYMENT NEEDED </span>
                                                        – pay at the property
                                                        </p>
                                                        <p className="text-red-500">Only {room.roomNumbers.length} rooms
                                                        left on
                                                        our site</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <table className="w-2/12">
                                    <thead className="bg-blue-400 text-white">
                                        <tr>
                                            <th scope="col"
                                                className="border border-primary text-sm font-medium px-6 py-2 ">
                                            &nbsp;
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white p-2">
                                            <td className="border border-l-transparent border-r-primary border-y-primary text-sm p-1.5">
                                                <div>
                                                    <Button
                                                        text={"I'll reserve"}
                                                        textColor="text-white"
                                                        bgColor="bg-primary"
                                                        fullWidth={true}
                                                    />
                                                </div>
                                                <div className="text-primary text-sm mt-2.5">
                                                    <h2>Let&apos;s go to the next step</h2>
                                                    <ul className="list-inside list-disc">
                                                        <li>Confirmation is immediate</li>
                                                        <li>No booking or credit card fees!</li>
                                                    </ul>
                                                    <h2 className="text-green-500 font-medium text-xs border-2 border-green-500 mt-2.5 px-1.5 py-0.5">
                                                    No credit card needed!
                                                    </h2>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomHotel
