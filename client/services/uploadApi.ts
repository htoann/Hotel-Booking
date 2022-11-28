import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from '../store/store'

import {apiUrl} from '../utils/config'

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
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
        uploadImages: builder.mutation<{ url: string[] }, FormData>({
            query: (body) => {
                return {
                    url: `/upload/image`,
                    method: 'POST',
                    body
                }
            }
        }),
        deleteImage: builder.mutation<{ message: string }, { url: string }>({
            query: (body) => {
                return {
                    url: `/upload/image`,
                    method: 'DELETE',
                    body
                }
            }
        })
    })
})

export const {
    useUploadImagesMutation,
    useDeleteImageMutation
} = uploadApi
