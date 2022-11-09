import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IHotel} from '../models'

import {apiUrl} from '../utils/config'

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        // getHotels: builder.query<IHotel[], void>({
        //     query: () => `/hotels`
        // }),
        getHotel: builder.query<IHotel, string>({
            query: (id) => `/hotels/search/${id}`
        }),
        getHotels: builder.query<IHotel[], { city?: string; limit?: number; min?: number; max?: number }>({
            query: (arg) => {
                const {city, limit, min, max} = arg
                return {
                    url: '/hotels',
                    params: {city, limit, min, max}
                }
            }
        })
    })
})

export const {useGetHotelsQuery, useGetHotelQuery} = hotelApi
