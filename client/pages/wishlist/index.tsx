import Head from "next/head";
import React from "react";
import HotelPreview from "../../components/hotel/HotelPreview";
import { Loader } from "../../components/layout";
import { useGetUserQuery } from "../../services/userApi";

const Index = () => {
	const { data: user, isLoading } = useGetUserQuery();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2 mt-8 lg:grid-cols-3 justify-center mx-auto max-w-screen-xl overflow-hidden ">
			<Head>
				<title>Wishlist of {user?.username}</title>
			</Head>
			{user?.wishlist?.map((hotel: any) => (
				<div key={hotel._id}>
					<HotelPreview
						id={hotel._id}
						image={hotel.photos[0]}
						name={hotel.name}
						title={hotel.title}
						large
					/>
				</div>
			))}
		</div>
	);
};

export default Index;
