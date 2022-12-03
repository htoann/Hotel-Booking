import Link from 'next/link'
import React from 'react'
import {IHotel} from '../../models'
import Button from './Button'
import StarRating from './StarRating'
import Image from 'next/image'
import {MdLocationOn} from '../../utils/icons'

interface Props {
    data?: IHotel[];
    city?: string;
}

const SearchResults: React.FC<Props> = ({data, city}) => {
    return (
        <div>
            {city && (
                <h2 className="text-2xl font-bold mb-4 capitalize">
                    {city}: {data?.length} properties found
                </h2>
            )}
            {data?.map((hotel) => (
                <Link href={`/hotel/${hotel._id}`} key={hotel._id}>
                    <div className="flex flex-col lg:flex-row gap-1 border p-5 mb-5">
                        <Image
                            className="w-full lg:w-1/4 object-cover"
                            width={500}
                            height={500}
                            src={hotel.photos[0]}
                            alt={hotel.name}
                        />
                        <div className="flex-1 flex flex-col justify-between lg:flex-row gap-1">
                            <div className="lg:mx-4">
                                <div className="flex flex-wrap gap-1">
                                    <p className="text-xl font-bold text-secondary">
                                        {hotel.title}
                                    </p>
                                    <StarRating data={hotel.rating}/>
                                </div>
                                <div className="text-sm underline text-secondary flex items-center flex-wrap gap-2">
                                    <MdLocationOn/>
                                    <span className="cursor-pointer capitalize">
                                        {hotel.address.name}
                                    </span>
                                    <span className="cursor-pointer">
                               Show on map
                                    </span>
                                </div>

                                <p className="text-sm mt-2">{hotel.descShort}</p>
                            </div>
                            <div
                                className="font-semibold flex flex-row lg:flex-col justify-between items-center lg:items-end ">
                                <div
                                    className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg float-right lg:mb-4"
                                >
                                    {hotel.score ? hotel.score : 'No score'}
                                </div>
                                <Button
                                    text="Show prices"
                                    textColor="text-white"
                                    bgColor="bg-lightPrimary"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SearchResults
