import Head from "next/head";
import React from "react";
import HotelPreview from "../../components/hotel/HotelPreview";
import {useAppSelector } from "../../store/hooks";

const Index = () => {
  const { wishList } = useAppSelector((state) => state.persistedReducer.app);

  return (
    <div
      className={
        wishList.length > 0
          ? `grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-3 justify-center mx-auto max-w-screen-xl overflow-hidden`
          : `w-screen mt-20 flex items-center justify-center`
      }
    >
      <Head>
        <title>Wishlist</title>
      </Head>
      {wishList.length > 0 ? (
        wishList.map((id: string) => (
          <div key={id}>
            <HotelPreview id={id} large />
          </div>
        ))
      ) : (
        <h1 className="font-bold text-3xl	">No hotels saved</h1>
      )}
    </div>
  );
};

export default Index;
