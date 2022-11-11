import Link from "next/link";
import React from "react";
import { IHotel } from "../../models";
import Button from "./Button";
import StarRating from "./StarRating";

interface Props {
  data?: IHotel[];
  city?: string;
}

const SearchResults: React.FC<Props> = ({ data, city }) => {
  return (
    <div>
      {city && (
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {city}: {data?.length} properties found
        </h2>
      )}
      {data?.map((hotel) => (
        <Link href={`/hotel/${hotel._id}`} key={hotel._id}>
          <div className="flex border p-5 mb-5">
            <img
              className="object-cover"
              width={200}
              height={200}
              src={hotel.photos[0]}
              alt=""
            />
            <div className="mx-4">
              <div className="flex">
                <p className="text-xl font-bold mb-2 text-secondary">
                  {hotel.title}
                </p>
                <StarRating data={hotel.rating} />
              </div>
              <span className="text-sm underline text-secondary cursor-pointer capitalize">
                {hotel.city}
              </span>
              <span className="text-sm underline text-secondary ml-2 cursor-pointer">
                Show on map
              </span>
              <p className="text-sm mt-2">{hotel.descShort}</p>
            </div>
            <div className="ml-auto font-semibold flex flex-col">
              <button
                type="button"
                className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg float-right mb-4 w-10 h-10"
              >
                {hotel.score}
              </button>
              <Button
                text="Show prices"
                textColor="text-white"
                bgColor="bg-lightPrimary"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
