import React from 'react'
import {Layout} from '../../components/layout'
import {HotelPreview} from '../../components/hotel'
import {useAppSelector} from '../../store/hooks'

const WishListPage = () => {
    const {hotels} = useAppSelector((state) => state.persistedReducer.hotel)
    const {wishList} = useAppSelector((state) => state.persistedReducer.app)

    const wishListHotels = hotels?.filter((hotel) => wishList.includes(hotel._id!))

    return (
        <Layout
            metadata={{
                title: `Your wishlist - Booking`,
                description: `Booking`
            }}
        >
            <div
                className={
                    wishListHotels && wishListHotels.length > 0
                        ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 md:mt-20 mx-auto container px-4 lg:px-6`
                        : `w-screen mt-20 flex items-center justify-center`
                }
            >
                {wishListHotels && wishListHotels.length > 0 ? (
                    wishListHotels?.map((hotel) => (
                        <div key={hotel._id} className="w-full border rounded-xl">
                            <HotelPreview
                                id={hotel._id!}
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
        </Layout>

    )
}

export default WishListPage
