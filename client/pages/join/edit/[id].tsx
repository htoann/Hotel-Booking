import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useDeleteHotelMutation} from '../../../services/userApi'
import {FiTrash} from '../../../utils/icons'
import {Button} from '../../../components/core'
import {toast} from 'react-toastify'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'
import {IHotel} from '../../../models'
import {deleteFromMyHotels} from '../../../features/hotelSlice'

const EditPage = () => {
    const router = useRouter()
    const id = router.query?.id as string

    const dispatch = useAppDispatch()
    const {myHotels} = useAppSelector((state) => state.persistedReducer.hotel)

    const [data, setData] = useState<IHotel>()

    useEffect(() => {
        const result = myHotels.find((hotel) => hotel._id === id)
        setData(result)
    }, [id, myHotels])

    const [deleteHotel, {isLoading: isDeleting}] = useDeleteHotelMutation()

    const handleDelete = async () => {
        try {
            await deleteHotel(id)
            dispatch(deleteFromMyHotels(id))
            await router.push('/join')
            toast.success('Delete success')
        } catch (e) {
            toast.error('Something went wrong when delete')
        }
    }

    if (data) {
        return (
            <div className="my-4 mx-auto container px-4 lg:px-6 overflow-hidden flex flex-col">
                <div className="mt-5 p-5 flex flex-col gap-y-5 w-full md:w-1/2 mx-auto border rounded-lg">
                    <div className="flex flex-col">
                        <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
                            Name
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            className="rounded"
                            type="text"
                            required
                            value={data.name}
                            // onChange={e => updateFields({name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
                            Title
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            className="rounded"
                            type="text"
                            required
                            value={data.title}
                            // onChange={e => updateFields({title: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor=""
                            className="block uppercase text-xs font-bold mb-2">
                            Description
                            <span className="text-red-500"> *</span>
                        </label>
                        <textarea
                            className="rounded"
                            rows={4}
                            required
                            value={data.desc}
                            // onChange={e => updateFields({desc: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
                            Description short
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            className="rounded"
                            type="text"
                            required
                            value={data.descShort}
                            // onChange={e => updateFields({descShort: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
                            City
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            className="rounded"
                            type="text"
                            required
                            value={data.city}
                            // onChange={e => updateFields({city: e.target.value})}
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <span>Published</span>
                        <div className="relative h-8 w-14 cursor-pointer"
                            // onClick={() => setCheck(!check)}
                        >
                            <input type="radio" className="peer sr-only" checked={data.published}/>
                            <span
                                className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
                            >
                            </span>
                            <span
                                className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6"
                            >
                            </span>
                        </div>
                    </div>

                </div>

                <div>
                    <button type="button" disabled={isDeleting} onClick={handleDelete}>
                        <Button
                            text="Delete"
                            textColor="text-white"
                            bgColor={isDeleting ? 'bg-gray-500' : 'bg-red-500'}
                            IcAfter={FiTrash}
                        />
                    </button>
                </div>
            </div>
        )
    }
}

export default EditPage
