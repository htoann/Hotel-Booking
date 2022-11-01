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

const Header = () => {
    const router = useRouter()
    const {user} = useAppSelector((state: any) => state.persistedReducer.auth)

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
        toast.success('User logged out...')
        router.push('/auth')
    }

    const accountMenu = [
        {
            icon: <AiOutlineUser/>,
            name: 'Manage account',
            link: '/'
        },
        {
            icon: <RiSuitcaseLine/>,
            name: 'Bookings & Trips',
            link: '/'
        },
        {
            icon: <AiOutlineWallet/>,
            name: 'Reward & Wallet',
            link: '/'
        },
        {
            icon: <AiOutlineHeart/>,
            name: 'Saved',
            link: '/'
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
        <nav className=" px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link href="/">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Booking</span>
                </Link>
                <div className="flex flex-end items-center gap-4">
                    <Link href="/">
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
                                    <span>Your account</span>
                                </button>
                                <ul className="w-max absolute z-50 right-0 hidden text-primary pt-1 group-hover:block">
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
                                <Button text="Register" textColor="text-primary" bgColor="bg-white"/>
                            </Link>
                            <Link href="/auth#sign-in">
                                <Button text="Sign In" textColor="text-primary" bgColor="bg-white"/>
                            </Link>
                        </>}
                </div>
            </div>
        </nav>
        <nav className=" px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <ul className="w-full flex justify-center items-center gap-x-2 text-white">
                    {menu.map(item =>
                        <li key={item.name}
                            className="rounded-3xl hover:bg-white hover:bg-opacity-25 whitespace-no-wrap">
                            <Link href={`${item.link}`} className="flex items-center gap-x-2.5 py-2 px-4">
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    </header>
}

export default Header