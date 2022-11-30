import {Disclosure} from '@headlessui/react'
import React, {useState, useEffect} from 'react'
import {IHotel} from '../../models'
import {useAppSelector} from '../../store/hooks'
import useWindowDimensions from '../../hooks/useWindowDimensions'

interface Props {
    hotels?: IHotel[];
    setHotelsType: any;
}

const FilterHotels: React.FC<Props> = ({hotels, setHotelsType}) => {
    const {hotels: hotelsRedux} = useAppSelector(
        (state) => state.persistedReducer.hotel
    )
    const types = hotelsRedux
        ?.map((hotel) => hotel.type)
        .filter((value, index, self) => self.indexOf(value) === index)

    const [type, setType] = useState('all')
    const [rating, setRating] = useState('all')

    useEffect(() => {
        const getHotelsFilter = () => {
            if (type !== 'all') {
                if (rating !== 'all') {
                    const hotelsFilter = hotels?.filter(
                        (el) => el.type === type && el.rating && Math.round(el.rating) === +rating
                    )

                    setHotelsType(hotelsFilter)
                } else {
                    const hotelsFilter = hotels?.filter((el) => el.type === type)

                    setHotelsType(hotelsFilter)
                }
            } else if (rating !== 'all') {
                const hotelsFilter = hotels?.filter(
                    (el) => el.rating && Math.round(el.rating) === +rating
                )

                setHotelsType(hotelsFilter)
            } else {
                setHotelsType(hotels)
            }
        }

        getHotelsFilter()
    }, [hotels, type, rating, setHotelsType])

    const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value)
    }

    const handleChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(e.target.value)
    }

    const {width} = useWindowDimensions()

    return (
        <div className="border-2 mt-4 p-4">
            <h3 className="mb-4 font-bold border-b pb-4 text-xl">Filter by:</h3>
            <div className="flex flex-col">
                <div className="flex-1">
                    <Disclosure defaultOpen={(width > 1024)}>
                        <Disclosure.Button>
                            <h4 className="mb-4 font-bold">Type</h4>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <ul className="w-48 text-sm font-medium">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="all"
                                        type="radio"
                                        name="type"
                                        className="w-4 h-4"
                                        value="all"
                                        onChange={handleChangeType}
                                    />
                                    <label htmlFor="all" className="ml-2 text-sm font-medium capitalize">
                                        All
                                    </label>
                                </div>
                                {types?.map((type, index) => (
                                    <div className="flex items-center mb-4" key={index}>
                                        <input
                                            id={type}
                                            type="radio"
                                            name="type"
                                            className="w-4 h-4"
                                            value={type}
                                            onChange={handleChangeType}
                                        />
                                        <label
                                            htmlFor={type}
                                            className="ml-2 text-sm font-medium capitalize"
                                        >
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </ul>
                        </Disclosure.Panel>
                    </Disclosure>
                </div>
                <div className="flex-1">
                    <Disclosure defaultOpen={(width > 1024)}>
                        <Disclosure.Button>
                            <h4 className="mb-4 font-bold">Star</h4>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <ul className="w-48 text-sm font-medium">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="all"
                                        type="radio"
                                        name="rating"
                                        className="w-4 h-4"
                                        onChange={handleChangeRating}
                                        value="all"
                                    />
                                    <label htmlFor="all" className="ml-2 text-sm font-medium capitalize">
                                        All
                                    </label>
                                </div>
                                {Array.from(Array(5)).map((item, index) => (
                                    <div className="flex items-center mb-4" key={index}>
                                        <input
                                            id={index.toString()}
                                            type="radio"
                                            name="rating"
                                            className="w-4 h-4"
                                            onChange={handleChangeRating}
                                            value={index + 1}
                                        />
                                        <label
                                            htmlFor={index.toString()}
                                            className="ml-2 text-sm font-medium capitalize"
                                        >
                                            {index + 1} stars
                                        </label>
                                    </div>
                                ))}
                            </ul>
                        </Disclosure.Panel>
                    </Disclosure>
                </div>

            </div>
        </div>
    )
}

export default FilterHotels
