import React, { useState, useEffect } from "react";
import { IHotel } from "../../models";
import { useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  hotels?: IHotel[];
  setHotelsType: any;
}

const FilterHotels: React.FC<Props> = ({ hotels, setHotelsType }) => {
  // const { register, handleSubmit } = useForm();
  const { hotels: hotelsRedux } = useAppSelector(
    (state) => state.persistedReducer.hotel
  );
  const types = hotelsRedux
    ?.map((hotel) => hotel.type)
    .filter((value, index, self) => self.indexOf(value) === index);

  const [type, setType] = useState("all");
  const [rating, setRating] = useState("all");

  useEffect(() => {
    const getHotelsFilter = () => {
      if (type !== "all" || rating !== "all") {
        const hotelsFilter =
          (type !== "all" && hotels?.filter((el) => el.type === type)) ||
          (rating !== "all" &&
            hotels?.filter((el) => Math.round(el.rating) === +rating)) ||
          undefined;
        setHotelsType(hotelsFilter);
      } else {
        setHotelsType(hotels);
      }
    };
    getHotelsFilter();
  }, [hotels, type, rating]);

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  return (
    <div className="border-2 mt-4 p-4">
      <h3 className="mb-4 font-bold border-b pb-4 text-xl">Filter by:</h3>
      <h4 className="mb-4 font-bold">Property Type</h4>
      <ul className="w-48 text-sm font-medium">
        <div className="flex items-center mb-4">
          <input
            id="all"
            type="radio"
            name="type"
            className="w-4 h-4"
            // {...register("type")}
            value="all"
            onChange={handleChangeType}
          />
          <label htmlFor="all" className="ml-2 text-sm font-medium capitalize">
            All
          </label>
        </div>
        {types?.map((type, index) => (
          <div className="flex items-center mb-4" key={index}>
            <input
              id={type}
              type="radio"
              name="type"
              className="w-4 h-4"
              // {...register("type")}
              value={type}
              onChange={handleChangeType}
            />
            <label
              htmlFor={type}
              className="ml-2 text-sm font-medium capitalize"
            >
              {type}
            </label>
          </div>
        ))}
      </ul>

      <h4 className="mb-4 font-bold">Star Rating</h4>
      <ul className="w-48 text-sm font-medium">
        <div className="flex items-center mb-4">
          <input
            id="all"
            type="radio"
            name="rating"
            className="w-4 h-4"
            onChange={handleChangeRating}
            // {...register("rating")}
            value="all"
          />
          <label
            htmlFor="all"
            className="ml-2 text-sm font-medium capitalize"
          >
            All
          </label>
        </div>
        {Array.from(Array(5)).map((item, index) => (
          <div className="flex items-center mb-4" key={index}>
            <input
              id={index.toString()}
              type="radio"
              name="rating"
              className="w-4 h-4"
              onChange={handleChangeRating}
              // {...register("rating")}
              value={index + 1}
            />
            <label
              htmlFor={index.toString()}
              className="ml-2 text-sm font-medium capitalize"
            >
              {index + 1} stars
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FilterHotels;
