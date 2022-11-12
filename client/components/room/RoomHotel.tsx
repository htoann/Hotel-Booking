import React, {useEffect, useState} from 'react'
import {useGetHotelRoomsQuery} from '../../services/roomApi'
import {FaUser} from '../../utils/icons'
import {Loader} from '../layout'
import {Button} from '../core'
import {IRoom} from '../../models'

interface Props {
    hotelId: string
}

interface RoomReserve extends IRoom {
    quantity: number;
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
    const [roomsReserve, setRoomsReserve] = useState<RoomReserve[]>([])
    const [total, setTotal] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const onChangeSelect = (room: IRoom, quantity: number) => {
        if (quantity === 0) {
            roomsReserve.forEach((item, i) => {
                if (item._id === room._id) {
                    roomsReserve.splice(i, 1)
                    setTotal(total - item.quantity)
                    setPrice(price - item.quantity * item.price)
                }
            })
            setRoomsReserve([...roomsReserve])
        } else {
            const check = roomsReserve?.every((item) => {
                return item._id !== room._id
            })
            if (check) {
                setRoomsReserve([...roomsReserve, {...room, quantity: quantity}])
                setTotal(total + quantity)
                setPrice(price + quantity * room.price)
            } else {
                roomsReserve.forEach((item) => {
                    if (item._id === room._id) {
                        setTotal(total - item.quantity + quantity)
                        setPrice(price - item.quantity * item.price + quantity * item.price)
                        item.quantity = quantity
                    }
                })
            }
        }
    }

    const Reserve = () => (
        <>
            {total > 0
                ? <div className="text-sm text-primary flex flex-col gap-y-0.5">
                    <p><span className="font-semibold ">{total}</span> rooms for</p>
                    <h2 className="text-xl">US${price}</h2>
                    <p className="text-xs mb-2.5">Includes taxes and fees</p>
                </div>
                : <></>
            }
        </>
    )

    if (isLoading) {
        return (
            <div className="w-screen flex justify-center"><Loader/></div>
        )
    }
    return (
        <div className="flex h-max">
            <div>
                <table>
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th scope="col"
                                className=" border border-primary text-sm font-medium p-1.5 ">
                            Room Type
                            </th>
                            <th scope="col"
                                className=" border border-primary text-sm font-medium p-1.5">
                            Sleeps
                            </th>
                            <th scope="col"
                                className="border border-primary text-sm font-medium p-1.5 ">
                            Today&apos;s Price
                            </th>
                            <th scope="col"
                                className="border border-primary text-sm font-medium p-1.5">
                            Your Choices
                            </th>
                            <th scope="col"
                                className="border border-primary text-sm font-medium p-1.5">
                            Select amount
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
                                <td className="border border-primary text-sm font-light p-1.5 whitespace-nowrap">
                                    <div className="flex items-center justify-center ">
                                        {[...Array(room.maxPeople)].map((_, index) =>
                                            <FaUser key={index}/>)}
                                    </div>
                                </td>
                                <td className="border border-primary text-sm font-light p-1.5 whitespace-nowrap">
                                    <div>
                                        <p className="font-semibold">US${room.price}</p>
                                        <p className="text-primary">Includes taxes and fees</p>
                                    </div>
                                </td>
                                <td className="border border-primary text-sm font-light p-1.5 whitespace-nowrap">
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
                                <td className="border border-primary text-sm font-light px-2.5 whitespace-nowrap">
                                    <select defaultValue={0} onChange={(e) => {
                                        onChangeSelect(room, Number(e.target.value))
                                    }}>
                                        <option value={0}>0</option>
                                        {room.roomNumbers.map((e, index) => (
                                            <option key={index} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full">
                <table className="h-full">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th scope="col"
                                className="border border-primary text-sm font-medium p-1.5 ">
                            &nbsp;
                                <br/>
                            &nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white p-2">
                            <td className="border border-l-transparent border-r-primary border-y-primary text-sm p-1.5">
                                <Reserve/>
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
    )
}

export default RoomHotel
