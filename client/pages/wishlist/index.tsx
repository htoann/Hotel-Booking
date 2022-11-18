import Head from "next/head";
import React from "react";
import HotelPreview from "../../components/hotel/HotelPreview";
import { Loader } from "../../components/layout";
import { useGetUserQuery } from "../../services/userApi";
import { useAppSelector } from "../../store/hooks";

const Index = () => {
  const { data: user, isLoading } = useGetUserQuery();
  const { wishList } = useAppSelector((state) => state.persistedReducer.app);

  return (
    <>
      {isLoading ? (
        <div className="w-screen mt-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-3 justify-center mx-auto max-w-screen-xl overflow-hidden ">
          <Head>
            <title>Wishlist of {user?.username}</title>
          </Head>
          {wishList.length !== 0 ? (
            wishList.map((id: string) => (
              <div key={id}>
                <HotelPreview id={id} large />
              </div>
            ))
          ) : (
            <div className="w-screen mt-20 flex items-center justify-center">
              <h1 className="font-bold text-3xl	">No hotels saved</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
