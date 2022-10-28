import React, {useEffect, useState} from 'react';
import Card from "./Card";


import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";

interface Props {
    type: any;
}

const Locations = ({type}: Props) => {
    const locations = [
        {
            name: "Lang Co",
            type: "1",
        },
        {
            name: "Quang Ngai",
            type: "1",
        },
        {
            name: "Dong Hoi",
            type: "1",
        },
        {
            name: "Quy Nhon",
            type: "1",
        },
        {
            name: "Cam Ranh",
            type: "1",
        },
        {
            name: "Nha Trang",
            type: "1",
        },
        {
            name: "Sam Son",
            type: "1",
        },
        {
            name: "Pleiku",
            type: "2",
        },
        {
            name: "Phong Nha",
            type: "2",
        },
        {
            name: "Vinh",
            type: "2",
        },
        {
            name: "Da Lat",
            type: "2",
        },

    ]
    const [locationsType, setLocationsType] = useState<{ name: string, type: string }[] | undefined>([]);

    useEffect(() => {
        const getLocationsByType = () => {
            if (type._id !== "all") {
                const locationsByType = locations.filter(
                    (el) => el.type === type._id
                );
                setLocationsType(locationsByType);
            } else {
                setLocationsType(locations);
            }
        };
        getLocationsByType();
    }, [type]);

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={6}
            loop={true}
            navigation={true} modules={[Navigation]}
            className="select-none"
        >
            {locationsType?.map((location, index) =>
                <SwiperSlide key={index}>
                    <Card image={"/assets/images/offer/1.avif"} name={location.name}
                          description={location.name}/>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default Locations;