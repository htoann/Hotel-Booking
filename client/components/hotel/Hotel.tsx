import React from 'react'
import {Hotel, useFetchAllHotelsQuery} from '../../services/hotelApi'

const HotelListItem = ({
    data: {name, _id},
    onSelect
}: {
    data: Hotel
    onSelect: (_id: string) => void
}) => {
    return (
        <li>
            <a href="#" onClick={() => onSelect(_id)}>
                {name}
            </a>
        </li>
    )
}

const HotelList = () => {
    const {data: hotels, isLoading, isError, error} = useFetchAllHotelsQuery()
    if (isLoading) {
        return <div>Loading</div>
    }
    return (
        <div>
            {hotels?.map((hotel) => (
                <HotelListItem
                    key={hotel._id}
                    data={hotel}
                    onSelect={(_id) => console.log(_id)}
                />
            ))}
        </div>
    )
}

export default HotelList
