import React, {useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Button} from '../../components/core'
import {CiEdit, IoMdAdd} from '../../utils/icons'
import {useGetMyHotelsQuery} from '../../services/userApi'
import {Loader} from '../../components/layout'
import ErrorPage from 'next/error'
import moment from 'moment'
import Image from 'next/image'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {setMyHotels} from '../../features/hotelSlice'

const JoinPage = () => {
    const {data = [], isLoading, isSuccess, error} = useGetMyHotelsQuery()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setMyHotels(data))
        }
    }, [data, dispatch, isSuccess])

    const {myHotels} = useAppSelector((state) => state.persistedReducer.hotel)

    if (isLoading) {
        return (
            <div className="w-screen mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }
    if (error) {
        // @ts-ignore
        const status = error.status || 404
        return <ErrorPage statusCode={status}/>
    }
    return (
        <>
            <Head>
                <title>Join Hotel</title>
            </Head>
            <div className="my-4 mx-auto container px-4 lg:px-6 overflow-hidden flex flex-col">
                <div className="w-max">
                    <Link href="/join/create">
                        <Button text={'New'} bgColor="bg-lightPrimary" textColor="text-white" IcAfter={IoMdAdd}/>
                    </Link>
                </div>
                {myHotels.length > 0
                    ? <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                        {myHotels.map((hotel) => (
                            <div key={hotel._id}
                                className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                                <Image
                                    src={hotel.photos[0] || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
                                    alt={hotel.name}
                                    width={1000}
                                    height={200}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="bg-white p-4 sm:p-6">
                                    <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                                        {moment(hotel.updatedAt).fromNow()}
                                    </time>
                                    <a href="#">
                                        <h3 className="mt-0.5 text-lg text-gray-900">
                                            {hotel.name}
                                        </h3>
                                    </a>

                                    <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                                        {hotel.desc}
                                    </p>
                                </div>
                                <div className="absolute w-full z-10 top-0 ">
                                    <div className="flex justify-between">
                                        <div
                                            className={`m-5 w-5 h-5 rounded-full border border-white relative ${hotel.published ? 'bg-green-500' : 'bg-gray-500'}`}>
                                        </div>
                                        <Link href={`/join/edit/${hotel._id}`}>
                                            <div className="p-2.5 bg-white cursor-pointer">
                                                <CiEdit/>
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>
                    : <div className="w-full flex justify-center">You are not create any hotel</div>}
            </div>
        </>
    )
}

export default JoinPage
