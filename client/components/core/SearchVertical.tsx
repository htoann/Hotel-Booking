import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { validateInputCity } from "../../utils/validateInputCity";

const SearchVertical = () => {
  const { register, watch } = useForm();
  const city = watch("city");
  const min = watch("min");
  const max = watch("max");

  let query = `/search/${validateInputCity(city)}`;
  if (min) query += `?min=${min}`;
  if (max) query += `&max=${max}`;

  return (
    <form className="w-full h-full p-5 bg-secondary">
      <h1 className="font-semibold text-primary text-2xl">Search</h1>
      <div className="w-full mx-auto flex flex-col items-start justify-center gap-y-2.5">
        <label className="w-full">
          <span className="text-black">Location</span>
          <input
            className="form-input block w-full "
            {...register("city")}
            placeholder="Where are you going?"
          />
        </label>
        <label className="w-full">
          <span>Check In</span>
          <input type="date" className="form-input block w-full"/>
        </label>
        <label className="w-full">
          <span>Check Out</span>
          <input type="date" className="form-input block w-full" />
        </label>
        <label className="w-full">
          <span>Room</span>
          <input type="number" className="form-input block w-full" />
        </label>
        <label className="w-full">
          <span>Min Price</span>
          <input
            type="number"
            className="form-input block w-full"
            {...register("min")}
          />
        </label>
        <label className="w-full">
          <span>Max Price</span>
          <input
            type="number"
            className="form-input block w-full"
            {...register("max")}
          />
        </label>
        <Link
          href={query}
          className={
            !watch("city") ? "pointer-events-none cursor-not-allowed" : ""
          }
        >
          <div className="w-full">
            <Button
              text="Search"
              textColor="text-white"
              bgColor="bg-lightPrimary"
              fullWidth={true}
            />
          </div>
        </Link>
      </div>
    </form>
  );
};

export default SearchVertical;
