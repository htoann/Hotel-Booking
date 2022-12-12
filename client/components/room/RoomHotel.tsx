import React, {useState} from 'react'
import {
    useGetHotelRoomsQuery
} from '../../services/roomApi'
import {useBookingRoomMutation} from '../../services/bookingApi'
import {FaUser} from '../../utils/icons'
import {Loader} from '../layout'
import {Button} from '../core'
import {IRoom} from '../../models'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

interface Props {
    hotelId: string;
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
    const [checkIn, setCheckIn] = useState<Date | null>()
    const [checkOut, setCheckOut] = useState<Date | null>()

    const router = useRouter()

    const onChangeSelect = (room: IRoom, quantity: number) => {
        if (quantity === 0) {
            roomsReserve.forEach((item, i) => {
                if (item._id === room._id) {
                    roomsReserve.splice(i, 1)
                    setTotal(total - item.quantity)
                    setPrice(price - item.quantity * item.price)
                }
            })
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
                        setPrice(
                            price - item.quantity * item.price + quantity * item.price
                        )
                        item.quantity = quantity
                    }
                })
            }
        }
    }

    const Reserve = () => (
        <>
            {total > 0 ? (
                <div className="text-sm lg:text-base text-primary flex flex-col gap-y-0.5">
                    <p>
                        <span className="font-semibold ">{total}</span> rooms for
                    </p>
                    <h2 className="text-xl lg:text-3xl font-semibold">US${price}</h2>
                    <p className="text-xs lg:text-sm mb-2.5">Includes taxes and fees</p>
                </div>
            ) : (
                <></>
            )}
        </>
    )

    const [
        bookingRoom,
        {
            isSuccess: isBookingSuccess,
            isError: isBookingError,
            error: bookingError
        }
    ] = useBookingRoomMutation()

    const bookingBody: any = {
        hotelId: hotelId,
        roomId: roomsReserve[0]?._id,
        checkIn: checkIn,
        checkOut: checkOut,
        price: price,
        quantity: roomsReserve[0]?.quantity
    }

    const booking = async () => {
        if (!checkIn || !checkOut || !bookingBody.roomId || !price) {
            toast.error('Please enter your check in, check out dates and room')
        } else {
            await bookingRoom(bookingBody)
        }
    }

    if (isBookingSuccess) {
        router.push('/user/booking').then(() => toast.success('Booking Successfully')
        )
    }

    if (isBookingError) {
        toast.error(
            (bookingError as any)?.data?.message
                ? (bookingError as any).data.message
                : 'Some thing went error'
        )
    }

    if (isLoading) {
        return (
            <div className="w-screen flex justify-center">
                <Loader/>
            </div>
        )
    }
    return (
        <div>
            <div className="flex flex-wrap gap-x-2.5 p-2 mb-4">
                <label className="">
                    <span>Check In</span>
                    <input
                        type="date"
                        className="form-input block"
                        onChange={(event: any) => setCheckIn(event.target.value)}
                        required
                    />
                </label>
                <label className="">
                    <span>Check Out</span>
                    <input
                        type="date"
                        className="form-input block"
                        onChange={(event: any) => setCheckOut(event.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="w-full flex flex-wrap">
                <div className="w-full xl:w-4/5 lg:w-full">
                    <div className="hidden md:grid grid-cols-12 bg-blue-400 text-white">
                        <div
                            className="xl:col-span-5 lg:col-span-6 md:col-span-7 text-sm 2xl:text-base border border-l-0 border-blue-500 p-1.5 flex justify-center items-center text-center"
                        >
                            Room Type
                        </div>
                        <div
                            className="col-span-1 text-sm 2xl:text-base border border-l-0 border-blue-500 p-1.5 flex justify-center items-center text-center">
                            Sleeps
                        </div>
                        <div
                            className="xl:col-span-2 lg:col-span-1 text-sm 2xl:text-base border border-l-0 border-blue-500 p-1.5 flex justify-center items-center text-center">
                            Today&apos;s Price
                        </div>
                        <div
                            className="col-span-2 text-sm 2xl:text-base border border-l-0 border-blue-500 p-1.5 flex justify-center items-center text-center">
                            Your Choices
                        </div>
                        <div
                            className="xl:col-span-2 lg:col-span-2 md:col-span-1 text-sm 2xl:text-base border border-l-0 border-blue-500 p-1.5 flex justify-center items-center text-center">
                            Select amount
                        </div>
                    </div>
                    <div>
                        {rooms?.map((room) => (
                            <div key={room._id} className="grid mt-2.5 md:mt-0 md:grid-cols-12">
                                <div
                                    className="xl:col-span-5 lg:col-span-6 md:col-span-7 text-sm 2xl:text-base border md:border-l-0 border-blue-500 p-1.5 flex md:justify-center items-center">
                                    <div>
                                        <h2 className="w-full font-semibold underline text-base 2xl:text-xl text-secondary w-max cursor-pointer">
                                            {room.title}
                                        </h2>
                                        <p className="my-2 w-full">{room.desc}</p>
                                        <ul className="text-xs lg:text-sm flex flex-wrap gap-x-1.5">
                                            {services.map((service, index) => (
                                                <li key={index} className="mb-2">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    className="md:col-span-1 text-sm 2xl:text-base border md:border-l-0 border-blue-500 p-1.5 flex md:justify-center items-center">
                                    <div className="flex md:grid md:grid-cols-2 gap-y-1.5">
                                        {[...Array(room.maxPeople)].map((_, index) => (
                                            <div key={index} className="flex items-center justify-center">
                                                <FaUser/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="xl:col-span-2 lg:col-span-1 text-sm 2xl:text-base border md:border-l-0 border-blue-500 p-1.5 flex md:justify-center items-center">
                                    <div>
                                        <p className="font-semibold text-base 2xl:text-xl break-all">US${room.price}</p>
                                        <p className="text-primary">Includes taxes and fees</p>
                                    </div>
                                </div>
                                <div
                                    className="md:col-span-2 text-sm 2xl:text-base border md:border-l-0 border-blue-500 p-1.5 flex md:justify-center items-center">
                                    <div>
                                        <h2 className="font-semibold">50% required to cancel</h2>
                                        <p>
                                            <span className="font-semibold uppercase">
                                                NO PREPAYMENT NEEDED{' '}
                                            </span>
                                            – pay at the property
                                        </p>
                                        <p className="text-red-500">
                                            Only {room.quantity} rooms left on our site
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="xl:col-span-2 lg:col-span-2 md:col-span-1 text-sm 2xl:text-base border md:border-l-0 border-blue-500 p-1.5 flex md:justify-center items-center">
                                    <select
                                        className="w-full"
                                        defaultValue={0}
                                        onChange={(event) => {
                                            onChangeSelect(room, Number(event.target.value))
                                        }}
                                    >
                                        <option value={0}>0</option>
                                        {Array.from(Array(room.quantity)).map((_, index) => (
                                            <option key={index} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="w-full xl:w-1/5 border md:border-l-0 border-blue-500">
                    <div
                        className="bg-blue-400 text-sm 2xl:text-base border-b-2 border-blue-500 p-1.5 flex justify-center items-center"
                    >
                        &nbsp;
                        <span className="lg:hidden">
                            <br/>
                            &nbsp;
                        </span>
                    </div>

                    <div className="p-2.5">
                        <Reserve/>
                        <div onClick={() => booking()}>
                            <Button
                                text={"I'll reserve"}
                                textColor="text-white"
                                bgColor="bg-primary"
                                fullWidth={true}
                            />
                        </div>
                        <div className="text-primary text-sm xl:text-base mt-2.5">
                            <h2>Let&apos;s go to the next step</h2>
                            <ul className="list-inside list-disc">
                                <li>Confirmation is immediate</li>
                                <li>No booking or credit card fees!</li>
                            </ul>
                            <h2 className="text-green-500 font-medium text-xs lg:text-base border-2 border-green-500 mt-2.5 px-1.5 py-0.5">
                                No credit card needed!
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RoomHotel
