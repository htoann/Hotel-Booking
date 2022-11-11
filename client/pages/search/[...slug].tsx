import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SearchVertical } from "../../components/core";
import FilterHotels from "../../components/core/FilterHotels";
import SearchResults from "../../components/core/SearchResults";
import { Loader } from "../../components/layout";
import { useGetHotelsQuery } from "../../services/hotelApi";

const SearchPage = () => {
  // lay city la bat buoc, limit, min, max tu URL la optional
  const router = useRouter();

  const minSlug = router?.query?.min;
  const maxSlug = router?.query?.max;

  const citySlug = router?.query?.slug ? router?.query?.slug[0] : "";

  const [city, setCity] = useState(citySlug);

  useEffect(() => {
    setCity(citySlug);
  }, [citySlug]);

  const { data: hotels, isLoading } = useGetHotelsQuery({
    city: city,
    limit: 20,
    min: minSlug ? +minSlug : undefined,
    max: maxSlug ? +maxSlug : undefined,
  });

  const [hotelsType, setHotelsType] = useState(hotels || undefined);

  if (isLoading)
    return (
      <div className="w-screen mt-20 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="relative flex mx-auto max-w-screen-xl gap-5 py-5">
      <div className="w-128 h-min">
        <SearchVertical />
        <FilterHotels hotels={hotels} setHotelsType={setHotelsType} />
      </div>
      <div className="flex-1">
        <SearchResults data={hotelsType} city={city} />
      </div>
    </div>
  );
};

export default SearchPage;
