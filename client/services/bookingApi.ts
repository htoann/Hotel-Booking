import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'
import {IBooking} from '../models'

import { apiUrl } from '../utils/config'

export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const user = (getState() as RootState).persistedReducer.auth

            if (user && user.token && endpoint !== 'refresh') {
                headers.set('Authorization', `Bearer ${user.token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllBooking: builder.query<any, any>({
            query: () => '/booking'
        }),
        bookingRoom: builder.mutation({
            query: (body: IBooking) => {
                return { url: '/booking', method: 'post', body }
            }
        }),
        deleteBooking: builder.mutation({
            query: (id) => {
                return { url: `/booking/${id}`, method: 'delete'}
            }
        })
    })
})

export const { useGetAllBookingQuery, useBookingRoomMutation, useDeleteBookingMutation } = bookingApi
