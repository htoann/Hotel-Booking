import Link from 'next/link'
import React from 'react'
import {
    HiUser,
    AiOutlineUser,
    RiSuitcaseLine,
    AiOutlineWallet,
    AiOutlineHeart,
    VscSignOut,
    BiBed,
    MdOutlineAirplaneTicket,
    GiEarthAsiaOceania,
    AiOutlineCar,
    MdOutlineAttractions,
    RiTaxiWifiLine
} from '../../utils/icons'
import {Button} from '../core'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import {logout} from '../../features/authSlice'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {setBookings, setHotelWishList} from '../../features/appSlice'

const Header = () => {
    const router = useRouter()
    const {user} = useAppSelector((state: any) => state.persistedReducer.auth)

    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        dispatch(logout())
        dispatch(setHotelWishList([]))
        dispatch(setBookings([]))
        toast.success('User logged out...')
        await router.push('/auth')
    }

    const accountMenu = [
        {
            icon: <AiOutlineUser/>,
            name: 'Manage account',
            link: '/user'
        },
        {
            icon: <RiSuitcaseLine/>,
            name: 'Bookings & Trips',
            link: '/user/booking'
        },
        {
            icon: <AiOutlineWallet/>,
            name: 'Reward & Wallet',
            link: '/'
        },
        {
            icon: <AiOutlineHeart/>,
            name: 'Saved',
            link: '/user/wishlist'
        }
    ]
    const menu = [
        {
            icon: <BiBed/>,
            name: 'Stays',
            link: '/'
        },
        {
            icon: <MdOutlineAirplaneTicket/>,
            name: 'Flights',
            link: '/'
        },
        {
            icon: <GiEarthAsiaOceania/>,
            name: 'Flight + Hotel',
            link: '/'
        },
        {
            icon: <AiOutlineCar/>,
            name: 'Car rentals',
            link: '/'
        },
        {
            icon: <MdOutlineAttractions/>,
            name: 'Attractions',
            link: '/'
        },
        {
            icon: <RiTaxiWifiLine/>,
            name: 'Airport taxis',
            link: '/'
        }
    ]

    return <header className="w-full bg-primary">
        <nav className="">
            <div className="flex flex-wrap justify-between items-center gap-2.5 mx-auto container px-4 lg:px-6 py-2.5 ">
                <Link href="/">
                    <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Booking</span>
                </Link>
                <div className=" flex flex-end items-center gap-2 sm:gap-4">
                    <Link href="/join">
                        <Button text="List your property" textColor="text-white" bgColor="bg-transparent"/>
                    </Link>
                    {user
                        ? <>
                            <div
                                className="group inline-block relative">
                                <button
                                    className=" w-full px-2 flex items-center text-white gap-1 ">
                                    <div
                                        className="w-8 h-8 border-2 border-orange-500 rounded-full
                                            flex items-center justify-center
                                            overflow-hidden">
                                        <HiUser size={30}/>
                                    </div>
                                    <span className="hidden md:block">Your account</span>
                                </button>
                                <ul className="w-max absolute z-50 right-0 hidden text-primary pt-2 group-hover:block">
                                    {accountMenu.map(item =>
                                        <li key={item.name}
                                            className="bg-white hover:bg-gray-300 block whitespace-no-wrap">
                                            <Link href={`${item.link}`}
                                                className="flex items-center py-2 px-4 gap-x-2.5 ">
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    )}
                                    <li
                                        className="bg-white hover:bg-gray-300 block whitespace-no-wrap">
                                        <div onClick={() => handleLogout()}
                                            className="flex items-center py-2 px-4 gap-x-2.5 cursor-pointer">
                                            <VscSignOut/>
                                            <span>Sign out</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                        : <>
                            <Link href="/auth">
                                <Button text="Sign In" textColor="text-primary" bgColor="bg-white"/>
                            </Link>
                        </>}
                </div>
            </div>
        </nav>
        <nav className="hidden sm:block px-2 lg:px-4 py-2.5">
            <ul className="mx-auto container flex flex-wrap justify-center items-center gap-x-2 text-white">
                {menu.map(item =>
                    <li key={item.name}
                        className="rounded-3xl hover:bg-white hover:bg-opacity-25 whitespace-no-wrap">
                        <Link href={`${item.link}`} className="flex items-center gap-x-2.5 py-2 px-4 ">
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    </header>
}

export default Header
