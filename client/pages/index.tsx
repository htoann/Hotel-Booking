import {Offers, Search} from '../components/homepage'
import {HotelType} from '../components/hotel'
import {Layout} from '../components/layout'

export default function Home () {
    return (
        <Layout
            metadata={{
                title: `Booking`,
                description: `Booking`
            }}
        >
            <div className="flex flex-col mx-auto ">
                <Search/>
                <div className="mx-auto container px-4 lg:px-6 overflow-hidden">
                    <Offers/>
                    <HotelType/>
                </div>
            </div>
        </Layout>
    )
}
