import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useGetHotelRoomsQuery} from '../../../../services/roomApi'
import {Loader} from '../../../../components/layout'
import {IRoom} from '../../../../models'
import {Button} from '../../../../components/core'

const Room = () => {
    const router = useRouter()
    const hotelId = router.query?.id as string
    const {data: rooms, isLoading} = useGetHotelRoomsQuery(hotelId)

    const [data, setData] = useState<IRoom>({
        desc: '',
        maxPeople: 0,
        price: 0,
        roomNumbers: [],
        title: ''
    })
    if (isLoading) {
        return (
            <div className="w-screen mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 lg:px-6">
            {rooms?.length === 0
                ? <div className=" flex items-center justify-center text-center ">
                    There are no rooms available in hotel
                </div>
                : <div className="flex flex-col">
                    <div className="grid grid-cols-9 items-center justify-center text-center">
                        <div className="col-span-2">Name</div>
                        <div className="col-span-2">Description</div>
                        <div>Price</div>
                        <div>Max people</div>
                        <div>Quantity</div>
                        <div className="col-span-2">Manipulation</div>
                    </div>
                    {rooms?.map((room) => (
                        <RoomDetail key={room._id} {...room}/>
                    ))
                    }

                    <div>
                        <details className="group select-none w-full">
                            <summary
                                className="group w-max flex flex-wrap items-center ml-auto px-2.5"
                            >
                                <div className="group-open:hidden">
                                    <Button text="Add more"/>
                                </div>
                                <div className="hidden group-open:block">
                                    <Button text="Cancel"/>
                                </div>
                            </summary>
                            <nav aria-label="Users Nav" className="transition-all">
                                <div
                                    className="grid grid-cols-9 gap-x-2.5 items-center justify-center text-center even:bg-gray-200 p-2.5">
                                    <div className="col-span-2 w-full">
                                        <input type="text" className="w-full" value={data.title}
                                            onChange={e => setData(
                                                {...data, title: e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="col-span-2 w-full flex items-center">
                                        <textarea
                                            rows={1}
                                            value={data.desc}
                                            onChange={(e) => setData(
                                                {...data, desc: e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="w-full">
                                        <input type="number" className="w-full" value={data.price}
                                            onChange={e => setData(
                                                {...data, price: +e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="w-full">
                                        <input type="number" className="w-full" value={data.maxPeople}
                                            onChange={e => setData(
                                                {...data, maxPeople: +e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="w-full">
                                        <input type="number" className="w-full" value={data.roomNumbers.length}
                                            // onChange={e => setData(
                                            //     {...data, roomNumbers: +e.target.value}
                                            // )}
                                        />

                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <Button text="Save"/>
                                    </div>
                                </div>

                            </nav>
                        </details>
                    </div>
                </div>
            }
        </div>
    )
}

export default Room

const RoomDetail = (room: IRoom) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState(room)
    return (
        <div
            className="grid grid-cols-9 gap-x-2.5 items-center justify-center border-y text-center p-2.5">
            <div className="col-span-2 w-full">
                {isEdit
                    ? <input type="text" className="w-full" value={data.title}
                        onChange={e => setData(
                            {...data, title: e.target.value}
                        )}
                    />
                    : <span>{room.title}</span>
                }

            </div>
            <div className="col-span-2 w-full flex items-center">
                {isEdit
                    ? <textarea
                        rows={1}
                        value={data.desc}
                        onChange={(e) => setData(
                            {...data, desc: e.target.value}
                        )}
                    />
                    : <span>{room.desc}</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={data.price}
                        onChange={e => setData(
                            {...data, price: +e.target.value}
                        )}
                    />
                    : <span>{room.price}$</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={data.maxPeople}
                        onChange={e => setData(
                            {...data, maxPeople: +e.target.value}
                        )}
                    />
                    : <span>{room.maxPeople}</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={data.roomNumbers.length}
                        // onChange={e => setData(
                        //     {...data, roomNumbers: +e.target.value}
                        // )}
                    />
                    : <span>{room.roomNumbers.length}</span>
                }
            </div>
            <div className="col-span-2 flex gap-x-2.5 items-center justify-center">
                {isEdit
                    ? <>
                        <div
                            onClick={() => {
                                setIsEdit(false)
                            }}
                        >
                            <Button text="Cancel" bgColor="bg-yellow-500"/>
                        </div>
                        <div>
                            <Button text="Update"/>
                        </div>
                    </>
                    : <>
                        <div
                            onClick={() => {
                                setIsEdit(true)
                            }}
                        >
                            <Button text="Edit" bgColor="bg-green-500"/>
                        </div>
                        <div>
                            <Button text="Delete" bgColor="bg-red-500"/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
