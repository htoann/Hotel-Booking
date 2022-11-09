import React from 'react'
import {useGetHotelsQuery} from '../../services/hotelApi'

const SearchPage = () => {
    // lay city, limit, min, max tu URL, tat ca deu optional
    const {data: hotels, isLoading} = useGetHotelsQuery({city: 'hoian', limit: 5, min: 10, max: 1000})
    console.log(hotels)
    return (
        <div>
            SearchPage
        </div>
    )
}

export default SearchPage
