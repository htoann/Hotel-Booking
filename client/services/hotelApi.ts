import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IHotel} from '../models'

import {apiUrl} from '../utils/config'

type HotelsResponse = IHotel[]

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        getHotels: builder.query<HotelsResponse, void>({
            query: () => `/hotels`
        }),
        getHotel: builder.query<IHotel, string>({
            query: (id) => `/hotels/search/${id}`
        })
    })
})

export const {useGetHotelsQuery, useGetHotelQuery} = hotelApi
