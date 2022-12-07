import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
    wishList: string[];
    bookings: object[];
    reviews: object[];
}

const initialState: AppState = {
    wishList: [],
    bookings: [],
    reviews: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Wishlist
        setHotelWishList: (state, action: PayloadAction<string[]>) => {
            state.wishList = action.payload
        },
        addHotelToWishList: (state, action: PayloadAction<string>) => {
            const check = state.wishList?.every((id) => {
                return id !== action.payload
            })
            if (check) {
                state.wishList.push(action.payload)
            }
        },
        removeHotelFromWishList: (state, action: PayloadAction<string>) => {
            const index = state.wishList.indexOf(action.payload)
            if (index > -1) {
                state.wishList.splice(index, 1)
            }
        },

        // Bookings
        setBookings: (state, action: PayloadAction<object[]>) => {
            state.bookings = action.payload
        },
        addBookings: (state, action: PayloadAction<object>) => {
            const check = state.bookings?.every((id) => {
                return id !== action.payload
            })
            if (check) {
                state.bookings.push(action.payload)
            }
        },
        deleteBookings: (state, action: PayloadAction<object>) => {
            const index = state.bookings.indexOf(action.payload)
            if (index > -1) {
                state.bookings.splice(index, 1)
            }
        },

        // Review
        setReviews: (state, action: PayloadAction<object[]>) => {
            state.reviews = action.payload
        },
        addReviews: (state, action: PayloadAction<object>) => {
            const check = state.reviews?.every((id) => {
                return id !== action.payload
            })
            if (check) {
                state.reviews.push(action.payload)
            }
        },
        deleteReviews: (state, action: PayloadAction<string>) => {
            state.reviews = state.reviews.filter((review: any) => review._id !== action.payload)
        },
    }
})

export const { setHotelWishList, addHotelToWishList, removeHotelFromWishList, setBookings, addBookings, deleteBookings, setReviews, addReviews, deleteReviews } =
    appSlice.actions

export default appSlice.reducer
