import React, {useState, useEffect} from 'react'

import SlideItem from './SlideItem'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Controller, Lazy, Navigation, Pagination} from 'swiper'

const images = [
    {
        src: 'https://picsum.photos/320/240?v1'
    },
    {
        src: 'https://picsum.photos/320/240?v2'
    },
    {
        src: 'https://picsum.photos/320/240?v3'
    },
    {
        src: 'https://picsum.photos/320/240?v4'
    }
]

const ImageGallery = () => {
    const [swiper, updateSwiper] = useState<any>(null)

    const [swiperThumbs, updateSwiperThumbs] = useState<any>(null)

    // Bind swiper and swiper thumbs
    useEffect(() => {
        if (swiper && swiperThumbs) {
            swiper.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiper
        }
    }, [swiper, swiperThumbs])

    return (
        <div>
            <Swiper>
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ImageGallery
