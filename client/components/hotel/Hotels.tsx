import React, {useEffect, useState} from 'react'
import HotelPreview from './HotelPreview'

import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from 'swiper'
import {useAppSelector} from '../../store/hooks'
import {IHotel} from '../../models'

interface Props {
    type: string;
}

const Hotels = ({type}: Props) => {
    const {hotels} = useAppSelector((state) => state.persistedReducer.hotel)
    const [hotelsType, setHotelsType] = useState<IHotel[] | null>([])

    useEffect(() => {
        const getHotelsByType = () => {
            if (type !== 'all') {
                const hotelsByType = hotels?.filter((el) => el.type === type) || null
                setHotelsType(hotelsByType)
            } else {
                setHotelsType(hotels)
            }
        }
        getHotelsByType()
    }, [hotels, type])

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={5}
            // loop={true}
            navigation={true}
            modules={[Navigation]}
            className="select-none"
        >
            {hotelsType?.map((hotel) => (
                <SwiperSlide key={hotel._id}>
                    <HotelPreview
                        id={hotel._id}
                        image={hotel.photos[0]}
                        name={hotel.name}
                        title={hotel.title}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Hotels
