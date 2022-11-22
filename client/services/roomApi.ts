import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRoom } from "../models";
import {RootState} from '../store/store'

import { apiUrl } from "../utils/config";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, {getState, endpoint}) => {
            const user = (getState() as RootState).persistedReducer.auth

            if (user && user.token && endpoint !== 'refresh') {
                headers.set('Authorization', `Bearer ${user.token}`)
            }
            return headers
        }
  }),
  endpoints: (builder) => ({
    getHotelRooms: builder.query<IRoom[], string>({
      query: (id) => `/hotels/room/${id}`,
    }),
    bookingRoom: builder.mutation({
      query: (body: { roomId: string ; checkIn: Date; checkOut: Date, price: Number }) => {
        return { url: "/booking", method: "post", body };
      },
    }),
  }),
});

export const { useGetHotelRoomsQuery, useBookingRoomMutation } = roomApi;
