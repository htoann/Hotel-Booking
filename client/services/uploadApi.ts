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
        uploadImages: builder.mutation<{ url: string }, { photos: File }>({
            query: (body) => {
                return {
                    url: `/upload/hotel/photos`,
                    method: 'POST',
                    body
                }
            }
        })
    })
})

export const {
    useUploadImagesMutation
} = uploadApi
