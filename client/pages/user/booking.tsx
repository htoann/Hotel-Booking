import Head from "next/head";
import React, { useEffect } from "react";
import { HotelPreview } from "../../components/hotel";
import { Loader } from "../../components/layout";
import { setBookings } from "../../features/appSlice";
import { useGetAllBookingQuery } from "../../services/bookingApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ListBookingPage = () => {
  const { hotels } = useAppSelector((state) => state.persistedReducer.hotel);
  const { data, isLoading, isSuccess, error } = useGetAllBookingQuery({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) dispatch(setBookings(data));
  }, [dispatch]);

  const { bookings } = useAppSelector((state) => state.persistedReducer.app);

  const bookingListHotel = bookings.map((booking: any) =>
    hotels?.filter((hotel) => booking.hotelId === hotel._id)
  );
  if (isLoading) {
    return (
      <div className="w-screen mt-20 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Bookings & Trips</title>
      </Head>
      <div
        className={
          bookingListHotel && bookingListHotel.length > 0
            ? `grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-2 justify-center mx-auto max-w-screen-xl overflow-hidden`
            : `w-screen mt-20 flex items-center justify-center`
        }
      >
        {bookingListHotel && bookingListHotel.length > 0 ? (
          <>
            {bookingListHotel?.map((hotel: any) => (
              <div key={hotel[0]._id}>
                <HotelPreview
                  id={hotel[0]._id}
                  image={hotel[0].photos[0]}
                  name={hotel[0].name}
                  title={hotel[0].title}
                  large={true}
                />
              </div>
            ))}

            {bookings.map((booking: any) => (
              <div key={booking._id} className="ml-2">
                <h3 className="font-bold text-xl">USD {booking.price}</h3>
                <p>Checkin: {booking.checkIn}</p>
                <p>Checkout: {booking.checkOut}</p>
              </div>
            ))}
          </>
        ) : (
          <h1 className="font-bold text-3xl">No hotels booking</h1>
        )}
      </div>
    </>
  );
};

export default ListBookingPage;