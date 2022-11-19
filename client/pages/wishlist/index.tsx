import Head from 'next/head'
import React from 'react'
import HotelPreview from '../../components/hotel/HotelPreview'
import {useAppSelector} from '../../store/hooks'

const Index = () => {
    const {wishList} = useAppSelector((state) => state.persistedReducer.app)
    const {user} = useAppSelector((state) => state.persistedReducer.auth)

    return (
        <>
            <Head>
                <title>Wishlist</title>
            </Head>
            <div
                className={
                    wishList.length > 0
                        ? `grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-3 justify-center mx-auto max-w-screen-xl overflow-hidden`
                        : `w-screen mt-20 flex items-center justify-center`
                }
            >
                {wishList.length > 0 ? (
                    wishList.map((hotel) => (
                        <div key={hotel._id}>
                            <HotelPreview
                                id={hotel._id}
                                image={hotel.photos[0]}
                                name={hotel.name}
                                title={hotel.title}
                                large={true}
                            />
                        </div>
                    ))
                ) : (
                    <h1 className="font-bold text-3xl">No hotels saved</h1>
                )}
            </div>
        </>

    )
}

export default Index
