import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {apiUrl} from '../utils/config'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {url: '/auth/login', method: 'post', body}
            }
        }),

        registerUser: builder.mutation({
            query: (body: {
                name: string;
                email: string;
                password: string;
            }) => {
                return {url: '/auth/register', method: 'post', body}
            }
        })
    })
})

export const {useLoginUserMutation, useRegisterUserMutation} = authApi
