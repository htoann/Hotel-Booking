import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IHotel, IUser} from '../models'
import {RootState} from '../store/store'

import {apiUrl} from '../utils/config'

export const userApi = createApi({
    reducerPath: 'userApi',
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
        getUser: builder.query<IUser, string>({
            query: (id) => `/users/${id}`
        }),
        updateUser: builder.mutation<IUser, Partial<IUser>>({
            query (data) {
                const {_id, ...body} = data
                return {
                    url: `/users/${_id}`,
                    method: 'PUT',
                    body
                }
            }
        }),
        changePassword: builder.mutation<{ message: string }, any>({
            query (body) {
                return {
                    url: `/users/reset`,
                    method: 'PUT',
                    body
                }
            }
        }),
        deleteUser: builder.mutation({
            query (id) {
                return {
                    url: `/users/${id}`,
                    method: 'DELETE'
                }
            }
        }),
        addWishList: builder.mutation({
            query: (body: {
                id: string;
            }) => {
                return {url: '/users/wishlist', method: 'post', body}
            }
        }),
        deleteWishList: builder.mutation({
            query: (body: {
                id: string;
            }) => {
                return {url: '/users/wishlist', method: 'delete', body}
            }
        }),
        createHotel: builder.mutation({
            query: (body: {
                title: string;
                type: string;
                desc: string;
                descShort: string;
                city: string;
                address: {
                    name: string;
                    lat?: number;
                    lng?: number;
                };
                distance: string;
                photos: string[];
                featured: boolean;
                name: string;
                cheapestPrice: number;
            }) => {
                return {url: '/hotels', method: 'post', body}
            }
        }),
        getMyHotels: builder.query<IHotel[], void>({
            query: () => `/hotels/me`
        }),
        deleteHotel: builder.mutation<void, string>({
            query: (id) => {
                return {url: `/hotels/${id}`, method: 'delete'}
            }
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useDeleteUserMutation,
    useAddWishListMutation,
    useDeleteWishListMutation,
    useCreateHotelMutation,
    useGetMyHotelsQuery,
    useDeleteHotelMutation
} = userApi
