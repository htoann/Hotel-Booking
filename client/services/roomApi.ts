import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IRoom} from '../models'

import {apiUrl} from '../utils/config'

type HotelRoomsResponse = IRoom[]

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        getHotelRooms: builder.query<IRoom, string>({
            query: (id) => `/hotels/room/${id}`
        })
    })
})

export const {useGetHotelRoomsQuery} = roomApi
