import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IUser} from '../models'
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
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useDeleteUserMutation,
    useAddWishListMutation,
    useDeleteWishListMutation
} = userApi
