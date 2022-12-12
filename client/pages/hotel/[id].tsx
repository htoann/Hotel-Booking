import React, {Fragment, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useGetHotelQuery} from '../../services/hotelApi'
import ErrorPage from 'next/error'
import {
    MdLocationOn,
    AiFillHeart,
    FaParking,
    AiOutlineWifi,
    MdFamilyRestroom,
    MdAirportShuttle,
    MdSmokeFree,
    Ri24HoursFill,
    AiOutlineHeart,
    BsFillShareFill
} from '../../utils/icons'
import {Dialog, Transition} from '@headlessui/react'
import {Button, SearchVertical} from '../../components/core'
import {toast} from 'react-toastify'
import {MapContainer} from '../../components/map'
import {HotelReview, ImageGallery} from '../../components/hotel'
import {Layout, Loader} from '../../components/layout'
import {RoomHotel} from '../../components/room'
import StarRating from '../../components/core/StarRating'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {
    addHotelToWishList,
    removeHotelFromWishList
} from '../../features/appSlice'
import {
    useAddWishListMutation,
    useDeleteWishListMutation
} from '../../services/userApi'

const HotelDetailPage = () => {
    const router = useRouter()
    const id = router.query?.id as string

    const dispatch = useAppDispatch()
    const {wishList} = useAppSelector((state) => state.persistedReducer.app)
    const {user} = useAppSelector((state) => state.persistedReducer.auth)

    const [isInWishList, setIsInWishList] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setIsInWishList(wishList.includes(id))
    }, [wishList, id])

    let [showMap, setShowMap] = useState(false)

    const {data: hotel, isLoading, error} = useGetHotelQuery(id)

    const [addWishList] = useAddWishListMutation()
    const [deleteWishList] = useDeleteWishListMutation()

    const handleShare = async () => {
        const asPath = router.asPath
        const origin =
            typeof window !== 'undefined' && window.location.origin
                ? window.location.origin
                : ''

        const URL = `${origin}${asPath}`
        await navigator.clipboard.writeText(URL)
        toast.success('Copied to clipboard')
    }
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

    if (hotel) {
        const wishListHandle = () => {
            if (!isInWishList) {
                setIsInWishList(true)
                if (user) {
                    addWishList({id})
                }
                dispatch(addHotelToWishList(id))
                toast.success('Saved to wishlist')
            } else {
                setIsInWishList(false)
                if (user) {
                    deleteWishList({id})
                }
                dispatch(removeHotelFromWishList(id))
                toast.success('Deleted from wishlist')
            }
        }
        return (
            <Layout
                metadata={{
                    title: `${hotel.name} - Booking`,
                    description: `${hotel.desc}`
                }}
            >
                <div
                    className="my-4 mx-auto container px-4 lg:px-6 overflow-hidden"
                    onClick={() => {
                        if (showModal) {
                            setShowModal(false)
                        }
                    }}
                >
                    <div className="flex pt-2 gap-x-5">
                        <div className="hidden lg:block w-1/5">
                            <SearchVertical/>
                        </div>
                        <div className="w-full lg:w-4/5">
                            <div>
                                <div className="flex justify-between flex-wrap">
                                    <div className="flex gap-x-2">
                                        <p className="first-letter:uppercase text-sm text-white bg-gray-500 w-max h-max px-1.5 py-0.5 rounded">
                                            {hotel.type}
                                        </p>
                                        <StarRating data={hotel.rating}/>

                                        <div
                                            className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg float-right lg:mb-4">
                                            {hotel.score ? hotel.score : 'No score'}
                                        </div>
                                    </div>
                                    <div className="text-secondary flex items-center gap-x-2.5">
                                        <div
                                            onClick={wishListHandle}
                                            className="text-2xl cursor-pointer"
                                        >
                                            {!isInWishList ? (
                                                <AiOutlineHeart/>
                                            ) : (
                                                <AiFillHeart className="text-red-500"/>
                                            )}
                                        </div>
                                        <div className="text-xl cursor-pointer" onClick={handleShare}>
                                            <BsFillShareFill/>
                                        </div>
                                        <div>
                                            <Button
                                                text="Reserve"
                                                textColor="text-white"
                                                bgColor="bg-primary"
                                            />
                                        </div>
                                        <div onClick={() => setShowModal(true)}>
                                            <Button
                                                text={`Guest reviews (${hotel?.reviews?.length})`}
                                                textColor="text-white"
                                                bgColor="bg-primary"
                                            />
                                        </div>
                                        {showModal ? (
                                            <HotelReview
                                                reviews={hotel?.reviews}
                                                id={id}
                                                setShowModal={setShowModal}
                                            />
                                        ) : null}
                                    </div>
                                </div>

                                <h1 className="my-2 text-xl font-bold">{hotel.title}</h1>
                            </div>
                            <div>
                                <div className="text-secondary flex flex-wrap gap-x-2.5 items-center mb-4">
                                    <MdLocationOn/>
                                    <h2 className="text-primary">{hotel.address.name}</h2>
                                    <p
                                        className="text-secondary cursor-pointer"
                                        onClick={() => setShowMap(true)}
                                    >
                                        Great location - Show Map
                                    </p>
                                </div>
                            </div>
                            <div>
                                <ImageGallery photos={hotel.photos}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/5 py-5">
                            <p>{hotel.desc}</p>
                            <p>
                                Couples in particular like the location – they rated it
                                <span className="font-bold">{` ${hotel.score} `}</span>
                                for a two-person trip.
                            </p>
                            <div className="mt-2">
                                <h2 className="font-bold text-lg">Most popular facilities</h2>
                                <ul className="flex flex-wrap gap-x-2.5 mt-4">
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <AiOutlineWifi/>
                                        <p className="text-primary text-base">Free WiFi</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <FaParking/>
                                        <p className="text-primary text-base">Free parking</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdFamilyRestroom/>
                                        <p className="text-primary text-base">Family rooms</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdAirportShuttle/>
                                        <p className="text-primary text-base">Airport shuttle</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <MdSmokeFree/>
                                        <p className="text-primary text-base">Non-smoking rooms</p>
                                    </li>
                                    <li className="flex gap-x-1.5 items-center text-green-500 text-xl">
                                        <Ri24HoursFill/>
                                        <p className="text-primary text-base">24-hour front desk</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/5">
                            <div className="text-black flex flex-col gap-y-2.5 p-2">
                                <h1 className="font-bold">Property Highlights</h1>
                                <div className="flex items-center text-2xl">
                                    <AiFillHeart className="w-1/6"/>
                                    <h2 className="text-sm w-5/6">{hotel.descShort}</h2>
                                </div>
                                <div className="flex items-center text-2xl">
                                    <FaParking className="w-1/6"/>
                                    <h2 className="text-sm w-5/6">
                                        {' '}
                                        Free private parking available at the hotel
                                    </h2>
                                </div>
                                <Button
                                    text="Reserve"
                                    textColor="text-white"
                                    bgColor="bg-primary"
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 border-t border-current">
                        <div className="my-2.5 w-full">
                            <h1 className="font-bold text-2xl mb-4">Availability</h1>
                            <RoomHotel hotelId={hotel._id || id}/>
                        </div>
                    </div>
                </div>
                <Transition appear show={showMap} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setShowMap(false)}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-max transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                        <div>
                                            <MapContainer hotel={hotel}/>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Layout>
        )
    }
    return <div>Some thing is wrong</div>
}

export default HotelDetailPage
