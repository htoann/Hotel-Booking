import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetHotelQuery } from "../../services/hotelApi";
import { Loader } from "../layout";

interface Props {
  id: string;
  image?: string;
  name?: string;
  title?: string;
  large?: boolean;
}

const HotelPreview = ({ id, image, name, title, large }: Props) => {
  const { data: hotel, isLoading, isSuccess } = useGetHotelQuery(id);

  if (isLoading)
    return (
      <div className="w-screen mt-20 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      {isSuccess && (
        <Link href={`hotel/${id}`}>
          <div className="w-full h-full flex flex-col gap-y-2 transition-all hover:scale-105 p-2">
            <Image
              className={
                !large
                  ? `w-full h-32 object-cover`
                  : `max-w-xs h-64 object-cover`
              }
              src={image || hotel.photos[0]}
              alt={name || hotel.name}
              width={1000}
              height={1000}
            />
            <h2 className="text-black font-bold">{title || hotel.title}</h2>
            <h3 className="text-primary">{name || hotel.name}</h3>
          </div>
        </Link>
      )}
    </>
  );
};

export default HotelPreview;
