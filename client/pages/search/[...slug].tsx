import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {SearchVertical} from '../../components/core'
import FilterHotels from '../../components/core/FilterHotels'
import SearchResults from '../../components/core/SearchResults'
import {Layout, Loader} from '../../components/layout'
import {useGetHotelsQuery} from '../../services/hotelApi'

const SearchPage = () => {
    const router = useRouter()
    const queryUrl = router?.query

    const citySlug = queryUrl?.slug ? queryUrl?.slug[0] : ''
    const minSlug = queryUrl?.min
    const maxSlug = queryUrl?.max

    const [city, setCity] = useState(citySlug)

    useEffect(() => {
        setCity(citySlug)
    }, [citySlug])

    const {data: hotels, isLoading} = useGetHotelsQuery({
        city: city,
        limit: 20,
        min: minSlug ? +minSlug : undefined,
        max: maxSlug ? +maxSlug : undefined
    })

    const [hotelsType, setHotelsType] = useState(hotels || undefined)

    if (isLoading) {
        return (
            <div className="w-screen mt-20 flex items-center justify-center">
                <Loader/>
            </div>
        )
    }

    return (
        <Layout
            metadata={{
                title: `Search: ${citySlug} - Booking`,
                description: `Booking`
            }}
        >
            <div className="mx-auto container px-4 lg:px-6 py-5 ">
                <div className="w-full lg:flex gap-5">
                    <div className="w-full lg:w-1/4 h-min">
                        <SearchVertical/>
                        <FilterHotels hotels={hotels} setHotelsType={setHotelsType}/>
                    </div>
                    <div className="flex-1">
                        <SearchResults data={hotelsType} city={city}/>
                    </div>
                </div>

            </div>
        </Layout>

    )
}

export default SearchPage
