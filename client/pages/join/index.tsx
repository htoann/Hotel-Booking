import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Button} from '../../components/core'
import {IoMdAdd} from '../../utils/icons'
import {useGetMyHotelsQuery} from '../../services/userApi'
import {Loader} from '../../components/layout'
import ErrorPage from 'next/error'

const JoinPage = () => {
    const {data: hotels, isLoading, error} = useGetMyHotelsQuery()
    console.log(hotels)
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
                <div className="">
                    <Link href="/join/create">
                        <Button text={'New'} bgColor="bg-primary" textColor="text-white" IcAfter={IoMdAdd}/>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {hotels?.map((hotel) => (
                        <div key={hotel._id}>

                            <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                                <img
                                    alt="Office"
                                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                    className="h-56 w-full object-cover"
                                />

                                <div className="bg-white p-4 sm:p-6">
                                    <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                                        {hotel.updatedAt}
                                    </time>

                                    <a href="#">
                                        <h3 className="mt-0.5 text-lg text-gray-900">
                                            How to position your furniture for positivity
                                        </h3>
                                    </a>

                                    <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                                        Molestias explicabo corporis voluptatem?
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default JoinPage
