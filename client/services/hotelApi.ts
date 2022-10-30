import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {apiUrl} from '../utils/config'

export interface Hotel {
    _id: string;
    title: string;
    name: string;
    type: string;
    desc: string;
    descShort: string;
    city: string;
    address: string;
    distance: string;
    photos: string[];
    cheapestPrice: number;
    featured: boolean;
    rating: number;
    score: number;
    rooms: string[];
    __v: number;
}

type HotelsResponse = Hotel[]

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        fetchAllHotels: builder.query<HotelsResponse, void>({
            query: () => `/hotels`
            // query: () => {
            //     return {url: '/hotels', method: 'GET'}
            // }
        })
    })
})

export const {useFetchAllHotelsQuery} = hotelApi
