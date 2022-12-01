import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IHotel, IUser} from '../models'
import {RootState} from '../store/store'

import {apiUrl} from '../utils/config'

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['myHotels'],
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
        createHotel: builder.mutation<IHotel, Partial<IHotel>>({
            query: (body) => {
                return {url: '/hotels', method: 'post', body}
            },
            invalidatesTags: ['myHotels']
        }),
        getMyHotels: builder.query<IHotel[], void>({
            query: () => `/hotels/me`,
            providesTags: ['myHotels']
        }),
        deleteHotel: builder.mutation<void, string>({
            query: (id) => {
                return {url: `/hotels/${id}`, method: 'delete'}
            },
            invalidatesTags: ['myHotels']
        }),
        updateHotel: builder.mutation<void, Partial<IHotel>>({
            query: (data) => {
                const {_id, ...body} = data
                return {
                    url: `/hotels/${_id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['myHotels']
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
    useDeleteHotelMutation,
    useUpdateHotelMutation
} = userApi
