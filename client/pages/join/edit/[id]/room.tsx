import React, {useRef, useState} from 'react'
import {useRouter} from 'next/router'
import {
    useCreateRoomMutation,
    useDeleteRoomMutation,
    useGetHotelRoomsQuery,
    useUpdateRoomMutation
} from '../../../../services/roomApi'
import {Layout, Loader} from '../../../../components/layout'
import {IRoom} from '../../../../models'
import {BackButton, Button} from '../../../../components/core'
import {toast} from 'react-toastify'
import withAuthentication from '../../../../components/withAuthentication'

const Room = () => {
    const router = useRouter()
    const hotelId = router.query?.id as string
    const {data: rooms, isLoading} = useGetHotelRoomsQuery(hotelId)

    const cancelRef = useRef<HTMLDivElement>(null)
    const INITIAL_DATA: IRoom = {
        desc: '',
        maxPeople: 0,
        price: 0,
        quantity: 0,
        title: ''
    }
    const [data, setData] = useState<IRoom>(INITIAL_DATA)

    const [createRoom, {isLoading: isCreating}] = useCreateRoomMutation()

    const handleCreateRoom = async () => {
        try {
            await createRoom({...data, hotelId}).unwrap()
            setData(INITIAL_DATA)
            cancelRef.current?.click()
            toast.success('Create room success')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    if (isLoading) {
        return (
            <div className="w-screen mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }

    return (
        <Layout
            metadata={{
                title: `Edit room hotel - Booking`,
                description: `Join cooperation - Booking`
            }}
        >
            <div className="container mx-auto px-4 lg:px-6 pt-5">
                <BackButton/>
                <div className="flex flex-col">
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

                    {/* Create room */}
                    <div>
                        <details className="group select-none w-full">
                            <summary
                                className="group w-max flex flex-wrap items-center ml-auto px-2.5"
                            >
                                <div className="group-open:hidden">
                                    <Button text="Add more"/>
                                </div>
                                <div className="hidden group-open:block" ref={cancelRef}>
                                    <Button text="Cancel"/>
                                </div>
                            </summary>
                            <nav aria-label="Users Nav" className="transition-all">
                                <div
                                    className="grid grid-cols-9 gap-x-2.5 items-center justify-center text-center even:bg-gray-200 p-2.5">
                                    <div className="col-span-2 w-full">
                                        <input
                                            type="text"
                                            className="w-full"
                                            required
                                            value={data.title}
                                            onChange={e => setData(
                                                {...data, title: e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="col-span-2 w-full flex items-center">
                                        <textarea
                                            rows={1}
                                            value={data.desc}
                                            required
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
                                        <input type="number" className="w-full" value={data.quantity}
                                            onChange={e => setData(
                                                {...data, quantity: +e.target.value}
                                            )}
                                        />

                                    </div>
                                    <div className="col-span-2 flex justify-end" onClick={handleCreateRoom}>
                                        <Button text={isCreating ? 'Creating' : 'Save'}/>
                                    </div>
                                </div>

                            </nav>
                        </details>
                    </div>

                    {rooms?.length === 0 && <div className="mt-5 flex items-center justify-center text-center ">
                        There are no rooms available in hotel
                    </div>}
                </div>
            </div>
        </Layout>
    )
}

export default withAuthentication(Room)

const RoomDetail = (room: IRoom) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [dataEdit, setDataEdit] = useState(room)

    const [updateRoom, {isLoading: isUpdating}] = useUpdateRoomMutation()
    const [deleteRoom, {isLoading: isDeleting}] = useDeleteRoomMutation()
    const handleUpdateRoom = async () => {
        try {
            await updateRoom(dataEdit).unwrap()
            setIsEdit(false)
            toast.success('Update room success')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    const handleDeleteRoom = async () => {
        try {
            await deleteRoom(room._id as string).unwrap()
            toast.success('Delete room success')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    return (
        <div
            className="grid grid-cols-9 gap-x-2.5 items-center justify-center border-y text-center p-2.5">
            <div className="col-span-2 w-full">
                {isEdit
                    ? <input type="text" className="w-full" value={dataEdit.title}
                        onChange={e => setDataEdit(
                            {...dataEdit, title: e.target.value}
                        )}
                    />
                    : <span>{room.title}</span>
                }

            </div>
            <div className="col-span-2 w-full flex items-center">
                {isEdit
                    ? <textarea
                        rows={1}
                        value={dataEdit.desc}
                        onChange={(e) => setDataEdit(
                            {...dataEdit, desc: e.target.value}
                        )}
                    />
                    : <span>{room.desc}</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={dataEdit.price}
                        onChange={e => setDataEdit(
                            {...dataEdit, price: +e.target.value}
                        )}
                    />
                    : <span>{room.price}$</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={dataEdit.maxPeople}
                        onChange={e => setDataEdit(
                            {...dataEdit, maxPeople: +e.target.value}
                        )}
                    />
                    : <span>{room.maxPeople}</span>
                }
            </div>
            <div className="w-full">
                {isEdit
                    ? <input type="number" className="w-full" value={dataEdit.quantity}
                        onChange={e => setDataEdit(
                            {...dataEdit, quantity: +e.target.value}
                        )}
                    />
                    : <span>{room.quantity}</span>
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
                        <div onClick={handleUpdateRoom}>
                            <Button text={isUpdating ? 'Updating' : 'Update'}/>
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
                        <div onClick={handleDeleteRoom}>
                            <Button text={isDeleting ? 'Deleting' : 'Delete'} bgColor="bg-red-500"/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
