import Head from 'next/head'
import {Offers, Search} from '../components/homepage'
import {HotelType} from '../components/hotel'

export default function Home () {
    return (
        <>
            <Head>
                <title>Booking</title>
            </Head>
            <div className="flex flex-col mx-auto ">
                <Search/>
                <div className="mx-auto container px-4 lg:px-6 overflow-hidden">
                    <Offers/>
                    <HotelType/>
                </div>
            </div>
        </>
    )
}
