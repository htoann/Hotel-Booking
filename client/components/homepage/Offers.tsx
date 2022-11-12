import React from 'react'
import Button from '../core/Button'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Autoplay} from 'swiper'
import getFlagEmoji from '../../utils/getFLagEMoji'
import Link from 'next/link'

const Offers = () => {
    const offers = [
        {
            title: 'Save 15% with Late Escape Deals',
            description: 'Check one more destination off your wishlist',
            button: 'Explore deals',
            image: '1.avif'
        },
        {
            title: 'Escape for a while',
            description: 'Enjoy the freedom of a monthly stay on Booking',
            button: 'Discover monthly stays',
            image: '2.avif'
        },
        {
            title: 'Easy trip planner',
            description: 'Pick a vibe and explore the top destinations',
            button: 'Discover',
            image: '3.avif'
        }
    ]

    const locations = [
        {
            name: 'Sapa',
            city: 'sapa',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1584003654022-074f97adc1d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        },
        {
            name: 'Da Nang',
            city: 'danang',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1620976128192-7181e9f91342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        },
        {
            name: 'Nha Trang',
            city: 'nhatrang',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1642864319140-f2f3c418c707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80'
        },
        {
            name: 'Da Lat',
            city: 'dalat',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1620814153812-38115a7f0fbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        },
        {
            name: 'Hue',
            city: 'hue',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1568775791746-bcc117bcb312?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
        },
        {
            name: 'Phu Quoc',
            city: 'phuquoc',
            countryCode: 'VN',
            image: 'https://images.unsplash.com/photo-1587730675685-f71bccb607d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        }
    ]
    return (
        <div className="my-20 mx-auto max-w-screen-xl relative">
            <div className="mb-5">
                <h1 className="font-bold text-2xl text-black">Offers</h1>
                <h2 className="text-primary font-light text-xl">Promotions, deals, and special offers for you</h2>
            </div>

            <div className="select-none mb-5">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1.5}
                    loop={true}
                    autoplay={true}
                    modules={[Autoplay]}
                >
                    {offers.map(offer =>
                        <SwiperSlide key={offer.title}>
                            <div className="relative w-full rounded-2xl overflow-hidden">
                                <Image className="absolute -z-10" src={`/assets/images/offer/${offer.image}`}
                                    alt={offer.title}
                                    width={1000}
                                    height={200}
                                    loading={'lazy'}
                                />
                                <div className="px-5 py-10 text-white">
                                    <h2 className="font-bold mb-2 text-3xl">{offer.title}</h2>
                                    <h2 className="mb-5">{offer.description}</h2>
                                    <Button text={offer.button} textColor={'text-white'}
                                        bgColor={'bg-lightPrimary'}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}

                </Swiper>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {/* Fix key index */}
                {locations.map((location, index) =>
                    <Link href={`/search/${location.city}`} key={index}>
                        <div
                            className={`relative block overflow-hidden rounded-xl `}
                        >
                            <Image className="absolute w-full h-full object-cover" src={location.image}
                                alt={location.name}
                                width={200}
                                height={100}/>
                            <div className="relative p-8 pt-40 text-white hover:bg-black hover:bg-opacity-40">
                                <h3 className="text-2xl font-bold">{location.name}</h3>
                                <p className="text-xl">{getFlagEmoji(location.countryCode)}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    )
}

export default Offers
