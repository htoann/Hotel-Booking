import React from "react";
import Button from "../core/Button";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Autoplay} from "swiper";
import getFlagEmoji from "../../utils/getFLagEMoji";
import Link from "next/link";


const Offers = () => {
    const offers = [
        {
            title: "Save 15% with Late Escape Deals",
            description: "Check one more destination off your wishlist",
            button: "Explore deals",
            image: "1.avif"
        },
        {
            title: "Escape for a while",
            description: "Enjoy the freedom of a monthly stay on Booking",
            button: "Discover monthly stays",
            image: "2.avif"
        },
        {
            title: "Easy trip planner",
            description: "Pick a vibe and explore the top destinations",
            button: "Discover",
            image: "3.avif"
        },
    ]

    const locations = [
        {
            name: "Sapa",
            countryCode: "VN",
            image: "1"
        },
        {
            name: "Da Nang",
            countryCode: "VN",
            image: "1"
        },
        {
            name: "Hue",
            countryCode: "VN",
            image: "1"
        },
        {
            name: "Bangkok",
            countryCode: "TH",
            image: "1"
        },
        {
            name: "Sapa",
            countryCode: "VN",
            image: "1"
        },
        {
            name: "Da Nang",
            countryCode: "VN",
            image: "1"
        },
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
                                       loading={"lazy"}
                                />
                                <div className="px-5 py-10 text-white">
                                    <h2 className="font-bold mb-2 text-3xl">{offer.title}</h2>
                                    <h2 className="mb-5">{offer.description}</h2>
                                    <Button text={offer.button} textColor={"text-white"}
                                            bgColor={"bg-lightPrimary"}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}


                </Swiper>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {/*Fix key index*/}
                {locations.map((location, index) =>
                    <Link href="#" key={index}>
                        <div
                            className="relative block overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat"
                        >
                            <div className="relative bg-black bg-opacity-40 p-8 pt-40 text-white">
                                <h3 className="text-2xl font-bold">{location.name}</h3>
                                <p className="text-xl">{getFlagEmoji(location.countryCode)}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    );
};

export default Offers;